---
translationId: devtools-152-medicion-spa-y-memoria
lang: es
slug: devtools-152-medicion-spa-y-memoria
title: "DevTools 152 acerca las métricas de SPA y la depuración de memoria a los agentes"
description: "Chrome DevTools añade métricas de Core Web Vitals para navegaciones suaves y nuevas capacidades de inspección de heap para su servidor MCP."
publishedAt: 2026-08-25
sourceName: "Chrome for Developers"
sourceTitle: "What's new in DevTools (Chrome 152)"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-152"
author: "Matthias Rohmer"
tags: ["web performance", "debugging", "ai tooling"]
readingTime: 3
aiDisclosure: "Texto generado con IA y revisado antes de su publicación."
---

La edición 152 de Chrome DevTools reúne mejoras que afectan a dos problemas muy habituales: entender el rendimiento de una aplicación de página única y localizar retenciones de memoria sin recorrer manualmente cada estructura del runtime. La actualización incorpora métricas de Core Web Vitals para soft navigations en Performance Live Metrics y amplía el servidor MCP de DevTools con consultas sobre snapshots de heap.

En una SPA, cambiar de vista no equivale necesariamente a cargar un documento nuevo. Un router puede modificar la URL, desmontar componentes, solicitar datos y pintar una pantalla distinta sin que exista una navegación tradicional. Si la observabilidad solo mira la carga inicial, puede declarar sana una aplicación cuyo primer acceso es rápido pero cuyas transiciones posteriores bloquean la entrada o repintan demasiado. Ver métricas de Core Web Vitals asociadas a esas navegaciones suaves ayuda a comprobar la experiencia donde realmente se concentra parte del uso.

La consecuencia práctica no es perseguir una cifra aislada. Conviene escoger flujos representativos —búsqueda, filtros, detalle y regreso a resultados— y registrar qué interacción inicia cada transición. Después se puede relacionar una degradación con trabajo de JavaScript, solicitudes, cambios de layout o imágenes. Esa secuencia permite priorizar: eliminar renderizados innecesarios, dividir una tarea larga, precargar datos con criterio o aplazar recursos que no intervienen en la vista. La métrica se vuelve útil cuando está ligada a un escenario reproducible y a una hipótesis de mejora.

La misma versión mejora el trabajo con memoria para agentes que utilizan el servidor MCP de Chrome DevTools. Entre las nuevas operaciones están la consulta de propiedades detalladas de objetos en un heap snapshot y de las rutas de retención desde raíces de GC. También se puede filtrar por contexto nativo de V8 e inspeccionar dichos contextos en los resúmenes. Esto reduce pasos de navegación por una captura grande y aporta información para formular una explicación sobre por qué un objeto sigue vivo.

Aun así, automatizar la inspección no convierte una captura en diagnóstico definitivo. Una ruta retenedora puede ser legítima: cachés, estado de una sesión o estructuras globales pueden mantener referencias por diseño. El proceso útil compara capturas bajo condiciones controladas, reproduce una acción repetidamente, fuerza el punto de observación adecuado y verifica si el número de objetos o el tamaño retenido crece sin volver a estabilizarse.

DevTools 152 también mejora el reenvío de solicitudes y la inspección de payloads binarios en la red. Junto a las métricas de navegación suave y al análisis de heap, la dirección es clara: hacer más observable una aplicación moderna sin obligar a convertir cada investigación en una sesión manual interminable. El criterio sigue siendo el mismo: usar estas ayudas para generar evidencia, validar la causa en el código y comprobar después que la corrección no desplaza el problema a otra parte.
