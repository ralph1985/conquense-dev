---
translationId: tsgolint-oxlint-type-aware-linting-20260911
lang: es
slug: tsgolint-lleva-el-linting-tipado-de-typescript-a-oxlint
title: "tsgolint lleva el linting tipado de TypeScript a la velocidad nativa de Oxlint"
description: "La versión estable de tsgolint conecta el análisis semántico de TypeScript 7 con el linter Oxlint, reduciendo drásticamente el coste de las comprobaciones profundas en proyectos de"
publishedAt: 2026-09-11
sourceName: "InfoQ"
sourceTitle: "tsgolint Reaches Stable v7, Bringing Go-Powered Type-Aware Linting to Oxlint"
sourceUrl: "https://www.infoq.com/news/2026/09/tsgolint-oxlint-typescript/"
author: "Daniel Curtis"
tags: ["javascript", "typescript", "tooling", "linting"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

El linting de TypeScript tiene dos velocidades. Las reglas sintácticas pueden revisar un archivo de forma aislada, pero las comprobaciones que detectan promesas no esperadas, aserciones innecesarias o condiciones imposibles necesitan construir un modelo semántico del programa completo. Esa segunda capa suele ser más valiosa para la calidad, pero también mucho más cara: durante años ha estado asociada a ESLint y typescript-eslint, con tiempos difíciles de encajar en repositorios grandes.

La versión estable 7 de tsgolint intenta cambiar ese equilibrio. El proyecto funciona como backend de análisis tipado para Oxlint, el linter escrito en Rust del ecosistema Oxc, y utiliza typescript-go, el puerto oficial del compilador de TypeScript a Go. La separación es deliberada: Oxlint se ocupa de descubrir archivos, leer la configuración y ejecutar reglas sintácticas rápidas; tsgolint recibe las comprobaciones que necesitan conocer los tipos y devuelve diagnósticos estructurados.

La cobertura ya alcanza 59 de las 61 reglas tipadas de typescript-eslint que el proyecto pretende soportar. Entre ellas está no-floating-promises, capaz de señalar llamadas asíncronas cuyo resultado puede perderse sin await ni manejo explícito. El proyecto publica comparaciones en varios repositorios conocidos: el análisis de VS Code pasa de minutos a pocos segundos en sus mediciones, mientras que TypeScript, TypeORM y Vue también muestran reducciones muy grandes. Son cifras del equipo y deben leerse como benchmarks concretos, no como una garantía universal: el hardware, la configuración y el tamaño del grafo de módulos cambian mucho el resultado.

La consecuencia práctica es más interesante que el número bruto. El análisis tipado deja de ser necesariamente una tarea reservada para una ejecución nocturna o para una fase lenta de CI. Un equipo puede mantener reglas semánticas en las comprobaciones de cada pull request, medir qué reglas consumen más tiempo y decidir dónde merece la pena pagar ese coste. Para un monorepo, esa visibilidad puede ser tan útil como la aceleración: permite separar problemas de configuración, caché, resolución de módulos y reglas concretas.

La adopción tiene límites claros. tsgolint sigue la versión del compilador que incorpora, por lo que la línea estable requiere TypeScript 7 y algunos proyectos deberán revisar opciones antiguas de tsconfig o características retiradas. Además, la compatibilidad de reglas no equivale a compatibilidad perfecta de autofixes; el análisis semántico continúa necesitando validación en cada base de código. La ruta sensata es probarlo en un paquete representativo, comparar diagnósticos con typescript-eslint y activar primero las reglas que detectan fallos de producción. El avance no elimina la complejidad de TypeScript, pero sí puede hacer que la calidad profunda deje de ser el paso que todos intentan saltarse.
