import { Product, CreateProductDTO, UpdateProductDTO, ProductFilters, PaginationParams, PaginatedResult, ProductOperationResult, ProductDocument, ProductValidationError } from '../types/Product';

const STORAGE_KEY = 'sql_products';

function generateId(): string {
  return 'sql_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function getStorage(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map((p: Product) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }));
  } catch {
    return [];
  }
}

function setStorage(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function validateProductName(name: string, existingProducts: Product[], currentId?: string): ProductValidationError | null {
  if (!name || name.trim().length === 0) {
    return { field: 'name', message: 'El nombre del producto es requerido' };
  }
  if (name.trim().length < 3) {
    return { field: 'name', message: 'El nombre debe tener al menos 3 caracteres' };
  }
  if (name.trim().length > 100) {
    return { field: 'name', message: 'El nombre no puede exceder 100 caracteres' };
  }
  const normalizedName = name.trim().toLowerCase();
  const duplicate = existingProducts.find(p => 
    p.name.toLowerCase().trim() === normalizedName && p.id !== currentId
  );
  if (duplicate) {
    return { field: 'name', message: 'Ya existe un producto con este nombre' };
  }
  return null;
}

export function validateProductPrice(price: number): ProductValidationError | null {
  if (price === undefined || price === null) {
    return { field: 'price', message: 'El precio es requerido' };
  }
  if (typeof price !== 'number' || isNaN(price)) {
    return { field: 'price', message: 'El precio debe ser un numero valido' };
  }
  if (price < 0) {
    return { field: 'price', message: 'El precio no puede ser negativo' };
  }
  if (price > 999999.99) {
    return { field: 'price', message: 'El precio excede el limite permitido' };
  }
  return null;
}

export function validateProductStock(stock: number): ProductValidationError | null {
  if (stock === undefined || stock === null) {
    return { field: 'stock', message: 'El stock es requerido' };
  }
  if (typeof stock !== 'number' || !Number.isInteger(stock)) {
    return { field: 'stock', message: 'El stock debe ser un numero entero' };
  }
  if (stock < 0) {
    return { field: 'stock', message: 'El stock no puede ser negativo' };
  }
  if (stock > 999999) {
    return { field: 'stock', message: 'El stock excede el limite permitido' };
  }
  return null;
}

export function validateProductDescription(description: string): ProductValidationError | null {
  if (!description || description.trim().length === 0) {
    return { field: 'description', message: 'La descripcion es requerida' };
  }
  if (description.trim().length > 500) {
    return { field: 'description', message: 'La descripcion no puede exceder 500 caracteres' };
  }
  return null;
}

export function validateProduct(dto: CreateProductDTO | UpdateProductDTO, existingProducts: Product[], currentId?: string): ProductValidationError[] {
  const errors: ProductValidationError[] = [];
  
  if ('name' in dto && dto.name !== undefined) {
    const nameError = validateProductName(dto.name, existingProducts, currentId);
    if (nameError) errors.push(nameError);
  }
  
  if ('price' in dto && dto.price !== undefined) {
    const priceError = validateProductPrice(dto.price);
    if (priceError) errors.push(priceError);
  }
  
  if ('stock' in dto && dto.stock !== undefined) {
    const stockError = validateProductStock(dto.stock);
    if (stockError) errors.push(stockError);
  }
  
  if ('description' in dto && dto.description !== undefined) {
    const descError = validateProductDescription(dto.description);
    if (descError) errors.push(descError);
  }
  
  return errors;
}

export function mapRowToProduct(row: Product): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stock: Number(row.stock),
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  };
}

export async function createProduct(dto: CreateProductDTO): Promise<ProductOperationResult<Product>> {
  try {
    const products = getStorage();
    const errors = validateProduct(dto, products);
    
    if (errors.length > 0) {
      return { success: false, validationErrors: errors };
    }
    
    const now = new Date();
    const newProduct: Product = {
      id: generateId(),
      name: dto.name.trim(),
      description: dto.description.trim(),
      price: Number(dto.price.toFixed(2)),
      stock: Number(dto.stock),
      createdAt: now,
      updatedAt: now,
    };
    
    products.push(newProduct);
    setStorage(products);
    
    return { success: true, data: newProduct };
  } catch (error) {
    return { success: false, error: `Error al crear producto: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getProductById(id: string): Promise<ProductOperationResult<Product>> {
  try {
    const products = getStorage();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: `Error al obtener producto: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getAllProducts(): Promise<ProductOperationResult<Product[]>> {
  try {
    const products = getStorage();
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: `Error al obtener productos: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getProductsWithFilters(
  filters: ProductFilters,
  pagination: PaginationParams,
  sortField: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<ProductOperationResult<PaginatedResult<Product>>> {
  try {
    let products = getStorage();
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }
    
    if (filters.inStock) {
      products = products.filter(p => p.stock > 0);
    }
    
    products.sort((a, b) => {
      const aVal = a[sortField as keyof Product];
      const bVal = b[sortField as keyof Product];
      
      if (aVal === undefined || bVal === undefined) return 0;
      
      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = Number(aVal) - Number(bVal);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    const total = products.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const startIndex = (pagination.page - 1) * pagination.limit;
    const paginatedData = products.slice(startIndex, startIndex + pagination.limit);
    
    return {
      success: true,
      data: {
        data: paginatedData,
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
      },
    };
  } catch (error) {
    return { success: false, error: `Error al filtrar productos: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function updateProduct(id: string, dto: UpdateProductDTO): Promise<ProductOperationResult<Product>> {
  try {
    const products = getStorage();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    const errors = validateProduct(dto, products, id);
    
    if (errors.length > 0) {
      return { success: false, validationErrors: errors };
    }
    
    const existingProduct = products[index];
    const updatedProduct: Product = {
      ...existingProduct,
      name: dto.name !== undefined ? dto.name.trim() : existingProduct.name,
      description: dto.description !== undefined ? dto.description.trim() : existingProduct.description,
      price: dto.price !== undefined ? Number(dto.price.toFixed(2)) : existingProduct.price,
      stock: dto.stock !== undefined ? Number(dto.stock) : existingProduct.stock,
      updatedAt: new Date(),
    };
    
    products[index] = updatedProduct;
    setStorage(products);
    
    return { success: true, data: updatedProduct };
  } catch (error) {
    return { success: false, error: `Error al actualizar producto: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function deleteProduct(id: string): Promise<ProductOperationResult<boolean>> {
  try {
    const products = getStorage();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    products.splice(index, 1);
    setStorage(products);
    
    return { success: true, data: true };
  } catch (error) {
    return { success: false, error: `Error al eliminar producto: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function checkProductNameExists(name: string, excludeId?: string): Promise<boolean> {
  const products = getStorage();
  const normalizedName = name.trim().toLowerCase();
  return products.some(p => 
    p.name.toLowerCase().trim() === normalizedName && p.id !== excludeId
  );
}

export async function getProductStats(): Promise<ProductOperationResult<{ total: number; totalValue: number; outOfStock: number; lowStock: number }>> {
  try {
    const products = getStorage();
    const total = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const outOfStock = products.filter(p => p.stock === 0).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    
    return {
      success: true,
      data: { total, totalValue, outOfStock, lowStock },
    };
  } catch (error) {
    return { success: false, error: `Error al obtener estadisticas: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export function initializeSQLDatabase(): void {
  const existing = getStorage();
  if (existing.length === 0) {
    const sampleProducts: Product[] = [
      {
        id: generateId(),
        name: 'Laptop Pro 15',
        description: 'Portatil de alta gama con procesador Intel Core i7 y 16GB de RAM',
        price: 1299.99,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateId(),
        name: 'Mouse Inalambrico',
        description: 'Mouse ergonomico con conexion Bluetooth y bateria de larga duracion',
        price: 29.99,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateId(),
        name: 'Teclado Mecanico',
        description: 'Teclado RGB con switches Cherry MX y retroiluminacion personalizable',
        price: 89.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setStorage(sampleProducts);
  }
}