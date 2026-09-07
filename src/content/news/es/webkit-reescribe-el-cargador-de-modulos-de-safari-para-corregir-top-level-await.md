---
translationId: webkit-top-level-await-safari-2026-09-02
lang: es
slug: webkit-reescribe-el-cargador-de-modulos-de-safari-para-corregir-top-level-await
title: "WebKit reescribe el cargador de módulos de Safari para corregir top-level await"
description: "El nuevo cargador de módulos de Safari busca resolver errores de evaluación asíncrona mediante una implementación alineada con ECMAScript y validada con fuzzing y pruebas web."
publishedAt: 2026-09-02
sourceName: "WebKit"
sourceTitle: "Fixing Top-Level Await in Safari"
sourceUrl: "https://webkit.org/blog/18227/fixing-top-level-await-in-safari/"
author: "Kai Tamkun"
tags: ["javascript", "navegadores", "apis web", "testing"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

WebKit ha explicado cómo reescribió el cargador de módulos de Safari para corregir problemas de compatibilidad con top-level await. La característica permite usar await en el nivel superior de un módulo ECMAScript, pero su semántica afecta al grafo completo de dependencias: los módulos que importan al módulo suspendido también esperan, mientras que otros módulos independientes pueden continuar.

El problema de Safari no era simplemente una implementación incompleta de una sintaxis. El cargador original se había construido años atrás sobre la propuesta WHATWG Loader, que dejó de evolucionar antes de que ECMAScript incorporara async/await y top-level await. Ese diseño podía producir una secuencia incorrecta al importar varias veces el mismo módulo asíncrono. Algunas promesas se resolvían antes de que terminara la evaluación real y el código consumidor podía intentar leer exportaciones todavía no inicializadas.

El equipo ilustra el fallo con tres importaciones dinámicas concurrentes. Con el cargador antiguo, las importaciones podían completarse en un orden inesperado y generar errores como Cannot access 'someArray' before initialization. El problema aparecía en el momento en que el módulo pausaba su ejecución en await: el segundo y el tercer importador observaban una resolución prematura, aunque la evaluación del módulo aún no había terminado.

En lugar de añadir otro parche, WebKit decidió reconstruir el cargador conforme a los algoritmos de módulos asíncronos definidos por ECMAScript. El equipo elaboró un grafo de llamadas a partir del pseudocódigo de la especificación y trasladó las operaciones a C++. El cambio también abandona el antiguo builtin autoalojado en JavaScript. Según WebKit, esa implementación tenía costes de arranque y una previsibilidad de rendimiento menor porque debía compilarse en tiempo de ejecución, mientras que el cargador no era un camino suficientemente caliente para compensarlo con optimización JIT.

La validación combina varias capas. Ingenieros de Bun aportaron casos que reproducían comportamientos incorrectos heredados por su uso de JavaScriptCore. WebKit los adaptó a sus pruebas y añadió un fuzzer capaz de generar grafos complejos con módulos que contienen top-level await y módulos que no lo contienen. Las salidas del motor nuevo se compararon byte a byte con otros motores JavaScript. Además, el equipo ejecutó test262 y pruebas de Web Platform Tests, corrigiendo fallos previos sin introducir regresiones en los casos cubiertos.

La implementación puede probarse en Safari Technology Preview 251 y en la beta de Safari 27. Para los desarrolladores, la noticia no significa que todas las aplicaciones deban adoptar inmediatamente top-level await. Sí ofrece una señal relevante: las aplicaciones que dependen de módulos ES asíncronos deben probar grafos de importación reales en varios motores, especialmente cuando existen ciclos, importaciones dinámicas o exportaciones inicializadas después de una espera.

La lección de ingeniería va más allá de Safari. Cuando una funcionalidad atraviesa una máquina de estados compleja, corregir la capa fundamental puede ser más fiable que acumular excepciones locales. La especificación, los casos de reproducción, el fuzzing diferencial y las suites de conformidad forman juntos una estrategia de mantenimiento que convierte un error sutil de ejecución en un comportamiento verificable.
