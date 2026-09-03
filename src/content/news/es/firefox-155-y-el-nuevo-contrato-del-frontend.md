---
translationId: tech-2026-09-firefox-155
lang: es
slug: firefox-155-y-el-nuevo-contrato-del-frontend
title: "Firefox 155 amplía el contrato del frontend moderno"
description: "La nueva versión estable de Firefox incorpora avances en CSS, módulos JavaScript, WebTransport y herramientas que afectan directamente a la arquitectura web."
publishedAt: 2026-09-01
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 155 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155"
author: "MDN contributors"
tags: ["javascript", "frontend", "css", "web-apis", "performance"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Firefox 155, publicado el 1 de septiembre, reúne varias mejoras pequeñas que juntas apuntan a una web menos dependiente de JavaScript incidental. No es una versión que obligue a reescribir aplicaciones, pero sí ofrece nuevas piezas para simplificar estilos, coordinar tareas asíncronas y construir transportes interactivos con más control.

La novedad de CSS con más impacto arquitectónico es la ampliación de `attr()`. La función deja de estar limitada a `content` y puede utilizarse en cualquier propiedad, con tipos como longitudes, unidades de tiempo, valores alternativos y consultas de estilo de contenedor. Un componente puede recibir parte de su configuración visual mediante atributos HTML sin que un script tenga que leerlos y convertirlos en estilos inline. Esto reduce sincronización entre estado del DOM y estado de la aplicación, aunque sigue siendo necesario comprobar la compatibilidad del navegador antes de eliminar un fallback.

Firefox también incorpora `Promise.allKeyed()` y `Promise.allSettledKeyed()`, definidos en una propuesta de TC39. La diferencia frente a las variantes tradicionales es que reciben un objeto y devuelven otro objeto con las mismas claves. En código que carga datos independientes, esto evita recordar qué posición corresponde a cada resultado y hace que las refactorizaciones sean menos frágiles. Sigue siendo una propuesta del lenguaje, por lo que una biblioteca compartida debería ofrecer una estrategia de compatibilidad si necesita ejecutarse en navegadores anteriores.

Otro cambio menos visible resuelve un problema operativo: los módulos JavaScript, JSON, CSS y texto que fallan por red o por MIME incorrecto ya no quedan cacheados permanentemente como fallidos. Una importación dinámica puede recuperarse después de que el servidor vuelva a funcionar. Esto no sustituye a los reintentos, los límites de tiempo ni la observabilidad, pero evita que un error transitorio bloquee el módulo durante toda la vida del documento.

En la capa de red, la negociación de versiones de QUIC permite a HTTP/3 negociar QUIC v2 en los sistemas compatibles. Firefox 155 también añade grupos de envío en WebTransport, con los que una aplicación puede agrupar streams que comparten ancho de banda y establecer prioridades. Es relevante para experiencias con datos en tiempo real, donde telemetría, controles y contenido principal compiten por la misma conexión.

La lección práctica es tratar estas funciones como mejoras progresivas, no como requisitos globales. Conviene probarlas detrás de detección de capacidades, mantener rutas alternativas y medir su efecto con usuarios reales. El valor de la versión no está solo en las APIs nuevas: también está en acercar el comportamiento del navegador a modelos de componentes más declarativos, fallos de red recuperables y transporte priorizado.
