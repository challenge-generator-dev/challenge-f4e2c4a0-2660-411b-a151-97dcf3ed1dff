import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProductList from '@/features/products/components/ProductList';
import ProductForm from '@/features/products/components/ProductForm';
import { Product } from '@/features/products/types/Product';
import { sqlProductService } from '@/features/products/services/sqlProductService';
import { nosqlProductService } from '@/features/products/services/nosqlProductService';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [databaseType, setDatabaseType] = useState<'sql' | 'nosql'>('sql');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const service = databaseType === 'sql' ? sqlProductService : nosqlProductService;
        const data = await service.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [databaseType]);

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const service = databaseType === 'sql' ? sqlProductService : nosqlProductService;
      const newProduct = await service.create(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  const handleUpdateProduct = async (id: string, product: Omit<Product, 'id'>) => {
    try {
      const service = databaseType === 'sql' ? sqlProductService : nosqlProductService;
      const updatedProduct = await service.update(id, product);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const service = databaseType === 'sql' ? sqlProductService : nosqlProductService;
      await service.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  const toggleDatabase = () => {
    setDatabaseType((prev) => (prev === 'sql' ? 'nosql' : 'sql'));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Inventario</h1>
        <div className="database-toggle">
          <button onClick={toggleDatabase}>
            Cambiar a {databaseType === 'sql' ? 'NoSQL' : 'SQL'}
          </button>
          <span>Base de datos actual: {databaseType.toUpperCase()}</span>
        </div>
      </header>
      <main>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Navigate to="/products" replace />}
          />
          <Route
            path="/products"
            element=
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
              />
          />
          <Route
            path="/products/new"
            element=
              <ProductForm
                onSubmit={handleAddProduct}
                title="Crear Nuevo Producto"
              />
          />
          <Route
            path="/products/edit/:id"
            element=
              <ProductForm
                onSubmit={handleUpdateProduct}
                title="Editar Producto"
              />
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;