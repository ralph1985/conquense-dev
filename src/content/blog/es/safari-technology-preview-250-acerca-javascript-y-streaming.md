---
translationId: webkit-safari-technology-preview-250-resource-management
lang: es
slug: safari-technology-preview-250-acerca-javascript-y-streaming
title: "Safari Technology Preview 250 acerca JavaScript al ciclo de vida de recursos y al streaming"
description: "WebKit añade en Safari Technology Preview 250 Explicit Resource Management y las primeras capacidades de subida mediante ReadableStream en fetch()."
publishedAt: 2026-08-13
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 250"
sourceUrl: "https://webkit.org/blog/18191/release-notes-for-safari-technology-preview-250/"
author: "Jon Davis"
tags: ["JavaScript", "Web APIs", "WebKit", "TypeScript", "streaming"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

WebKit ha publicado Safari Technology Preview 250 con dos cambios especialmente interesantes para quienes escriben JavaScript de aplicación: soporte para Explicit Resource Management y una primera implementación de subidas mediante ReadableStream en fetch(). No es todavía una garantía de disponibilidad en el Safari estable, pero sí una señal útil para evaluar cómo evolucionan las capacidades del navegador y qué abstracciones pueden dejar de depender del código generado por herramientas.

La gestión explícita de recursos introduce `using` y `await using`, junto con `Symbol.dispose`, `DisposableStack` y `AsyncDisposableStack`. El objetivo es expresar en el propio lenguaje que un recurso debe cerrarse al abandonar un ámbito. Esto encaja con conexiones, archivos, locks, sesiones temporales o cualquier objeto cuya liberación no debería depender de que cada camino de salida invoque manualmente un método de limpieza. En código asíncrono, `await using` permite esperar la liberación de recursos que también tienen trabajo asíncrono pendiente.

La consecuencia arquitectónica no es simplemente una sintaxis más corta. Si un proyecto adopta este patrón, sus APIs internas pueden documentar con mayor precisión quién posee un recurso y cuánto dura esa propiedad. Eso puede reducir fugas y estados parciales, pero exige revisar la compatibilidad del navegador objetivo, el comportamiento de los transpilers y la interacción con librerías que ya utilizan funciones `close`, `dispose` o callbacks propios. TypeScript soporta la transformación de estas construcciones desde hace tiempo; que los motores las ejecuten de forma nativa puede simplificar progresivamente el coste de esa compatibilidad.

El segundo cambio afecta a `fetch()`: WebKit añade soporte inicial para un cuerpo de petición basado en `ReadableStream` y para la opción `duplex` de `Request`. La combinación permite producir y enviar datos por partes, en lugar de reunir todo el contenido en memoria antes de iniciar la transferencia. Puede ser útil para cargas grandes, generación progresiva o integraciones que ya trabajan con streams. Sin embargo, una implementación inicial en una versión de prueba no elimina las decisiones de producto: siguen importando la reanudación, los límites del servidor, la cancelación, los reintentos y la observabilidad.

La lectura práctica es prudente: probar estas capacidades en Safari Technology Preview, mantener una ruta alternativa y medir el soporte real antes de retirar un transpiler o una abstracción propia. Las notas también incluyen mejoras de Clipboard API, WebAssembly y Web Inspector, recordando que la evolución de la plataforma no ocurre solo en el lenguaje. El valor para un equipo no está en adoptar cada novedad inmediatamente, sino en identificar qué complejidad accidental puede desaparecer cuando la interoperabilidad sea suficiente.
