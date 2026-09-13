---
translationId: vercel-cdn-metadata-shards-20260910
lang: es
slug: vercel-reduce-un-91-por-ciento-la-latencia-de-metadatos-de-su-cdn
title: "Vercel reduce un 91 % la latencia de metadatos de su CDN"
description: "Vercel explica cómo sustituyó las búsquedas de metadatos por ruta por fragmentos indexados para reducir la latencia P99 y acelerar las publicaciones."
publishedAt: 2026-09-10
sourceName: "Vercel"
sourceTitle: "How we cut CDN metadata lookup latency by 91%"
sourceUrl: "https://vercel.com/blog/how-we-cut-cdn-metadata-lookup-latency-by-91-percent"
author: "Tim Caswell, Steven Salat y Luba Kravchenko"
tags: ["web-performance", "cdn", "caching", "routing"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Vercel ha explicado una optimización interna de su CDN que reduce un 91 % la latencia P99 de las búsquedas de metadatos de rutas. El cambio no modifica el contrato que usan los frameworks para describir una aplicación: reorganiza la forma en que la infraestructura almacena y recupera esa información cuando llega una petición.

El problema aparecía especialmente en despliegues grandes. La CDN debía resolver una ruta solicitando y almacenando metadatos para cada destino por separado. Un proyecto podía tener cientos de miles de rutas y cada despliegue generaba nuevas claves de caché, por lo que las primeras peticiones sufrían una cadena recurrente de fallos de caché. Además, una URL visible no siempre coincide con el recurso que la sirve: una página como /blog/hola puede terminar en una ruta dinámica y su carga de React Server Components puede requerir todavía otro destino.

La solución combina dos ideas conocidas, aplicadas con límites prácticos. Primero, un filtro de Bloom descarta las rutas que con seguridad no existen. Después, en vez de guardar cada registro como un objeto independiente, Vercel agrupa muchos metadatos en fragmentos o shards de tamaño acotado. Cada fragmento usa registros JSONL ordenados y un índice en línea que permite localizar una entrada sin descomprimir ni analizar el resto del archivo. La búsqueda se realiza mediante lecturas de punteros y comparaciones de cadenas en O(log n), y solo se analiza el valor JSON que corresponde a la ruta encontrada.

El tamaño del fragmento fue decisivo. Los fragmentos de varios megabytes mejoraban la caché regional, pero resultaban costosos cuando no estaban en la pequeña caché LRU de cada proceso. Los fragmentos demasiado pequeños provocaban más fallos en la caché regional. Las pruebas con tráfico de producción llevaron a un equilibrio aproximado de 200 KB. Entre el 5 y el 12 de agosto de 2026, la latencia P99 pasó de 215,8 a 19,1 milisegundos; la media bajó de 8,59 a 1,81 milisegundos.

La migración también mejoró el proceso de despliegue. Al eliminar subidas de metadatos que ya no eran necesarias, Vercel ahorró unos 16,6 segundos en varias etapas y observó despliegues aproximadamente un 10 % más rápidos, con una mejora estimada cercana al 25 % en proyectos especialmente cargados de metadatos.

La parte más útil para otros equipos está en la verificación. Antes de activar el nuevo formato, Vercel comparó ambas rutas de búsqueda con un arnés offline y después ejecutó las dos en modo sombra sobre una muestra aleatoria, sirviendo todavía la respuesta antigua. Ese proceso detectó diferencias, incluido un caso límite relacionado con emojis y una codificación antigua. La lección técnica es sobria: agrupar datos puede reducir viajes y fallos de caché, pero solo funciona si el tamaño, el índice y la estrategia de validación se miden con tráfico real.
