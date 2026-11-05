import { Product } from '../types/Product';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateProductName(
  name: string,
  existingProducts: Product[]
): ValidationResult {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('El nombre del producto es obligatorio');
  } else if (name.trim().length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres');
  } else if (name.trim().length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres');
  } else {
    const isDuplicate = existingProducts.some(
      (p) => p.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (isDuplicate) {
      errors.push('Ya existe un producto con ese nombre');
    }
  }

  return { isValid: errors.length === 0, errors };
}

export function validateProductStock(stock: number): ValidationResult {
  const errors: string[] = [];

  if (typeof stock !== 'number' || isNaN(stock)) {
    errors.push('El stock debe ser un número válido');
  } else if (stock < 0) {
    errors.push('El stock no puede ser negativo');
  } else if (!Number.isInteger(stock)) {
    errors.push('El stock debe ser un número entero');
  } else if (stock > 999999) {
    errors.push('El stock no puede exceder 999999 unidades');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateProductPrice(price: number): ValidationResult {
  const errors: string[] = [];

  if (typeof price !== 'number' || isNaN(price)) {
    errors.push('El precio debe ser un número válido');
  } else if (price < 0) {
    errors.push('El precio no puede ser negativo');
  } else if (price > 999999.99) {
    errors.push('El precio no puede exceder 999999.99');
  } else if (price > 0 && price < 0.01) {
    errors.push('El precio mínimo es 0.01');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateProductDescription(description: string): ValidationResult {
  const errors: string[] = [];

  if (description && description.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres');
  }

  return { isValid: errors.length === 0, errors };
}

export function validateProduct(
  product: Partial<Product>,
  existingProducts: Product[],
  excludeId?: string
): ValidationResult {
  const allErrors: string[] = [];

  const filteredProducts = excludeId
    ? existingProducts.filter((p) => p.id !== excludeId)
    : existingProducts;

  if (product.name) {
    const nameResult = validateProductName(product.name, filteredProducts);
    allErrors.push(...nameResult.errors);
  }

  if (product.stock !== undefined) {
    const stockResult = validateProductStock(product.stock);
    allErrors.push(...stockResult.errors);
  }

  if (product.price !== undefined) {
    const priceResult = validateProductPrice(product.price);
    allErrors.push(...priceResult.errors);
  }

  if (product.description) {
    const descResult = validateProductDescription(product.description);
    allErrors.push(...descResult.errors);
  }

  return { isValid: allErrors.length === 0, errors: allErrors };
}