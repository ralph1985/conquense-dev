---
translationId: firefox-158-security-advisory-20261013
lang: es
slug: firefox-158-corrige-vulnerabilidades-de-alto-impacto-en-el-motor-web
title: "Firefox 158 corrige vulnerabilidades de alto impacto en el motor web"
description: "Mozilla publica un aviso de seguridad con fallos de sandbox, memoria, IndexedDB, Canvas2D, WebAssembly y el motor JavaScript corregidos en Firefox 158."
publishedAt: 2026-10-13
sourceName: "Mozilla Security"
sourceTitle: "Security Vulnerabilities fixed in Firefox 158"
sourceUrl: "https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/"
author: "Mozilla Foundation"
tags: ["seguridad", "firefox", "javascript", "navegadores", "webassembly"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Mozilla ha publicado el aviso de seguridad de Firefox 158 con un conjunto amplio de vulnerabilidades clasificadas como de impacto alto. El anuncio afecta a componentes que forman la base de la navegación moderna: aislamiento de sitios, red, almacenamiento, gráficos, DOM, WebIDL, Canvas, WebGL, WebAssembly y el motor JavaScript.

Entre los fallos aparecen escaladas de privilegios en el componente de actualización, escapes del sandbox y problemas de aislamiento de sitios relacionados con condiciones de carrera o límites incorrectos. También se corrigen varios casos de use-after-free en IndexedDB, texto, Canvas2D, XML, SVG, audio y vídeo, Streams y animaciones. El aviso incluye además errores de límites en el motor JavaScript, fallos de compilación JIT y un problema de compilación JIT en WebAssembly. No son errores de una única API de aplicación: afectan a las capas que convierten contenido web potencialmente hostil en código ejecutable dentro del navegador.

Mozilla ha cambiado también su forma de publicar estos avisos. En lugar de agrupar todas las vulnerabilidades internas de seguridad de memoria en un único CVE, ahora emite un identificador separado para cada defecto. Ese cambio mejora la trazabilidad. Permite relacionar cada problema con su componente, su informe de Bugzilla y su corrección, y evita que un único registro oculte la variedad real de fallos que debe revisar un equipo de seguridad.

Para los desarrolladores web, la noticia no implica necesariamente modificar una aplicación concreta. Su importancia está en recordar que el navegador forma parte de la superficie de ejecución del producto. Una aplicación que utiliza IndexedDB, Canvas, WebAssembly, APIs gráficas o código JavaScript optimizado depende de una cadena de componentes nativos, compiladores y límites de aislamiento que el equipo de frontend no controla directamente.

La respuesta práctica es mantener los navegadores de desarrollo, pruebas y producción dentro de las versiones soportadas, e incluir en la matriz de compatibilidad los escenarios que ejercen esas rutas: almacenamiento persistente, gráficos 2D y 3D, módulos WebAssembly, workers y contenido procedente de terceros. Las pruebas de aplicación no sustituyen a los parches del navegador, pero una matriz explícita ayuda a detectar si una actualización altera un flujo sensible.

El aviso también ilustra una propiedad incómoda de la seguridad del navegador: la defensa depende de varias capas simultáneas. La memoria segura no elimina todos los problemas de lógica; el sandbox reduce el impacto, pero no vuelve irrelevante un escape; y el motor JIT necesita validaciones propias porque transforma código dinámico en instrucciones nativas. Por eso conviene leer los avisos por componente y no solo por número de versión. Firefox 158 es la corrección disponible, pero la lección duradera es operativa: la actualización del runtime debe tratarse como parte del mantenimiento de cualquier sistema web.
