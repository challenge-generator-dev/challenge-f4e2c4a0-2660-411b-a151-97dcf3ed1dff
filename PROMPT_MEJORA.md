# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos
- Tiempo estimado: 3 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de operaciones CRUD en base de datos SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL para gestionar productos. — entregable (NO resolver): Base de datos SQL con operaciones CRUD implementadas y funcionales para productos.
- Fase 2: Implementación de operaciones CRUD en base de datos NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL para gestionar productos. — entregable (NO resolver): Base de datos NoSQL con operaciones CRUD implementadas y funcionales para productos.
- Fase 3: Comparación y análisis de las implementaciones — objetivo: Comparar y analizar las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL. — entregable (NO resolver): Documento que compara y analiza las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL, identificando ventajas, desventajas y posibles mejoras.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "inventory-management-system",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write src/**/*.{ts,tsx}"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.22.3"
  },
  "devDependencies": {
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "@vitejs/plugin-react": "4.2.1",
    "typescript": "5.4.5",
    "vite": "5.2.10",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.1",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-jsx-a11y": "6.8.0",
    "@testing-library/react": "15.0.2",
    "vitest": "1.5.0",
    "jsdom": "24.0.0",
    "prettier": "3.2.5"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 80
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url))
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// === ARCHIVO: src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Manejo global de errores
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

// Configuración de servicios mock para desarrollo
if (import.meta.env.MODE === 'development') {
  import('./features/products/services/sqlProductService').then(({ sqlProductService }) => {
    console.log('SQL Product Service initialized for development');
  });

  import('./features/products/services/nosqlProductService').then(({ nosqlProductService }) => {
    console.log('NoSQL Product Service initialized for development');
  });
}

// === ARCHIVO: src/App.tsx ===
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

// === ARCHIVO: src/features/products/components/ProductList.tsx ===
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

// === ARCHIVO: src/features/products/components/ProductForm.tsx ===
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

// === ARCHIVO: src/features/products/hooks/useProducts.ts ===
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


// === ARCHIVO: src/features/products/types/Product.ts ===
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

// === ARCHIVO: src/features/products/services/sqlProductService.ts ===
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

// === ARCHIVO: src/features/products/services/nosqlProductService.ts ===
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


// === ARCHIVO: src/features/products/utils/validations.ts ===
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

// === ARCHIVO: src/shared/services/apiClient.ts ===
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = config;

    const url = this.buildURL(endpoint, params);
    const token = this.getAuthToken();
    const finalHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const status = response.status;

      if (!response.ok) {
        const errorMessage = await response.text();
        return {
          data: null,
          error: errorMessage || `HTTP error ${status}`,
          status,
        };
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data, error: null, status };
      }

      return { data: null as T, error: null, status };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      console.error(`API Error [${method}] ${endpoint}:`, errorMessage);
      return { data: null, error: errorMessage, status: 0 };
    }
  }

  private getAuthToken(): string | null {
    try {
      const token = localStorage.getItem('auth_token');
      return token;
    } catch {
      return null;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem('auth_token', token);
    } catch (err) {
      console.error('Failed to save auth token:', err);
    }
  }

  clearAuthToken(): void {
    try {
      localStorage.removeItem('auth_token');
    } catch (err) {
      console.error('Failed to clear auth token:', err);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;

// === ARCHIVO: src/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de inventario - CRUD de productos" />
    <meta name="theme-color" content="#1976d2" />
    <title>Gestión de Inventario</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.5;
      }

      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .app-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 1.25rem;
        color: #666;
      }

      .app-loading::after {
        content: '';
        width: 24px;
        height: 24px;
        margin-left: 12px;
        border: 3px solid #e0e0e0;
        border-top-color: #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="app-loading">Cargando aplicación</div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: README.md ===
# Inventory Management System

Sistema de gestión de inventario para una tienda en línea con operaciones CRUD en bases de datos SQL y NoSQL.

## Descripción del Proyecto

Este proyecto implementa un sistema de gestión de productos con las siguientes características:

- **Operaciones CRUD completas**: Crear, leer, actualizar y eliminar productos.
- **Soporte dual de bases de datos**: Implementaciones SQL y NoSQL.
- **Validaciones de negocio**: Nombres únicos de productos, stock no negativo.
- **Interfaz responsiva**: Componentes React con diseño adaptativo.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- **Node.js** versión 20.x o superior
- **npm** versión 10.x o superior (incluido con Node.js)

Verifica la instalación ejecutando:

```bash
node --version
npm --version
```

## Instalación

1. Clona o descarga el repositorio del proyecto.

2. Navega al directorio raíz del proyecto:

```bash
cd inventory-management-system
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

Este comando leerá el archivo `package.json` e instalará todas las dependencias necesarias:
- React 19 y React DOM
- React Router para navegación
- Vite como bundler de desarrollo
- Vitest para pruebas unitarias
- ESLint y Prettier para linting y formateo

## Ejecutar la Aplicación

### Modo Desarrollo

Para iniciar el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

Esto ejecutará Vite en modo desarrollo. Por defecto, la aplicación estará disponible en:

```
http://localhost:5173
```

### Construcción para Producción

Para generar los archivos optimizados para producción:

```bash
npm run build
```

Este comando ejecutará:
1. Verificación de tipos TypeScript (`tsc`)
2. Construcción con Vite

Los archivos generados se ubicarán en el directorio `dist/`.

### Vista Previa de Producción

Para servir los archivos construidos localmente:

```bash
npm run preview
```

## Pruebas

### Ejecutar Pruebas Unitarias

```bash
npm run test
```

Esto ejecutará Vitest en modo watch. Para ejecutar las pruebas una sola vez:

```bash
npm run test -- --run
```

### Verificar Tipos TypeScript

El comando de build ya incluye verificación de tipos. Para verificar sin construir:

```bash
npx tsc --noEmit
```

## Linting y Formateo

### ESLint

Ejecutar el linter para verificar código:

```bash
npm run lint
```

### Prettier

Formatear automáticamente el código:

```bash
npm run format
```

## Estructura del Proyecto

```
src/
├── main.tsx                    # Punto de entrada de la aplicación
├── App.tsx                     # Componente raíz con rutas
├── index.html                  # HTML raíz
├── features/
│   └── products/
│       ├── components/         # Componentes React
│       │   ├── ProductList.tsx # Lista de productos
│       │   └── ProductForm.tsx # Formulario de productos
│       ├── hooks/
│       │   └── useProducts.ts  # Hook personalizado para gestión de productos
│       ├── services/
│       │   ├── sqlProductService.ts    # Servicio SQL
│       │   └── nosqlProductService.ts  # Servicio NoSQL
│       ├── types/
│       │   └── Product.ts      # Tipos TypeScript
│       └── utils/
│           └── validations.ts  # Validaciones de negocio
└── shared/
    └── services/
        └── apiClient.ts        # Cliente HTTP compartido
```

## Arquitectura

El proyecto sigue el patrón contenedor/presentacional:

- **Contenedores**: Componentes que manejan estado y lógica de negocio (`useProducts`).
- **Presentacionales**: Componentes que solo renderizan UI (`ProductList`, `ProductForm`).

Los servicios de base de datos están separados en:
- `sqlProductService.ts`: Implementación de operaciones CRUD para SQL
- `nosqlProductService.ts`: Implementación de operaciones CRUD para NoSQL

## API de Productos

### Estructura del Producto

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Métodos Disponibles

Cada servicio (SQL y NoSQL) proporciona:

- `getAll()`: Obtener todos los productos
- `getById(id)`: Obtener un producto por ID
- `create(product)`: Crear un nuevo producto
- `update(id, product)`: Actualizar un producto existente
- `delete(id)`: Eliminar un producto

### Validaciones

- **Nombre único**: No se permiten productos con nombres duplicados
- **Stock no negativo**: El stock debe ser mayor o igual a 0
- **Precio positivo**: El precio debe ser mayor a 0

## Tecnologías Utilizadas

- **React 19**: Biblioteca de UI
- **TypeScript 5.4**: Tipado estático
- **Vite 5.2**: Bundler y servidor de desarrollo
- **React Router 6**: Navegación
- **Vitest 1.5**: Pruebas unitarias
- **ESLint 8**: Linting de código
- **Prettier 3**: Formateo de código

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run preview` | Servir build de producción |
| `npm run test` | Ejecutar pruebas |
| `npm run lint` | Verificar código con ESLint |
| `npm run format` | Formatear código con Prettier |

## Solución de Problemas

### Error al instalar dependencias

Si `npm install` falla, verifica la versión de Node.js:

```bash
node --version  # Debe ser >= 20.0.0
```

### Error de TypeScript

Si hay errores de tipos, verifica que el archivo `tsconfig.json` esté correctamente configurado y que todas las dependencias de tipo estén instaladas.

### Puerto en uso

Si el puerto 5173 está en uso, Vite intentará automáticamente con el siguiente puerto disponible. También puedes especificar un puerto diferente:

```bash
npm run dev -- --port 3000
```

## Contribución

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Ejecuta `npm run lint` y `npm run test`
5. Haz commit de tus cambios
6. Push a la rama
7. Crea un Pull Request

```
