---
translationId: chrome-devtools-source-map-scopes-debugging-20261113
lang: es
slug: chrome-devtools-scopes-depuracion-javascript
title: "DevTools acerca la depuración del JavaScript optimizado al código original"
description: "El soporte de ámbitos originales en los source maps permite revisar cómo conserva el pipeline de compilación la información necesaria para depurar."
publishedAt: 2026-11-13
sourceName: "Chrome for Developers"
sourceTitle: "New in DevTools - December 2026"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-december-2026"
author: "Redacción IA"
tags: ["javascript", "frontend", "debugging", "source-maps", "maintainability"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome ha anunciado soporte en DevTools para la propuesta de ámbitos de los source maps de ECMA-426. La actualización permite recuperar nombres originales al inspeccionar variables, consultar pilas y evaluar expresiones. La noticia figura en el resumen publicado el 13 de noviembre, aunque su título corresponde a diciembre. Para quienes mantienen aplicaciones JavaScript compiladas, el interés está en comprobar cuánto contexto del programa sobrevive hasta el depurador. [Fuente: Chrome for Developers](https://developer.chrome.com/blog/new-in-devtools-december-2026).

La propuesta distingue entre los ámbitos del código original y los rangos del código generado. Esa separación permite describir dónde terminan representadas las estructuras originales después de una transformación. También contempla información para recuperar valores de variables y representar funciones que el compilador ha integrado dentro de otras. Se trata de una propuesta técnica; conviene evitar interpretarla como garantía de compatibilidad universal entre herramientas. [Fuente: propuesta de ámbitos de ECMA-426](https://tc39.es/ecma426/branch/proposal-scopes/).

La consecuencia práctica es que la capacidad de diagnóstico merece evaluarse junto al tamaño del bundle y al tiempo de compilación. Como criterio de ingeniería, un equipo puede preguntarse si alguien ajeno al último cambio lograría investigar un fallo con los artefactos que realmente distribuye. Esa pregunta resulta especialmente útil cuando desarrollo y producción utilizan configuraciones distintas: una sesión cómoda sobre código sin optimizar no demuestra que el artefacto publicado sea igualmente investigable.

Una comprobación razonable sería preparar una función pequeña con variables locales, un ámbito anidado y una llamada que pueda transformarse durante la compilación. Después, generar una versión optimizada y detener su ejecución en un punto conocido. El objetivo del ejercicio sería contrastar los valores observados con los esperados y comprobar qué nombres permiten formular expresiones útiles. Es una propuesta de validación, no una prueba realizada para este artículo ni una afirmación sobre un bundler concreto.

También interesa conservar la correspondencia entre cada versión del programa y sus mapas. Ante un diagnóstico confuso, la primera investigación debería incluir la identidad de los artefactos: qué código se ejecuta, qué mapa se está utilizando y a qué revisión pertenecen ambos. Como recomendación operativa, registrar esa relación facilita distinguir un problema de la aplicación de un problema en la información que usa el depurador.

La adopción debe partir de una comprobación del pipeline propio. El anuncio acredita una capacidad del consumidor, DevTools; por sí solo no demuestra que todos los compiladores y minificadores produzcan los datos necesarios. Para un equipo frontend, el siguiente paso útil consiste en construir un caso reproducible con su configuración real y documentar los límites observados. Así, una novedad del navegador se convierte en una mejora verificable del mantenimiento, sin atribuirle resultados que todavía no se han medido.
