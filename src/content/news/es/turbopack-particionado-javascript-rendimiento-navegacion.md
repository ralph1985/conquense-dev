---
translationId: turbopack-chunking-2026-09-03
lang: es
slug: turbopack-particionado-javascript-rendimiento-navegacion
title: "Turbopack replantea el particionado de JavaScript con datos de navegación"
description: "Next.js explica cómo Turbopack equilibra tamaño transferido, número de peticiones, caché y navegación para decidir qué módulos compartir."
publishedAt: 2026-09-03
sourceName: "Next.js"
sourceTitle: "How Turbopack chunks your JavaScript"
sourceUrl: "https://nextjs.org/blog/turbopack-chunking"
author: "Sam Poder"
tags: ["turbopack", "nextjs", "javascript", "web-performance", "bundling"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

El particionado de JavaScript suele presentarse como una elección entre un bundle grande y muchos archivos pequeños. Una nueva explicación técnica de Next.js muestra que el problema real es más incómodo: cada estrategia optimiza una combinación distinta de carga inicial, reutilización de caché, número de peticiones y navegación posterior. No existe un tamaño ideal de chunk independiente del comportamiento de los usuarios.

El artículo compara tres extremos usando la propia web de Next.js. Un único chunk contiene los 355 módulos en 1,09 MB y favorece la caché entre páginas, pero obliga a descargar código innecesario en rutas sencillas. Un chunk por página reduce el código sobrante, aunque duplica módulos compartidos. Un chunk por módulo conserva la granularidad, pero llega a 355 peticiones y aumenta el coste de red y de compresión. HTTP/2 abarata las peticiones, pero no elimina sus cabeceras, su coordinación ni la pérdida de oportunidades de compresión cuando los archivos son demasiado pequeños.

La solución de Turbopack se apoya en grupos de chunks: unidades que se cargan juntas para una ruta o flujo. El bundler puede fusionar módulos dentro del mismo grupo sin añadir código que esa navegación ya necesitaba. En la medición publicada, la configuración predeterminada reduce las peticiones totales de 96 a 38 frente a no fusionar, y transfiere ligeramente menos JavaScript. Fusionarlo todo baja las peticiones a 15, pero aumenta un 10 % el código descargado durante el recorrido completo. El resultado depende de si la sesión termina en la primera página o continúa navegando.

Next.js 16.3 añade una respuesta al problema que el build no puede conocer: qué tiene ya guardado el navegador. Con `experimental.turbopackChunking.generateComponentChunks`, Turbopack emite versiones fusionadas y versiones de componentes. En tiempo de ejecución puede elegir el archivo completo o solo las piezas que faltan, evitando volver a descargar un módulo compartido durante una navegación suave.

También aparecen opciones para sustituir las suposiciones generales por datos del sitio: ponderar la probabilidad de rebote, priorizar rutas críticas y declarar grupos de páginas visitadas conjuntamente. Además, el equipo experimenta con tree-shaking de CommonJS, un runtime compartido y la carga diferida de código para WebAssembly y Web Workers.

La lección para cualquier aplicación frontend es metodológica. El bundle debe evaluarse junto con las rutas reales, las sesiones y la caché, no solo con su tamaño en disco. Las métricas de navegación pueden justificar una estrategia de empaquetado distinta y evitar optimizaciones que mejoran el primer clic mientras empeoran el resto de la visita.
