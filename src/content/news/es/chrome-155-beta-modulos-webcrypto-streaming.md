---
translationId: chrome-155-beta-web-platform-20260916
lang: es
slug: chrome-155-beta-modulos-webcrypto-streaming
title: "Chrome 155 Beta mejora la recuperación de módulos y amplía las herramientas de la plataforma web"
description: "La beta introduce reintentos para módulos fallidos, algoritmos criptográficos poscuánticos, inserción de HTML mediante streams y controles adicionales para ventanas y medios"
publishedAt: 2026-09-16
sourceName: "Chrome for Developers"
sourceTitle: "Chrome 155 beta"
sourceUrl: "https://developer.chrome.com/blog/chrome-155-beta"
author: "Rachel Andrew"
tags: ["chrome", "javascript", "browser-apis", "web-platform", "web-performance"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome 155 ha entrado en beta con un conjunto de cambios que resulta más interesante por sus implicaciones de arquitectura que por el volumen de novedades. La versión mejora la recuperación ante fallos de módulos JavaScript, amplía WebCrypto con algoritmos poscuánticos y añade primitivas para insertar HTML de forma más coherente y progresiva. Al tratarse de una beta, estas capacidades deben probarse antes de convertirlas en dependencias obligatorias de producción.

El cambio más directamente útil para aplicaciones distribuidas es la posibilidad de reintentar la carga de un módulo que falló. Hasta ahora, el navegador podía conservar el error y hacer que un segundo import() fallase inmediatamente, incluso si el problema original era una red inestable o una interrupción temporal del CDN. Chrome 155 permite volver a intentar la carga manualmente. Esto abre una estrategia más robusta para aplicaciones que cargan rutas o funcionalidades bajo demanda: registrar el fallo, aplicar una política de reintento limitada y ofrecer una recuperación visible al usuario. No sustituye a una buena distribución de assets ni a un control de versiones coherente, pero evita que un error transitorio se convierta en un estado irrecuperable dentro de la pestaña.

La beta también incorpora Import Text, una propuesta de TC39 que permite importar texto con una declaración de módulo y un atributo de tipo. El objetivo es tratar ciertos recursos textuales como datos del grafo de módulos, en vez de resolverlos mediante loaders específicos del bundler. Su valor dependerá de la interoperabilidad final y del soporte de las herramientas, pero apunta a una simplificación de pipelines que hoy necesitan transformaciones particulares para plantillas, consultas o pequeños recursos estáticos.

En seguridad, WebCrypto añade ML-KEM, ML-DSA, ChaCha20-Poly1305 y X-Wing. La presencia de algoritmos relacionados con criptografía poscuántica no significa que una aplicación deba cambiar automáticamente su protocolo ni que todos los navegadores los soporten. Sí permite experimentar con diseños híbridos y preparar bibliotecas que necesiten encapsulación de claves o firmas resistentes a futuros avances criptanalíticos. Cualquier adopción debe esperar a especificaciones, compatibilidad y revisión de expertos; criptografía nueva no es un lugar apropiado para improvisar.

Chrome 155 continúa además la línea de APIs para actualizaciones parciales y streaming de HTML. Los métodos posicionales y los nuevos streams permiten construir inserciones dinámicas con una semántica más uniforme, mientras que las opciones relacionadas con Trusted Types y sanitización ayudan a separar el rendimiento del riesgo de inyectar marcado no confiable. La versión añade controles para pausar audio en iframes ocultos, mejoras de WebTransport para cabeceras y funciones de gestión de ventanas como maximizar, minimizar o impedir el redimensionado.

La lección práctica es de compatibilidad progresiva. Las aplicaciones deberían detectar capacidades, mantener rutas alternativas y probar módulos fallidos, streaming, WebCrypto y políticas de permisos en navegadores reales. La beta es un laboratorio útil para anticipar cambios, no una invitación a retirar todavía los mecanismos existentes.
