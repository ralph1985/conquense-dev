---
translationId: sentry-soft-navigation-web-vitals-20261029
lang: es
slug: sentry-web-vitals-navegaciones-internas
title: "Medir las rutas internas de una SPA exige revisar también los paneles"
description: "Sentry incorpora Web Vitals por navegación interna y plantea una precaución esencial: un cambio de población puede parecer una mejora de rendimiento."
publishedAt: 2026-10-29
sourceName: "Sentry Blog"
sourceTitle: "Measuring soft navigation web vitals"
sourceUrl: "https://blog.sentry.io/measuring-soft-navigation-web-vitals/"
author: "Redacción Conquense Dev"
tags: ["frontend", "javascript", "web-performance", "observability"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Sentry explicó el 29 de octubre cómo su SDK JavaScript v11 registra LCP, CLS e INP para navegaciones internas. La función requiere la integración de trazas del navegador y, por ahora, depende de Chromium 151 o posterior. El artículo advierte que mezclar estas observaciones con cargas de documento puede mejorar las cifras agregadas sin que la aplicación haya acelerado. [Fuente: Sentry](https://blog.sentry.io/measuring-soft-navigation-web-vitals/).

La relevancia para la arquitectura frontend está en la unidad de observación. Una aplicación puede recibir al usuario mediante una página renderizada en servidor y resolver después sus desplazamientos con JavaScript. Desde el punto de vista del usuario, cada pantalla tiene una espera propia. Sin embargo, las operaciones técnicas que la producen pueden repartirse entre solicitudes de datos, descarga de módulos, ejecución y actualización del DOM.

Como análisis general, medir la duración de una petición no permite concluir cuándo una pantalla resulta útil. Una respuesta puede llegar pronto y requerir todavía procesamiento considerable. También puede ocurrir lo contrario: el contenido principal aparece mientras continúan tareas secundarias. Por eso conviene definir qué pregunta responde cada señal antes de convertirla en un objetivo de rendimiento o en una alerta.

El problema estadístico merece la misma atención que la instrumentación. Imaginemos dos grupos hipotéticos: visitas con arranque completo y transiciones con recursos ya disponibles. Si aumenta la proporción del segundo grupo, un percentil global puede bajar aunque ninguno mejore individualmente. Un panel útil debería permitir separar poblaciones y mantener esa separación al comparar versiones. La fecha de actualización del SDK también debería quedar anotada para interpretar discontinuidades.

La atribución por ruta puede orientar investigaciones más concretas. Ante una pantalla lenta, el equipo puede comprobar si la espera precede a la solicitud de datos, ocurre durante ella o aparece después de recibir la respuesta. Son hipótesis distintas: una cascada de solicitudes requiere una intervención diferente a una tarea larga de JavaScript. El objetivo inicial debería ser localizar el tramo dominante, evitando introducir precarga o caché antes de conocerlo.

También conviene comprobar la representatividad. Una medición disponible en determinados navegadores describe esa población; no demuestra la experiencia de quienes usan otros motores. Dispositivo, conexión y forma de entrada pueden alterar la composición de la muestra. Los informes deberían mostrar cobertura y volumen junto a los valores de rendimiento, especialmente en rutas con poco tráfico.

La acción práctica es revisar una ruta interna importante y contrastar su comportamiento con una carga directa de esa misma pantalla. Después, comprobar que paneles y alertas distinguen ambas experiencias. Incorporar una métrica nueva aporta valor cuando ayuda a explicar la espera del usuario y conserva comparaciones interpretables entre despliegues.
