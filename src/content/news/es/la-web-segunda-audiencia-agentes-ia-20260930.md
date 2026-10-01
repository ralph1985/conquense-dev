---
translationId: cloudflare-agentic-web-second-audience-20260930
lang: es
slug: la-web-segunda-audiencia-agentes-ia-20260930
title: "La web empieza a diseñarse para una segunda audiencia: los agentes de IA"
description: "Los datos de Cloudflare muestran cómo el tráfico automatizado está cambiando y por qué los sitios necesitan distinguir entre búsqueda, entrenamiento y agentes transaccionales."
publishedAt: 2026-09-30
sourceName: "Cloudflare Blog"
sourceTitle: "The Internet has a second audience"
sourceUrl: "https://blog.cloudflare.com/agentic-web/"
author: "Matthew Conroy"
tags: ["web", "agentes", "inteligencia-artificial", "arquitectura", "rendimiento"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare sostiene que Internet está dejando de tener una única audiencia. Además de las personas y de los rastreadores tradicionales, cada vez llegan más agentes de software que consultan páginas para completar una tarea solicitada por un usuario. La afirmación se basa en datos de la red de Cloudflare, por lo que no debe leerse como una medición universal de toda la web, pero plantea un problema técnico que sí afecta a cualquier sitio público: no todo tráfico automatizado tiene la misma intención.

Según la compañía, su red pasó de gestionar una media de 63 millones de peticiones HTTP por segundo a finales de 2024 a unas 115 millones en 2026. También afirma que las peticiones diarias de agentes de IA crecieron más de un 1.700 % durante el último año y que, en su red, más de la mitad del tráfico ya no procede directamente de personas. Aunque estas cifras dependen de la visibilidad y clasificación de un proveedor concreto, apuntan a una presión creciente sobre cachés, orígenes, límites de tasa y costes de transferencia.

La distinción que propone Cloudflare es más útil que la etiqueta genérica “bot”. Un rastreador de entrenamiento recopila contenido para construir modelos; un rastreador de búsqueda ayuda a descubrir páginas; un agente vuelve cuando una persona necesita comparar, reservar, comprar o consultar algo. Bloquearlos a todos puede reducir costes, pero también puede impedir que un servicio sea encontrado o utilizado por el usuario que está detrás del agente.

Esta clasificación cambia varias decisiones de arquitectura. Los equipos necesitan observabilidad sobre quién solicita cada recurso, con qué frecuencia, qué respuestas consume y si vuelve a generar una conversión o una carga inútil. Las cabeceras User-Agent y las direcciones IP son señales débiles porque pueden falsificarse. Cloudflare describe Web Bot Auth, un mecanismo mediante el que ciertos operadores firman criptográficamente sus peticiones, como una forma de distinguir agentes autenticados de imitadores.

También propone separar las políticas para búsqueda, agentes y entrenamiento. Esa separación permite, por ejemplo, seguir apareciendo en buscadores, impedir el uso de contenido para entrenamiento y aplicar límites diferentes a páginas con anuncios, documentación o transacciones. El detalle importa porque una política única de bloqueo no expresa el valor económico ni el riesgo operativo de cada tipo de acceso.

Para los desarrolladores, la noticia no implica construir una interfaz paralela para máquinas de inmediato. Sí recomienda revisar la web como un sistema consumido por clientes heterogéneos: humanos, crawlers y agentes. HTML semántico, APIs claras, caché bien diseñada, autenticación verificable, rate limiting y métricas de coste son piezas de la misma arquitectura. La próxima generación de rendimiento web no dependerá solo de hacer una página más rápida para una persona, sino de decidir qué trabajo merece ejecutar cuando quien llama es software.
