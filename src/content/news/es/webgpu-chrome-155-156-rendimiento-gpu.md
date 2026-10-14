---
translationId: webgpu-chrome-155-156-performance-20261007
lang: es
slug: webgpu-chrome-155-156-rendimiento-gpu
title: "WebGPU mejora el rendimiento gráfico con nuevas extensiones de WGSL"
description: "Las novedades de WebGPU en Chrome 155 y 156 afinan el descarte temprano de fragmentos, la compresión de texturas y los espacios de color HDR."
publishedAt: 2026-10-07
sourceName: "Chrome for Developers"
sourceTitle: "What's New in WebGPU (Chrome 155-156)"
sourceUrl: "https://developer.chrome.com/blog/new-in-webgpu-155-156"
author: "François Beaufort"
tags: ["webgpu", "javascript", "navegadores", "rendimiento", "gráficos"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

La actualización de WebGPU correspondiente a Chrome 155 y 156 reúne varias mejoras pequeñas, pero técnicamente significativas, para aplicaciones que renderizan gráficos o ejecutan cómputo en la GPU desde el navegador. No se trata de una única API revolucionaria: el valor está en reducir costes que antes obligaban a introducir padding, perder optimizaciones del hardware o limitar la fidelidad de color.

La novedad más directamente relacionada con el rendimiento es la extensión `fragment_depth` de WGSL. Cuando un shader escribe en `frag_depth`, los controladores suelen desactivar las optimizaciones early-Z porque no pueden garantizar que la profundidad calculada sea compatible con la interpolada por el rasterizador. La extensión permite declarar si el valor será menor o mayor que la profundidad original. Esa información hace posible que la GPU descarte fragmentos ocultos antes de ejecutar el shader costoso. El código debe comprobar la capacidad mediante `navigator.gpu.wgslLanguageFeatures` y declarar explícitamente `requires fragment_depth`, porque sigue siendo una función potencialmente no portable.

También llega `texture-compression-unaligned`. Hasta ahora, las texturas comprimidas tenían que respetar las dimensiones de los bloques de compresión, normalmente múltiplos de 4 en formatos como BC, ETC2 y ASTC. Cuando una imagen no encajaba, el desarrollador debía rellenarla o escalarla. La nueva capacidad permite crear texturas con dimensiones que no coinciden con esos bloques, evitando distorsiones y conservando mejor la fidelidad de los recursos originales. Como con cualquier extensión WebGPU, la aplicación debe consultar `adapter.features` y solicitarla solo cuando esté disponible.

En el tratamiento del color, WebGPU añade los espacios `srgb-linear` y `display-p3-linear`. Ambos representan los valores en un espacio lineal, lo que resulta más adecuado para cálculos de iluminación física, interpolación, antialiasing y procesamiento de imágenes de amplio gamut. El cambio es importante porque distingue entre cómo se almacenan los valores y cómo debe calcularse la luz; mezclar esos dos conceptos produce resultados visuales incorrectos aunque el código parezca razonable.

La actualización incorpora además el formato de vértices empaquetado `snorm10-10-10-2`, que guarda cuatro valores normalizados en 32 bits. Puede reducir el ancho de banda de atributos como normales y otros datos auxiliares, con el coste de una precisión más limitada. En Linux, los controladores NVIDIA recientes también pueden usar `shader-f16` para operaciones de 16 bits en WGSL.

La lección para equipos web es prudente: WebGPU ofrece más control, pero también exige degradación progresiva, comprobaciones de capacidades y pruebas en hardware real. Las mejoras no sustituyen a medir; permiten que una implementación bien diseñada pierda menos rendimiento cuando aprovecha funciones específicas del dispositivo.

Contenido generado automáticamente con IA.
