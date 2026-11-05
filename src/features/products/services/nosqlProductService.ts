import { Product, CreateProductDTO, UpdateProductDTO, ProductFilters, PaginationParams, PaginatedResult, ProductOperationResult, ProductDocument, ProductValidationError } from '../types/Product';

const STORAGE_KEY = 'nosql_products';

function generateObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomPart = Math.random().toString(16).substr(2, 16).padEnd(16, '0');
  const machineId = Math.random().toString(16).substr(2, 6).padEnd(6, '0');
  const processId = Math.floor(Math.random() * 65535).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return timestamp + machineId + processId + counter;
}

function getDocumentStorage(): ProductDocument[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map((p: ProductDocument) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }));
  } catch {
    return [];
  }
}

function setDocumentStorage(documents: ProductDocument[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

export function validateNoSQLProductName(name: string, existingDocs: ProductDocument[], currentId?: string): ProductValidationError | null {
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
  const duplicate = existingDocs.find(d => 
    d.name.toLowerCase().trim() === normalizedName && d._id !== currentId
  );
  if (duplicate) {
    return { field: 'name', message: 'Ya existe un producto con este nombre' };
  }
  return null;
}

export function validateNoSQLProductPrice(price: number): ProductValidationError | null {
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

export function validateNoSQLProductStock(stock: number): ProductValidationError | null {
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

export function validateNoSQLProductDescription(description: string): ProductValidationError | null {
  if (!description || description.trim().length === 0) {
    return { field: 'description', message: 'La descripcion es requerida' };
  }
  if (description.trim().length > 1000) {
    return { field: 'description', message: 'La descripcion puede tener hasta 1000 caracteres en NoSQL' };
  }
  return null;
}

export function validateNoSQLProduct(dto: CreateProductDTO | UpdateProductDTO, existingDocs: ProductDocument[], currentId?: string): ProductValidationError[] {
  const errors: ProductValidationError[] = [];
  
  if ('name' in dto && dto.name !== undefined) {
    const nameError = validateNoSQLProductName(dto.name, existingDocs, currentId);
    if (nameError) errors.push(nameError);
  }
  
  if ('price' in dto && dto.price !== undefined) {
    const priceError = validateNoSQLProductPrice(dto.price);
    if (priceError) errors.push(priceError);
  }
  
  if ('stock' in dto && dto.stock !== undefined) {
    const stockError = validateNoSQLProductStock(dto.stock);
    if (stockError) errors.push(stockError);
  }
  
  if ('description' in dto && dto.description !== undefined) {
    const descError = validateNoSQLProductDescription(dto.description);
    if (descError) errors.push(descError);
  }
  
  return errors;
}

export function mapDocumentToProduct(doc: ProductDocument): Product {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description,
    price: Number(doc.price),
    stock: Number(doc.stock),
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  };
}

export function mapProductToDocument(product: Product): ProductDocument {
  return {
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    metadata: {
      category: 'general',
      tags: [],
      rating: 0,
    },
  };
}

export async function createNoSQLProduct(dto: CreateProductDTO): Promise<ProductOperationResult<Product>> {
  try {
    const documents = getDocumentStorage();
    const errors = validateNoSQLProduct(dto, documents);
    
    if (errors.length > 0) {
      return { success: false, validationErrors: errors };
    }
    
    const now = new Date();
    const newDocument: ProductDocument = {
      _id: generateObjectId(),
      name: dto.name.trim(),
      description: dto.description.trim(),
      price: Number(dto.price.toFixed(2)),
      stock: Number(dto.stock),
      createdAt: now,
      updatedAt: now,
      metadata: {
        category: 'uncategorized',
        tags: [],
        rating: 0,
      },
    };
    
    documents.push(newDocument);
    setDocumentStorage(documents);
    
    return { success: true, data: mapDocumentToProduct(newDocument) };
  } catch (error) {
    return { success: false, error: `Error al crear producto en NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getNoSQLProductById(id: string): Promise<ProductOperationResult<Product>> {
  try {
    const documents = getDocumentStorage();
    const document = documents.find(d => d._id === id);
    
    if (!document) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    return { success: true, data: mapDocumentToProduct(document) };
  } catch (error) {
    return { success: false, error: `Error al obtener producto de NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getAllNoSQLProducts(): Promise<ProductOperationResult<Product[]>> {
  try {
    const documents = getDocumentStorage();
    const products = documents.map(mapDocumentToProduct);
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: `Error al obtener productos de NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getNoSQLProductsWithFilters(
  filters: ProductFilters,
  pagination: PaginationParams,
  sortField: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<ProductOperationResult<PaginatedResult<Product>>> {
  try {
    let documents = getDocumentStorage();
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      documents = documents.filter(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.description.toLowerCase().includes(searchLower) ||
        (d.metadata?.tags?.some(t => t.toLowerCase().includes(searchLower)))
      );
    }
    
    if (filters.minPrice !== undefined) {
      documents = documents.filter(d => d.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      documents = documents.filter(d => d.price <= filters.maxPrice!);
    }
    
    if (filters.inStock) {
      documents = documents.filter(d => d.stock > 0);
    }
    
    const sortFieldMap: Record<string, keyof ProductDocument> = {
      name: 'name',
      price: 'price',
      stock: 'stock',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    };
    
    const actualSortField = sortFieldMap[sortField] || 'createdAt';
    
    documents.sort((a, b) => {
      const aVal = a[actualSortField];
      const bVal = b[actualSortField];
      
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
    
    const total = documents.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const startIndex = (pagination.page - 1) * pagination.limit;
    const paginatedDocs = documents.slice(startIndex, startIndex + pagination.limit);
    const paginatedProducts = paginatedDocs.map(mapDocumentToProduct);
    
    return {
      success: true,
      data: {
        data: paginatedProducts,
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
      },
    };
  } catch (error) {
    return { success: false, error: `Error al filtrar productos en NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function updateNoSQLProduct(id: string, dto: UpdateProductDTO): Promise<ProductOperationResult<Product>> {
  try {
    const documents = getDocumentStorage();
    const index = documents.findIndex(d => d._id === id);
    
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    const errors = validateNoSQLProduct(dto, documents, id);
    
    if (errors.length > 0) {
      return { success: false, validationErrors: errors };
    }
    
    const existingDoc = documents[index];
    const updatedDocument: ProductDocument = {
      ...existingDoc,
      name: dto.name !== undefined ? dto.name.trim() : existingDoc.name,
      description: dto.description !== undefined ? dto.description.trim() : existingDoc.description,
      price: dto.price !== undefined ? Number(dto.price.toFixed(2)) : existingDoc.price,
      stock: dto.stock !== undefined ? Number(dto.stock) : existingDoc.stock,
      updatedAt: new Date(),
    };
    
    documents[index] = updatedDocument;
    setDocumentStorage(documents);
    
    return { success: true, data: mapDocumentToProduct(updatedDocument) };
  } catch (error) {
    return { success: false, error: `Error al actualizar producto en NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function deleteNoSQLProduct(id: string): Promise<ProductOperationResult<boolean>> {
  try {
    const documents = getDocumentStorage();
    const index = documents.findIndex(d => d._id === id);
    
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    documents.splice(index, 1);
    setDocumentStorage(documents);
    
    return { success: true, data: true };
  } catch (error) {
    return { success: false, error: `Error al eliminar producto de NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function checkNoSQLProductNameExists(name: string, excludeId?: string): Promise<boolean> {
  const documents = getDocumentStorage();
  const normalizedName = name.trim().toLowerCase();
  return documents.some(d => 
    d.name.toLowerCase().trim() === normalizedName && d._id !== excludeId
  );
}

export async function getNoSQLProductStats(): Promise<ProductOperationResult<{ total: number; totalValue: number; outOfStock: number; lowStock: number; avgPrice: number }>> {
  try {
    const documents = getDocumentStorage();
    const total = documents.length;
    const totalValue = documents.reduce((sum, d) => sum + (d.price * d.stock), 0);
    const outOfStock = documents.filter(d => d.stock === 0).length;
    const lowStock = documents.filter(d => d.stock > 0 && d.stock <= 10).length;
    const avgPrice = total > 0 ? documents.reduce((sum, d) => sum + d.price, 0) / total : 0;
    
    return {
      success: true,
      data: { total, totalValue, outOfStock, lowStock, avgPrice },
    };
  } catch (error) {
    return { success: false, error: `Error al obtener estadisticas de NoSQL: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function addProductMetadata(id: string, metadata: { category?: string; tags?: string[]; rating?: number }): Promise<ProductOperationResult<Product>> {
  try {
    const documents = getDocumentStorage();
    const index = documents.findIndex(d => d._id === id);
    
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    
    const existingDoc = documents[index];
    const updatedDocument: ProductDocument = {
      ...existingDoc,
      metadata: {
        ...existingDoc.metadata,
        category: metadata.category ?? existingDoc.metadata?.category,
        tags: metadata.tags ?? existingDoc.metadata?.tags ?? [],
        rating: metadata.rating ?? existingDoc.metadata?.rating ?? 0,
      },
      updatedAt: new Date(),
    };
    
    documents[index] = updatedDocument;
    setDocumentStorage(documents);
    
    return { success: true, data: mapDocumentToProduct(updatedDocument) };
  } catch (error) {
    return { success: false, error: `Error al agregar metadatos: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export async function getProductsByCategory(category: string): Promise<ProductOperationResult<Product[]>> {
  try {
    const documents = getDocumentStorage();
    const filteredDocs = documents.filter(d => 
      d.metadata?.category?.toLowerCase() === category.toLowerCase()
    );
    const products = filteredDocs.map(mapDocumentToProduct);
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: `Error al obtener productos por categoria: ${error instanceof Error ? error.message : 'Error desconocido'}` };
  }
}

export function initializeNoSQLDatabase(): void {
  const existing = getDocumentStorage();
  if (existing.length === 0) {
    const sampleDocs: ProductDocument[] = [
      {
        _id: generateObjectId(),
        name: 'Monitor 4K UltraWide',
        description: 'Monitor curvo de 34 pulgadas con resolucion 3440x1440 y tasa de refresco 144Hz',
        price: 499.99,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          category: 'monitores',
          tags: ['4k', 'curvo', 'gaming'],
          rating: 4.5,
        },
      },
      {
        _id: generateObjectId(),
        name: 'Auriculares Bluetooth',
        description: 'Auriculares con cancelacion activa de ruido y autonomia de 30 horas',
        price: 149.99,
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          category: 'audio',
          tags: ['bluetooth', 'noise-cancelling'],
          rating: 4.2,
        },
      },
      {
        _id: generateObjectId(),
        name: 'Webcam HD 1080p',
        description: 'Camara web con autofocus y microfono integrado, ideal para videollamadas',
        price: 59.99,
        stock: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          category: 'accesorios',
          tags: ['webcam', 'hd', 'streaming'],
          rating: 4.0,
        },
      },
    ];
    setDocumentStorage(sampleDocs);
  }
}