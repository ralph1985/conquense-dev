---
translationId: chrome-devtools-soft-navigation-agents-20260922
lang: es
slug: chrome-devtools-mide-spas-y-agentes-con-mas-control
title: "Chrome DevTools hace más reproducibles las pruebas de SPA y los agentes de código"
description: "La actualización de septiembre reúne controles de seguridad para agentes, medición completa de soft navigations y nuevas herramientas para memoria y rendimiento."
publishedAt: 2026-09-22
sourceName: "Chrome for Developers"
sourceTitle: "New in DevTools - October 2026"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-october-2026/"
author: "Matthias Rohmer"
tags: ["frontend", "javascript", "devtools", "web-performance", "testing"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome for Developers ha resumido las novedades incorporadas a DevTools durante el último mes, y el interés de la actualización está menos en una función aislada que en la conexión entre diagnóstico, automatización y reproducibilidad. Para equipos que mantienen aplicaciones de una sola página, la medición de navegación y la automatización asistida por agentes dejan de ser problemas completamente separados.

La mejora más relevante para el rendimiento es la compatibilidad completa con el análisis de soft navigations en el panel Performance. Las aplicaciones SPA pueden cambiar de vista sin una navegación tradicional, por lo que las métricas convencionales de carga de página no siempre describen la experiencia real. DevTools lleva ahora ese análisis desde las vistas de trazas y Live Metrics hasta Insights. En la práctica, esto permite investigar con más continuidad cuándo una transición interna produce trabajo excesivo, retrasos de interacción o una actualización visual costosa.

La actualización también añade una sobreescritura calibrada del nivel de CPU mediante Chrome DevTools Protocol, con `Emulation.setCPUPerformanceOverride`. Es una pieza pequeña, pero técnicamente importante: las comparaciones de rendimiento dejan de depender tanto del ordenador concreto del desarrollador. Un equipo puede probar una misma interacción bajo distintos perfiles de CPU y documentar resultados más comparables en CI o durante una revisión de regresiones.

El panel Application incorpora métricas experimentales para atribuir a la publicidad densidad de anuncios, cantidad de anuncios, uso total de CPU y tráfico de red. No sustituyen a la observabilidad de campo, pero ofrecen una forma más directa de localizar costes que antes quedaban mezclados con el resto de la página. Para productos con muchos scripts de terceros, esta atribución puede convertir una discusión abstracta sobre rendimiento en una lista de responsables y acciones.

El otro eje es la preparación de DevTools para agentes. El servidor MCP permite desactivar la evaluación de JavaScript, limitar raíces del sistema de archivos y cargar mapas de fuente bajo demanda. También añade consultas más precisas sobre heap snapshots, incluida la búsqueda por tamaño retenido, propiedad o contexto de ejecución de V8. Son controles útiles porque un agente que inspecciona una página no debería tener automáticamente permiso para ejecutar cualquier script o explorar cualquier ruta local.

Hay mejoras igualmente prácticas para el trabajo diario: estilos inactivos visibles, adornos del árbol DOM accesibles por teclado, trazas de hilos que solo contienen perfiles de CPU y protección contra traversal en los overrides locales. El conjunto apunta a una idea concreta: medir mejor exige controlar el entorno, el alcance y la evidencia. Conviene probar estas capacidades con la versión real de Chrome y del servidor MCP utilizada por cada equipo, pero la dirección es clara: el navegador empieza a ofrecer una base más rigurosa para depurar SPAs, investigar memoria y supervisar agentes de desarrollo.
