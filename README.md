# Implementación de operaciones CRUD en bases de datos

El sistema de gestión de inventario de una tienda en línea requiere la implementación de operaciones CRUD (crear, leer, actualizar, eliminar) en bases de datos SQL y NoSQL. Los productos tienen atributos como nombre, descripción, precio y stock. El sistema debe permitir la creación de nuevos productos, la lectura de la lista de productos, la actualización de la información de los productos y la eliminación de productos. Los nombres de los productos no pueden ser duplicados y el stock no puede ser negativo.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 3 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de operaciones CRUD en base de datos SQL

**Objetivo:** Implementar operaciones CRUD en una base de datos SQL para gestionar productos.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Diseña la estructura de la tabla de productos en la base de datos SQL.
- Implementa las operaciones CRUD para la tabla de productos en la base de datos SQL.
- Asegúrate de que los nombres de los productos no sean duplicados y que el stock no sea negativo.

**Entregable:** Base de datos SQL con operaciones CRUD implementadas y funcionales para productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los tipos de datos apropiados para cada atributo del producto.
- Piensa en cómo manejar las restricciones de unicidad y valores negativos en la base de datos.

</details>

### Fase 2: Implementación de operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar operaciones CRUD en una base de datos NoSQL para gestionar productos.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Diseña la estructura del documento de productos en la base de datos NoSQL.
- Implementa las operaciones CRUD para el documento de productos en la base de datos NoSQL.
- Asegúrate de que los nombres de los productos no sean duplicados y que el stock no sea negativo.

**Entregable:** Base de datos NoSQL con operaciones CRUD implementadas y funcionales para productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la estructura del documento y cómo representar los atributos del producto.
- Piensa en cómo manejar las restricciones de unicidad y valores negativos en la base de datos NoSQL.

</details>

### Fase 3: Comparación y análisis de las implementaciones

**Objetivo:** Comparar y analizar las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Compara las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL.
- Analiza las ventajas y desventajas de cada enfoque.
- Identifica posibles mejoras para cada implementación.

**Entregable:** Documento que compara y analiza las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL, identificando ventajas, desventajas y posibles mejoras.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la escalabilidad, el rendimiento y la complejidad de cada implementación.
- Piensa en cómo cada enfoque podría afectar la gestión de productos en el sistema de inventario.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en bases de datos SQL y NoSQL?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en un sistema de gestión de inventario?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD en bases de datos SQL y NoSQL para gestionar productos?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en bases de datos?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección entre una base de datos SQL y NoSQL para implementar operaciones CRUD?

## Criterios de Evaluacion

- Implementación correcta de operaciones CRUD en base de datos SQL.
- Implementación correcta de operaciones CRUD en base de datos NoSQL.
- Comparación y análisis adecuados de las implementaciones de operaciones CRUD en bases de datos SQL y NoSQL.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
