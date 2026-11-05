export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ProductSortField = 'name' | 'price' | 'stock' | 'createdAt' | 'updatedAt';

export type SortOrder = 'asc' | 'desc';

export interface ProductSortOptions {
  field: ProductSortField;
  order: SortOrder;
}

export interface ProductValidationError {
  field: string;
  message: string;
}

export interface ProductOperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: ProductValidationError[];
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export interface ProductDatabaseRow {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductDocument {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    category?: string;
    tags?: string[];
    rating?: number;
  };
}