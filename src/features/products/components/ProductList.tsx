import React from 'react';
import { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="product-list-loading" role="status" aria-label="Cargando productos">
        <div className="spinner" aria-hidden="true"></div>
        <span>Cargando productos...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty" role="status">
        <p>No hay productos disponibles.</p>
        <p>Agrega tu primer producto usando el formulario.</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <table className="product-table" aria-label="Lista de productos">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="product-row">
              <td className="product-name">{product.name}</td>
              <td className="product-description">{product.description}</td>
              <td className="product-price">${product.price.toFixed(2)}</td>
              <td className={`product-stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                {product.stock}
              </td>
              <td className="product-actions">
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                  aria-label={`Editar producto ${product.name}`}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => onDelete(product.id)}
                  aria-label={`Eliminar producto ${product.name}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;