---
translationId: cloudflare-search-agents-http-query-20261125
lang: es
slug: cloudflare-busqueda-agentes-http-query
title: "Cloudflare convierte la búsqueda para agentes en una interfaz web descubrible"
description: "Search for Agents combina recuperación de contenido, descubrimiento automático y HTTP QUERY: una propuesta con implicaciones para arquitectura y pruebas."
publishedAt: 2026-11-25
sourceName: "Cloudflare Blog"
sourceTitle: "Introducing Search for Agents"
sourceUrl: "https://blog.cloudflare.com/search-for-agents/"
author: "Conquense Dev"
tags: ["applied-ai", "web-architecture", "http", "testing"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare presentó el 25 de noviembre Search for Agents, un servicio que permite a los agentes descubrir y consultar un índice del contenido de un dominio. El anuncio plantea una cuestión de arquitectura relevante: cómo ofrecer información recuperable a un consumidor automático sin obligarlo a recorrer la interfaz pensada para personas. La propuesta publica una búsqueda bajo el propio dominio y anuncia su existencia mediante metadatos. [Anuncio de Cloudflare](https://blog.cloudflare.com/search-for-agents/).

La separación de responsabilidades merece atención. Un equipo que mantiene documentación puede evaluar la recuperación independientemente de la respuesta que termine redactando un modelo. Por ejemplo, ante una pregunta sobre una API retirada, convendría comprobar primero si aparecen las páginas de migración correctas. Solo después tendría sentido juzgar la explicación del agente. Esta es una recomendación de diseño y evaluación, no un resultado demostrado por el lanzamiento.

Según la documentación, el servicio está en beta. Sus valores iniciales incluyen búsqueda híbrida por palabras clave y vectores, sincronización cada 24 horas y una caché de similitud de 48 horas. El endpoint devuelve contenido recuperado en Markdown, con referencias y puntuaciones, en lugar de generar una respuesta. Estos detalles están documentados en la [guía de Search for Agents](https://developers.cloudflare.com/ai-search/how-to/search-for-agents/).

Para un portal técnico, esos valores sugieren pruebas concretas antes de adoptarlo. Sería razonable preparar preguntas con identificadores exactos, conceptos expresados con otras palabras y documentación de varias versiones. También convendría modificar una página y medir cuándo cambia el resultado recuperado. Una prueba útil debería registrar la consulta, los documentos esperados, los fragmentos recibidos y el momento de actualización; así podría distinguir un problema de relevancia de otro de frescura.

Hay además una conexión con el diseño de HTTP. El servicio admite QUERY, cuyo significado está definido en el RFC 10008, publicado en junio de 2026. Este método permite enviar criterios en el cuerpo de una petición con semántica segura e idempotente: el cliente no solicita modificar el recurso y puede repetir la operación tras un fallo de conexión. El RFC explica por qué resulta útil cuando una consulta es incómoda de representar en una URL. [Especificación de HTTP QUERY](https://www.rfc-editor.org/rfc/rfc10008.html).

En una integración real, recomendaríamos verificar el recorrido completo de QUERY por clientes, proxies y controles de acceso, además de conservar pruebas de GET. El soporte anunciado por un servicio no demuestra que todas las piezas de una instalación lo procesen correctamente. Tampoco debe confundirse la idempotencia con un coste nulo: cualquier estrategia de reintentos necesita límites.

El valor técnico de esta novedad puede evaluarse con un piloto acotado: un conjunto público de documentación, preguntas de referencia y mediciones de relevancia, actualización y latencia. Esa evidencia permitiría decidir si una interfaz específica de recuperación mejora el trabajo del agente y cuánto mantenimiento añade.
