---
translationId: supabase-tls-cbc-deprecation-20261012
lang: es
slug: supabase-retira-cifrados-cbc-tls-20261012
title: "Supabase retirará cuatro cifrados CBC de TLS 1.2 en sus APIs HTTP"
description: "La retirada afectará a clientes antiguos que se conecten a las APIs HTTP de Supabase y obliga a revisar sistemas operativos, runtimes y librerías TLS antes de noviembre."
publishedAt: 2026-10-12
sourceName: "Supabase"
sourceTitle: "An outdated subset of TLS 1.2 ciphers will be disabled on project HTTP APIs"
sourceUrl: "https://supabase.com/changelog/cbc-tls-ciphers-deprecated"
author: "Supabase"
tags: ["security", "tls", "apis", "backend", "maintainability"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Supabase ha anunciado una retirada de cuatro suites de cifrado basadas en CBC para TLS 1.2 en las APIs HTTP de sus proyectos. El cambio comenzará el 10 de noviembre de 2026 como fecha más temprana y constituye una modificación de compatibilidad, aunque la propia plataforma estima que afectará a una fracción mínima del tráfico. La noticia es útil porque muestra dónde suelen aparecer las dependencias de seguridad que no son visibles en el código de una aplicación.

Las suites retiradas son variantes de ECDHE con AES-CBC y SHA-256 o SHA-384, tanto para certificados ECDSA como RSA. Supabase seguirá aceptando TLS 1.3 y mantendrá varias suites modernas de TLS 1.2 basadas en AES-GCM o ChaCha20-Poly1305. La motivación es reducir configuraciones antiguas con debilidades conocidas y evitar que los escáneres de seguridad sigan encontrando cifrados obsoletos en los puntos de entrada públicos.

El alcance incluye Auth, Data API, Storage, Realtime y Edge Functions cuando se accede a través de las APIs HTTP del proyecto, tanto en los dominios de Supabase como en dominios personalizados. No afecta a las conexiones directas a Postgres, al pooler ni a la Management API. Las instalaciones self-hosted tampoco están incluidas en esta retirada concreta. Esta separación importa: una organización no puede asumir que todas sus conexiones a un mismo proveedor tienen la misma negociación TLS ni la misma fecha de cambio.

Supabase indica que menos del 0,0001 por ciento de las conexiones observadas durante los 30 días anteriores negociaron esos cifrados. En la práctica, los clientes modernos deberían continuar funcionando sin cambios. El riesgo se concentra en dispositivos integrados, sistemas operativos antiguos o librerías TLS que no soportan TLS 1.3 y solo ofrecen las suites CBC que desaparecerán. En una aplicación web convencional, el navegador y el sistema operativo suelen ocultar esta negociación; en integraciones móviles antiguas, agentes de infraestructura y dispositivos industriales puede ser más difícil detectarla.

La migración recomendada no consiste en forzar una suite concreta desde la aplicación. El primer paso es inventariar clientes que se conectan por HTTPS, incluyendo procesos fuera del servidor principal. Después hay que actualizar el sistema operativo, el runtime o la librería TLS para soportar TLS 1.3 o alguna de las suites TLS 1.2 conservadas. Si no es posible actualizar un cliente heredado, Supabase propone usar un proxy controlado que termine la conexión antigua y establezca otra moderna hacia la plataforma, aunque esa arquitectura añade una pieza que debe protegerse y monitorizarse.

La lección de mantenimiento es sencilla: los tests de aplicación no cubren necesariamente la compatibilidad del handshake. Antes de la fecha de retirada conviene probar clientes representativos, revisar versiones de OpenSSL, Java, .NET o librerías móviles y observar errores de conexión, no solo respuestas HTTP. Un cambio de cifrados puede fallar antes de que exista una petición en los logs de la API. Por eso la inventariación de clientes y la renovación de dependencias deben formar parte de la planificación normal, incluso cuando el proveedor espera un impacto estadísticamente pequeño.
