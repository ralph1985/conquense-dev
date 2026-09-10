---
translationId: vitest-5-trace-view-2026-09-03
lang: es
slug: vitest-5-depuracion-rendimiento-pruebas
title: "Vitest 5 convierte la depuración y el rendimiento en parte del diseño de las pruebas"
description: "Vitest 5 acelera suites complejas, añade Trace View para Browser Mode y endurece varias comprobaciones que antes podían ocultar errores."
publishedAt: 2026-09-03
sourceName: "Vitest"
sourceTitle: "Vitest 5.0 is out!"
sourceUrl: "https://vitest.dev/blog/vitest-5"
author: "Equipo de Vitest"
tags: ["vitest", "testing", "javascript", "typescript", "developer-tools"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Vitest 5 llega con una idea más interesante que la de una simple actualización de velocidad: el rendimiento, la observabilidad y la corrección de las pruebas deben formar parte de la arquitectura del propio sistema de testing. El equipo ha publicado una batería de aplicaciones de referencia que combina proyectos pequeños, monolitos con más de mil módulos, suites con `jsdom`, Browser Mode, distintos pools de trabajadores y diferentes niveles de aislamiento. El objetivo es medir configuraciones realistas y no depender únicamente de microbenchmarks.

Los resultados publicados muestran mejoras especialmente visibles en proyectos grandes o dependientes de máquinas virtuales. En uno de los escenarios con muchas dependencias, Vitest 5 reduce el tiempo de ejecución un 53 %. En un monolito de 1.280 módulos, la mejora anunciada es del 19 %, mientras que Browser Mode también se beneficia de la preparación anticipada del navegador, el runtime preempaquetado y un número adaptativo de sesiones. Son cifras del benchmark del proyecto, no una garantía universal: cada suite seguirá dependiendo de su entorno, sus transformaciones y sus fixtures.

La nueva ordenación del trabajo también tiene consecuencias prácticas. Los proyectos inline pueden compartir el servidor de Vite cuando no cambian la configuración, y la caché de módulos transformados puede persistir entre procesos. `vitest doctor` ejecuta la suite con configuraciones alternativas y recomienda pools, entornos o límites de trabajadores cuando la medición demuestra una ventaja. Esto convierte una optimización que antes exigía intuición en una decisión que puede verificarse con datos.

La novedad más útil para los equipos frontend es Trace View para Browser Mode. Vitest registra interacciones, aserciones y marcas de página como instantáneas del DOM que después pueden reproducirse paso a paso en la interfaz web, el informe HTML o Vitest UI. La herramienta no sustituye a todas las trazas de Playwright, pero reduce la distancia entre un fallo de CI y la evidencia necesaria para entenderlo.

Vitest 5 también endurece el contrato de las pruebas. Las aserciones asíncronas no esperadas pasan a fallar, los localizadores son estrictos por defecto y los errores pueden mostrar el árbol ARIA, más cercano a lo que realmente consulta una prueba accesible. `clearMocks` se activa por defecto para reducir contaminación entre casos. El resultado es una actualización que afecta a la velocidad, pero también a la mantenibilidad: medir la suite, hacer visibles sus fallos y evitar falsos positivos son responsabilidades inseparables cuando el frontend crece.
