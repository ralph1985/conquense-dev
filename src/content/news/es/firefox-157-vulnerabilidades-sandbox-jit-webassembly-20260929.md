---
translationId: firefox-157-security-advisory-sandbox-jit-20260929
lang: es
slug: firefox-157-vulnerabilidades-sandbox-jit-webassembly-20260929
title: "Firefox 157 expone la amplitud de la superficie de ataque del navegador moderno"
description: "El aviso de Mozilla reúne vulnerabilidades de alto impacto en aislamiento de procesos, DOM, WebGPU, WebAssembly, JIT, almacenamiento y extensiones."
publishedAt: 2026-09-29
sourceName: "Mozilla Foundation"
sourceTitle: "Security Vulnerabilities fixed in Firefox 157"
sourceUrl: "https://www.mozilla.org/en-US/security/advisories/mfsa2026-97/"
author: "Mozilla"
tags: ["security", "web-browsers", "webgpu", "webassembly", "javascript"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Mozilla ha publicado el aviso de seguridad asociado a Firefox 157, con vulnerabilidades que afectan a varias capas del navegador: el DOM, la navegación, el aislamiento de procesos, WebGPU, WebAssembly, el motor JavaScript, IndexedDB, caché, extensiones y DevTools. El documento clasifica numerosos problemas como de impacto alto, aunque no afirma que todos sean explotables en las mismas condiciones ni que exista explotación activa de cada fallo.

Entre los ejemplos aparecen escapes del sandbox en navegación, procesos de contenido y componentes gráficos; errores de uso después de liberar memoria en widgets, WebGPU, WebAssembly y el DOM; y condiciones de límites incorrectas en audio, vídeo y gráficos. También se documentan problemas de memoria no inicializada, divulgación de información, escalada de privilegios y fallos de compilación JIT en WebAssembly y en el motor JavaScript. En un navegador multiproceso, estas categorías importan porque una vulnerabilidad que empieza en el contenido de una página puede intentar cruzar las barreras que separan ese contenido de componentes con más privilegios.

El aviso incluye además fallos que afectan a controles de seguridad del modelo web. Entre ellos figura un posible bypass de la política de mismo origen en WebExtensions, así como problemas relacionados con aislamiento de sitios, Service Workers y DevTools. No todos tienen la misma ruta de ataque: algunos requieren cargar contenido especialmente manipulado, otros dependen de una extensión o de una configuración concreta, y otros pueden producir denegación de servicio. La lista recuerda que la seguridad del navegador no se reduce a bloquear scripts maliciosos; también depende de la integridad de parsers, motores JIT, almacenamiento, gráficos y herramientas de desarrollo.

Para equipos web, la consecuencia inmediata es operativa. Actualizar Firefox reduce la exposición de quienes desarrollan, prueban o administran aplicaciones, especialmente cuando utilizan WebAssembly, WebGPU, extensiones o herramientas de depuración avanzadas. En entornos gestionados, el aviso también puede alimentar inventarios de versiones, políticas de actualización y criterios para priorizar pruebas de regresión. Los equipos que distribuyen aplicaciones de escritorio basadas en tecnologías web deberían revisar por separado el ciclo de actualización del runtime que incorporan, porque instalar Firefox en los puestos no corrige automáticamente un motor embebido antiguo.

Hay una segunda lectura útil para la ingeniería. La variedad de fallos muestra por qué la seguridad del navegador requiere defensa en profundidad: aislamiento de procesos, comprobaciones de límites, gestión de memoria, políticas de origen y reducción de privilegios trabajan como capas complementarias. Un bug de uso después de liberar memoria puede convertirse en una escalada o en un escape solo si consigue atravesar otras mitigaciones. Por eso las correcciones de seguridad no deben tratarse como simples cambios de versión sin contexto.

Mozilla también señala que ha cambiado la forma de publicar sus avisos y que ahora emite avisos individuales para vulnerabilidades de seguridad de memoria identificadas internamente. Para los mantenedores, esa mayor granularidad facilita relacionar cada corrección con un componente, una prueba y una decisión de actualización. La práctica prudente es actualizar, revisar el alcance real de las tecnologías usadas y conservar evidencia de la versión corregida, sin extrapolar más allá de lo que el aviso confirma.
