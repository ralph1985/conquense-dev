---
translationId: browser-connection-allowlists-chrome-20260923
lang: es
slug: chrome-connection-allowlists-red-network-para-aplicaciones-web
title: "Chrome introduce listas de conexiones para limitar la red de las aplicaciones web"
description: "Chrome 152 incorpora un encabezado que permite aplicar una política de red de denegación por defecto a documentos y workers, especialmente útil para código de terceros o generado."
publishedAt: 2026-09-23
sourceName: "Chrome for Developers"
sourceTitle: "Connection allowlists: Secure your web application's network access"
sourceUrl: "https://developer.chrome.com/blog/connection-allowlist-announcement"
author: "Sebastian Benz y José Luis Zapata"
tags: ["seguridad web", "javascript", "browser APIs", "Chrome", "IA aplicada"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Las aplicaciones web modernas ya no ejecutan únicamente código escrito por el equipo que las mantiene. Incorporan scripts de terceros, widgets, contenido embebido y, cada vez más, interfaces o fragmentos de código generados con IA. Esa composición acelera el desarrollo, pero también amplía los lugares desde los que una aplicación puede intentar enviar datos. Chrome ha presentado las connection allowlists, una política orientada a controlar ese tráfico desde el propio navegador.

La propuesta se configura mediante el encabezado HTTP `Connection-Allowlist`. El servidor especifica patrones de URL permitidos utilizando la sintaxis estandarizada de `URLPattern`, y el navegador bloquea las conexiones que no coincidan antes de establecerlas. La política se aplica por separado a cada ventana o worker, lo que permite crear límites distintos para diferentes partes de una aplicación.

La diferencia técnica con Content Security Policy es importante. CSP controla qué recursos pueden cargarse o ejecutarse, pero no está diseñada como una lista general de destinos de red. Además, no cubre exhaustivamente mecanismos como la precarga DNS, ciertas navegaciones o WebRTC. La nueva política funciona como una frontera de red complementaria: CSP decide qué puede entrar o ejecutarse, mientras que la lista decide a qué destinos puede comunicarse el código.

El diseño incluye varias salvaguardas operativas. Las redirecciones y las conexiones WebRTC quedan bloqueadas por defecto y deben habilitarse explícitamente si son necesarias. También existe un modo de solo informe, con `Connection-Allowlist-Report-Only`, que permite observar infracciones mediante Reporting API antes de activar el bloqueo. Para una migración prudente, este modo ofrece una forma de descubrir dependencias ocultas sin convertir el primer despliegue en una avería cuidadosamente automatizada.

Chrome recomienda aislar el código no confiable en un iframe dedicado, preferiblemente de origen cruzado o con sandbox, y aplicar allí la política. No basta con añadir el encabezado a un documento que comparte el mismo origen con código confiable: ese código podría conservar capacidad para sortear el aislamiento mediante scripting compartido. El perímetro de red debe acompañarse de un perímetro de ejecución bien definido.

La lección arquitectónica es que la seguridad de las aplicaciones web puede expresarse con límites declarativos más cercanos al navegador. Equipos que ejecuten contenido generado, integren proveedores externos o construyan sandboxes pueden empezar en modo de informe, revisar las conexiones observadas y pasar después a una lista mínima de destinos. El soporte está disponible en Chrome 152; mientras la capacidad se extiende a otros entornos, conviene conservar una estrategia progresiva y una alternativa funcional. La herramienta no sustituye CSP, el aislamiento de procesos ni la revisión del código, pero reduce una clase concreta de exfiltración: la comunicación hacia destinos no autorizados.
