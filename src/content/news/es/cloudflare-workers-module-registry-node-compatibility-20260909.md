---
translationId: cloudflare-workers-module-registry-node-compatibility-20260909
lang: es
slug: cloudflare-workers-module-registry-node-compatibility-20260909
title: "Cloudflare rehace el registro de módulos de Workers para acercarlo a Node.js"
description: "La nueva implementación de workerd usa URL reales, compilación diferida y cachés compartidas para mejorar la compatibilidad con Node.js, ESM, CommonJS y WebAssembly."
publishedAt: 2026-09-09
sourceName: "Cloudflare Blog"
sourceTitle: "How we rebuilt Cloudflare Workers’ module registry for Node.js compatibility"
sourceUrl: "https://blog.cloudflare.com/workers-module-registry-nodejs/"
author: "Logan Gatlin y James Snell"
tags: ["javascript", "nodejs", "modularidad", "runtime", "webassembly"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha reescrito el registro de módulos de Cloudflare Workers, la pieza de workerd que convierte los identificadores de importación en código ejecutable. La actualización busca resolver una limitación que suele quedar oculta tras las API: dos runtimes pueden ofrecer las mismas funciones de Node.js y comportarse de forma distinta al localizar, cargar, compilar o almacenar en caché los módulos.

La nueva implementación se ofrece mediante la opción de compatibilidad `new_module_registry`. Todavía no se activa automáticamente, por lo que los equipos deben habilitarla de forma explícita y comprobar el comportamiento de sus aplicaciones. El cambio afecta a ESM, CommonJS y WebAssembly, y añade compatibilidad con `import.meta.url`, `import.meta.main` e `import.meta.resolve()`.

El detalle técnico más importante es que los especificadores se tratan como URL reales, no como simples rutas de sistema de archivos. Esto permite aplicar reglas coherentes con `new URL()`, conservar consultas y fragmentos, y manejar protocolos como `node:` y `cloudflare:` sin depender de prefijos especiales. También se validan los atributos de importación y se homogeneizan los errores entre `import`, `import()` y `require()`. Para una aplicación que construye cargadores, plugins o capas de ejecución propias, esa coherencia facilita el diagnóstico y evita ramas específicas para cada camino de carga.

La compatibilidad con CommonJS también se acerca a Node.js. Cuando `require()` encuentra un módulo ESM, sigue las reglas de `require(esm)`: puede devolver una exportación llamada `module.exports` o, en su defecto, el espacio de nombres del módulo. Si el grafo contiene `top-level await`, la operación falla porque `require()` debe ser síncrono; en esos casos hay que usar `import()`. Es una restricción poco vistosa, pero evita que una aplicación reciba un módulo parcialmente evaluado.

El registro también cambia el coste de ejecución. La versión anterior compilaba todo el bundle al inicio y mantenía copias privadas por aislamiento V8. La nueva compila los módulos cuando se importan y permite compartir cachés entre réplicas del mismo Worker. Eso puede reducir trabajo repetido y memoria, aunque el resultado real dependerá del grafo de cada aplicación y de sus rutas calientes.

El cambio también afecta a las herramientas de build. El plugin de Vite para Workers usa Rolldown para resolver dependencias, convertir CommonJS cuando hace falta y producir chunks para importaciones dinámicas. Con un runtime más fiel a los estándares, el bundler puede transformar menos código y dejar más responsabilidad en la ejecución.

La lección para otros entornos JavaScript es clara: la compatibilidad no termina en copiar API. La resolución de módulos, la identidad, la asincronía, el modelo de errores y la caché forman parte del contrato. Cloudflare mantiene el registro antiguo para los Workers existentes, así que la migración puede probarse de manera gradual, con tests que cubran imports dinámicos, mezclas ESM/CommonJS, WebAssembly y errores de resolución.
