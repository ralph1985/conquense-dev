---
translationId: 20260905-chrome-154-web-platforma
lang: es
slug: chrome-154-lleva-seguridad-y-accesibilidad-a-las-apis-web
title: "Chrome 154 beta amplía las primitivas web de accesibilidad, seguridad y concurrencia"
description: "La beta de Chrome 154 incorpora cambios en navegación accesible, CSS Typed OM para workers, WebCrypto poscuántica y controles CORS para Background Fetch."
publishedAt: 2026-09-02
sourceName: "Chrome for Developers"
sourceTitle: "Chrome 154 beta"
sourceUrl: "https://developer.chrome.com/blog/chrome-154-beta"
author: "Rachel Andrew"
tags: ["JavaScript", "APIs web", "accesibilidad", "seguridad", "rendimiento web"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

La beta de Chrome 154, publicada el 2 de septiembre, reúne varios cambios de plataforma que afectan a la arquitectura de aplicaciones web más que a la apariencia de una versión concreta. Entre ellos destacan una navegación por marcadores con semántica accesible, nuevas capacidades para workers y un endurecimiento de las fronteras de red y criptografía.

El cambio más visible para interfaces complejas afecta a `scroll-marker-group`. El navegador puede tratar el grupo como una lista de enlaces o como un conjunto de pestañas. En el modo `links`, el grupo adopta el rol de navegación, cada marcador se comporta como un enlace y todos forman parte de la secuencia de tabulación. En el modo `tabs`, el grupo usa la semántica de `tablist`, solo el marcador activo recibe foco mediante tabulación, las flechas permiten moverse entre marcadores y el contenido inactivo desaparece del árbol de accesibilidad. Esto no convierte automáticamente cualquier carrusel en una buena interfaz, pero sí acerca parte de su comportamiento a patrones reconocibles por tecnologías de asistencia.

Chrome 154 también expone la jerarquía de `CSSStyleValue` del CSS Typed OM en contextos de worker. Para aplicaciones que trasladan cálculos de estilo o procesamiento fuera del hilo principal, la alineación reduce la necesidad de adaptadores específicos del navegador. La ventaja arquitectónica es mantener una frontera más clara entre cálculo y presentación, aunque el código debe seguir comprobando compatibilidad antes de asumir que todos los motores ofrecen la misma superficie.

En seguridad, Background Fetch pasa a aplicar CORS y las restricciones de Local Network Access. Un service worker ya no debería poder usar esa vía para esquivar las políticas que tendría una petición `fetch` normal hacia recursos locales o de loopback. La beta también incorpora en WebCrypto ML-KEM, ML-DSA, ChaCha20-Poly1305 y X-Wing, además de propagar la razón de un `AbortController` hasta `Response` y `ReadableStream`. Son cambios que hacen más explícitos los límites de transporte, cancelación y criptografía, pero no sustituyen una estrategia de claves, permisos y negociación compatible con los servidores.

La API de WebSocket recibe una bolsa de opciones que incluye `protocols` y `targetAddressSpace`, útil para describir conexiones hacia destinos locales bajo las reglas de acceso correspondientes. Asimismo, las nuevas operaciones de inserción y streaming de HTML se integran con opciones de Trusted Types y sanitización, una señal de que la plataforma intenta hacer compatibles rendimiento, manipulación incremental del DOM y control de scripts.

La lección para equipos frontend es tratar estas novedades como primitivas que requieren pruebas de capacidad, degradación y accesibilidad, no como sustitutos automáticos de la arquitectura existente. La beta ofrece una oportunidad para probarlas en navegadores controlados; antes de llevarlas a producción conviene verificar soporte entre motores, revisar el modelo de seguridad y comprobar el orden de foco con usuarios reales y tecnología asistiva.
