import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/Product';

type DatabaseType = 'sql' | 'nosql';

interface UseProductsOptions {
  defaultDatabase?: DatabaseType;
  autoLoad?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  isFormOpen: boolean;
  currentDatabase: DatabaseType;
  loadProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  selectProduct: (product: Product | null) => void;
  openForm: () => void;
  closeForm: () => void;
  setDatabase: (type: DatabaseType) => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const { defaultDatabase = 'sql', autoLoad = true } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentDatabase, setCurrentDatabase] = useState<DatabaseType>(defaultDatabase);

  const getService = useCallback(async () => {
    if (currentDatabase === 'sql') {
      const module = await import('../services/sqlProductService');
      return module.sqlProductService;
    } else {
      const module = await import('../services/nosqlProductService');
      return module.nosqlProductService;
    }
  }, [currentDatabase]);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const service = await getService();
      const data = await service.getAll();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getService]);

  const createProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const service = await getService();
      await service.create(productData);
      await loadProducts();
      setIsFormOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear producto';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getService, loadProducts]);

  const updateProduct = useCallback(async (id: string, productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const service = await getService();
      await service.update(id, productData);
      await loadProducts();
      setSelectedProduct(null);
      setIsFormOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getService, loadProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const service = await getService();
      await service.delete(id);
      await loadProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getService, loadProducts]);

  const selectProduct = useCallback((product: Product | null) => {
    setSelectedProduct(product);
    if (product) {
      setIsFormOpen(true);
    }
  }, []);

  const openForm = useCallback(() => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setSelectedProduct(null);
    setIsFormOpen(false);
    setError(null);
  }, []);

  const setDatabase = useCallback((type: DatabaseType) => {
    setCurrentDatabase(type);
    setProducts([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadProducts();
    }
  }, [autoLoad, loadProducts]);

  useEffect(() => {
    if (currentDatabase && autoLoad) {
      loadProducts();
    }
  }, [currentDatabase, autoLoad, loadProducts]);

  return {
    products,
    isLoading,
    error,
    selectedProduct,
    isFormOpen,
    currentDatabase,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    selectProduct,
    openForm,
    closeForm,
    setDatabase
  };
};

export default useProducts;