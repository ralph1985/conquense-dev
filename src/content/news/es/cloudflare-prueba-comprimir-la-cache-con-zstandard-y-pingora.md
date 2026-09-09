---
translationId: cloudflare-cache-transcoding-zstd-2026
lang: es
slug: cloudflare-prueba-comprimir-la-cache-con-zstandard-y-pingora
title: "Cloudflare prueba comprimir la caché con Zstandard y Pingora"
description: "Un prototipo de Cloudflare almacena HTML, JSON, CSS y JavaScript comprimidos dentro de la caché. La propuesta muestra cómo intercambiar una pequeña cantidad de CPU por más densidad"
publishedAt: 2026-09-01
sourceName: "Cloudflare Blog"
sourceTitle: "How we could save petabytes of cache storage with Zstandard and Pingora"
sourceUrl: "https://blog.cloudflare.com/cache-transcoding/"
author: "Aashi Patel"
tags: ["web-performance", "systems", "compression", "infrastructure"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare está probando una modificación de arquitectura que desplaza la compresión al interior de la caché. El prototipo, construido alrededor de Pingora y Zstandard, conserva una representación comprimida de ciertos objetos en disco y entre niveles de caché, pero devuelve al cliente el contenido original esperado. La propuesta es sencilla de describir y difícil de operar a escala: gastar algo de CPU en cada lectura para ahorrar almacenamiento y ancho de banda durante toda la vida del objeto.

El punto de partida es que una caché distribuida no solo sirve respuestas. También las almacena, las replica y las mueve entre centros de datos. Si el contenido permanece sin comprimir en esas etapas, cada copia consume más espacio y cada transferencia interna mueve más bytes de los necesarios. En las primeras pruebas de Cloudflare, los recursos elegibles ocuparon aproximadamente un tercio de su tamaño original en disco. El beneficio se acumula cuando un objeto se reutiliza muchas veces o atraviesa varios niveles de caché.

La elección de Zstandard responde a un equilibrio conocido en sistemas de infraestructura: no basta con lograr la mayor reducción posible, también hay que comprimir y descomprimir con rapidez predecible. Cloudflare cita pruebas anteriores en las que zstd comprimió más rápido que Brotli con tamaños parecidos y produjo archivos más pequeños que gzip a una velocidad comparable. El prototipo utiliza el nivel 3, buscando una relación razonable entre ahorro y coste de CPU.

El filtro de elegibilidad es tan importante como el algoritmo. Imágenes, vídeo y fuentes ya suelen llegar comprimidos; volver a procesarlos consumiría CPU sin aportar una reducción útil. En la muestra analizada, ese contenido representaba el 63,3 por ciento de los bytes aunque solo suponía el 21,4 por ciento de las solicitudes. HTML, JSON, CSS y JavaScript, en cambio, eran el 22,3 por ciento de los bytes y una parte considerable llegaba sin Content-Encoding. La oportunidad está, por tanto, en el texto que todavía no tiene una representación eficiente dentro de la infraestructura.

Las mediciones publicadas sitúan la compresión en 4,31 nanosegundos por byte y la descompresión en 1,56 nanosegundos por byte en las condiciones del prototipo. La política ensayada comprime texto elegible a partir de 4 KiB, en lugar de limitarse solo a los objetos más populares. La razón es que la descompresión ocurre en cada entrega: concentrarse únicamente en los objetos calientes no eliminaba suficiente trabajo para compensar la pérdida de ahorro de almacenamiento.

La lección para equipos más pequeños no es copiar el diseño de Cloudflare, sino separar claramente los costes por etapa. Comprimir en origen puede mejorar la red pública; comprimir dentro de una caché puede mejorar almacenamiento y enlaces internos. Antes de adoptar una técnica similar conviene medir tamaño, frecuencia de reutilización, CPU, latencia y compatibilidad con cabeceras de contenido. La optimización solo funciona si el ahorro permanece mayor que el trabajo añadido en cada recorrido.
