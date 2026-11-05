import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { validateProduct, ValidationError } from '../utils/validations';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [stock, setStock] = useState(product?.stock?.toString() || '');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    }
  }, [product]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0
    };
    
    const fieldErrors = validateProduct(productData);
    const fieldError = fieldErrors.filter(
      err => err.field === field
    );
    
    setErrors(prev => {
      const otherErrors = prev.filter(err => err.field !== field);
      return [...otherErrors, ...fieldError];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0
    };
    
    const validationErrors = validateProduct(productData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, description: true, price: true, stock: true });
      return;
    }
    
    try {
      await onSubmit(productData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el producto';
      setErrors([{ field: 'general', message: errorMessage }]);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    const error = errors.find(err => err.field === fieldName);
    return error?.message;
  };

  const isFieldTouched = (fieldName: string): boolean => {
    return touched[fieldName] || false;
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} aria-label={isEditing ? 'Editar producto' : 'Crear producto'}>
      {errors.find(e => e.field === 'general') && (
        <div className="form-error general-error" role="alert">
          {errors.find(e => e.field === 'general')?.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="product-name">
          Nombre del Producto
          <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={isFieldTouched('name') && !!getFieldError('name')}
          aria-describedby={getFieldError('name') ? 'name-error' : undefined}
          className={isFieldTouched('name') && getFieldError('name') ? 'input-error' : ''}
        />
        {isFieldTouched('name') && getFieldError('name') && (
          <span id="name-error" className="field-error" role="alert">
            {getFieldError('name')}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="product-description">Descripción</label>
        <textarea
          id="product-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          disabled={isSubmitting}
          rows={3}
          aria-invalid={isFieldTouched('description') && !!getFieldError('description')}
          aria-describedby={getFieldError('description') ? 'description-error' : undefined}
        />
        {isFieldTouched('description') && getFieldError('description') && (
          <span id="description-error" className="field-error" role="alert">
            {getFieldError('description')}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="product-price">
            Precio
            <span className="required" aria-hidden="true">*</span>
          </label>
          <div className="input-currency">
            <span className="currency-symbol" aria-hidden="true">$</span>
            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              onBlur={() => handleBlur('price')}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={isFieldTouched('price') && !!getFieldError('price')}
              aria-describedby={getFieldError('price') ? 'price-error' : undefined}
              className={isFieldTouched('price') && getFieldError('price') ? 'input-error' : ''}
            />
          </div>
          {isFieldTouched('price') && getFieldError('price') && (
            <span id="price-error" className="field-error" role="alert">
              {getFieldError('price')}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="product-stock">
            Stock
            <span className="required" aria-hidden="true">*</span>
          </label>
          <input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={e => setStock(e.target.value)}
            onBlur={() => handleBlur('stock')}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={isFieldTouched('stock') && !!getFieldError('stock')}
            aria-describedby={getFieldError('stock') ? 'stock-error' : undefined}
            className={isFieldTouched('stock') && getFieldError('stock') ? 'input-error' : ''}
          />
          {isFieldTouched('stock') && getFieldError('stock') && (
            <span id="stock-error" className="field-error" role="alert">
              {getFieldError('stock')}
            </span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-submit"
        >
          {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="btn-cancel"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;