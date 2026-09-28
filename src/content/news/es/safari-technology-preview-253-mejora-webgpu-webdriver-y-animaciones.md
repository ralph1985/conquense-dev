---
translationId: safari-preview-253-webgpu-webdriver-20260923
lang: es
slug: safari-technology-preview-253-mejora-webgpu-webdriver-y-animaciones
title: "Safari Technology Preview 253 pule WebGPU, WebDriver y las animaciones de desplazamiento"
description: "La versión preliminar de WebKit reúne correcciones que afectan al rendimiento gráfico, la fiabilidad de las pruebas automatizadas, la accesibilidad y las nuevas APIs de animación."
publishedAt: 2026-09-23
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 253"
sourceUrl: "https://webkit.org/blog/18357/release-notes-for-safari-technology-preview-253/"
author: "Saron Yitbarek"
tags: ["web-platform", "webgpu", "webdriver", "accesibilidad", "rendimiento"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

WebKit ha publicado Safari Technology Preview 253, una versión de pruebas que incorpora cambios entre las revisiones 320113 y 321067 del proyecto. No es una versión estable de Safari ni una promesa de compatibilidad inmediata, pero sus notas ofrecen una señal útil para quienes desarrollan aplicaciones web complejas: el trabajo del navegador se está concentrando tanto en corregir detalles de plataforma como en hacer observables los fallos que afectan a usuarios y herramientas de prueba.

En accesibilidad, WebKit corrige un problema por el que VoiceOver podía anunciar repetidamente el mismo contenido de una región viva mientras esta recibía actualizaciones progresivas. También ajusta la lectura de valores `aria-keyshortcuts` que contenían `Meta` o `Alt`, para que utilicen la terminología de macOS. Son cambios pequeños en apariencia, pero recuerdan que una interfaz dinámica no se evalúa solo por su árbol DOM inicial. Las aplicaciones que transmiten estados, resultados o mensajes deben probar la secuencia temporal de esos cambios con tecnologías de asistencia reales.

El motor también avanza en las animaciones vinculadas al desplazamiento. Safari Technology Preview 253 permite que las líneas de tiempo de desplazamiento originadas en estilos se resuelvan mediante `timeline-scope` y corrige varios casos en los que `ViewTimeline` no se actualizaba al cambiar el desbordamiento desplazable. Para equipos que usan animaciones CSS como parte de la navegación, esto reduce comportamientos dependientes de la estructura exacta del DOM, aunque sigue siendo necesario comprobar la degradación en navegadores que no implementen el mismo nivel de la especificación.

La parte más práctica para ingeniería puede estar en WebDriver BiDi y WebGPU. WebKit corrige errores de mensajes en `script.call_function`, estados incorrectos de elementos obsoletos y cookies que parecían borrarse antes de completar la operación. Estas correcciones pueden eliminar falsos fallos en suites multiplataforma, especialmente cuando una prueba cambia de contexto o encadena acciones rápidamente. En WebGPU se corrigen, entre otros problemas, el rendimiento deficiente al subir un `canvas` como textura, pérdidas inesperadas del dispositivo, reconstrucciones innecesarias de bind groups y bloqueos durante la creación asíncrona de pipelines.

La recomendación no es activar todas estas capacidades en producción de inmediato. Es incorporar Safari Technology Preview a una matriz de pruebas y separar tres preguntas: si la API existe, si produce el resultado correcto y si mantiene un coste aceptable. Para WebGPU, además, conviene probar la recuperación tras `device lost`; para WebDriver, registrar el contexto y el estado de la página cuando falla una acción. Las notas de esta versión muestran que rendimiento, accesibilidad y automatización no son capas independientes: una plataforma web mantenible necesita que las tres evolucionen juntas.
