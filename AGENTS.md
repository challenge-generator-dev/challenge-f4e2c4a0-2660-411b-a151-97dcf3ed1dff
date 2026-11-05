# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD en bases de datos**.

| | |
|---|---|
| Tema | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| Nivel | trainee-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 19 |
| Patron arquitectonico | capas estándar (frontend + servicios backend simulados con mocks) |
| Tiempo estimado | 3 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0-rc.0
- react-dom 19.0.0-rc.0
- react-router-dom 6.22.3
- @types/react 18.2.79
- @types/react-dom 18.2.25
- typescript 5.4.5
- vite 5.2.10
- @vitejs/plugin-react 4.2.1
- eslint 8.57.0
- eslint-plugin-react 7.34.1
- eslint-plugin-react-hooks 4.6.0
- eslint-plugin-jsx-a11y 6.8.0
- @testing-library/react 15.0.2
- vitest 1.5.0
- jsdom 24.0.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Implementación de operaciones CRUD en base de datos SQL**: Base de datos SQL con operaciones CRUD implementadas y funcionales para productos.
- **Fase 2 — Implementación de operaciones CRUD en base de datos NoSQL**: Base de datos NoSQL con operaciones CRUD implementadas y funcionales para productos.
- **Fase 3 — Comparación y análisis de las implementaciones**: Documento que compara y analiza las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL, identificando ventajas, desventajas y posibles mejoras.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (15)

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/features/products/components/ProductList.tsx`
- `src/features/products/components/ProductForm.tsx`
- `src/features/products/hooks/useProducts.ts`
- `src/features/products/types/Product.ts`
- `src/features/products/services/sqlProductService.ts`
- `src/features/products/services/nosqlProductService.ts`
- `src/features/products/utils/validations.ts`
- `src/shared/services/apiClient.ts`
- `src/index.html`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/features`
- `src/features/products`
- `src/features/products/components`
- `src/features/products/hooks`
- `src/features/products/services`
- `src/features/products/types`
- `src/features/products/utils`
- `src/shared`
- `src/shared/components`
- `src/shared/hooks`
- `src/shared/services`
- `src/shared/types`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar (frontend + servicios backend simulados con mocks)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2
- Brecha que el reto ataca: Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
