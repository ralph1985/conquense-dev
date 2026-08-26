---
translationId: firefox-154-web-platform-2026-08-18
lang: es
slug: firefox-154-css-javascript-webdriver
title: "Firefox 154 suma herramientas para CSS, JavaScript y automatización web"
description: "La versión incorpora funciones CSS de relación entre hermanos, nuevos ayudantes de iteradores y mejoras en WebDriver BiDi."
publishedAt: 2026-08-18
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 154 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/154"
author: "MDN contributors"
tags: ["web", "css", "javascript", "testing"]
readingTime: 3
aiDisclosure: "Texto generado con IA y revisado antes de su publicación."
---

Firefox 154, publicado el 18 de agosto, reúne cambios pequeños pero útiles para el trabajo diario de frontend y de automatización. Las notas de MDN destacan novedades en CSS, JavaScript, WebRTC y WebDriver BiDi. No es una entrega que obligue a reescribir una aplicación, pero sí amplía opciones que pueden simplificar componentes, pruebas y diagnóstico.

En CSS aparecen `sibling-count()` y `sibling-index()`. Estas funciones permiten conocer el número de hermanos de un elemento y su posición dentro de ese conjunto. Son especialmente interesantes para estilos que dependen de la estructura real de una lista o una cuadrícula, porque reducen la necesidad de añadir clases de posición desde JavaScript o desde el servidor. Como cualquier función CSS reciente, su adopción debe depender de la compatibilidad que necesite el proyecto: las reglas esenciales han de conservar un comportamiento aceptable en navegadores que todavía no la implementen.

También se incorporan `text-box-edge`, `text-box-trim` y el atajo `text-box`. Su propósito es controlar el espacio vertical que rodea al texto dentro de su caja. El problema es reconocible en interfaces con varias fuentes, botones compactos o bloques de texto que deben alinearse visualmente: la caja de línea incluye métricas tipográficas que no siempre coinciden con la forma visible de los glifos. Estas propiedades dan una herramienta declarativa para ajustar ese espacio, aunque conviene probarlas con tipografías reales, contenidos localizados y tamaños de accesibilidad antes de convertirlas en un requisito de diseño.

En JavaScript llegan varios métodos para iteradores. `includes()` y `join()` trasladan operaciones familiares de los arrays a datos consumidos de forma iterativa. `chunks()` agrupa valores consecutivos y `windows()` entrega ventanas deslizantes. Esto puede hacer más expresivo el procesamiento de secuencias cuando no interesa materializar toda la colección de entrada. Aun así, no convierte los iteradores en una solución automática de rendimiento: hay que comprobar cuántos datos se producen, cuándo se consumen y si una etapa posterior termina creando arrays grandes.

La versión añade además capacidades relevantes para automatización. WebDriver BiDi incorpora identificadores de descarga en eventos de inicio y fin, datos de contexto de usuario en varias órdenes y eventos, y comandos para comenzar y detener una grabación de una ventana de navegación. Para equipos de calidad, estas mejoras pueden facilitar la correlación de eventos y el aislamiento de pruebas que usan perfiles o contenedores distintos. Las notas también registran una corrección en la resolución prematura de algunas navegaciones de subframes.

La lectura práctica es moderada: revisar estas funciones al actualizar la matriz de navegadores y utilizarlas donde reduzcan código auxiliar o hagan las pruebas más observables. La compatibilidad y las pruebas en navegadores objetivo siguen siendo la condición para llevarlas a producción.
