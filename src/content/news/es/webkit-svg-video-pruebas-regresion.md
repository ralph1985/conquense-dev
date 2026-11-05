---
translationId: webkit-svg-video-regression-testing-20261102
lang: es
slug: webkit-svg-video-pruebas-regresion
title: "WebKit corrige SVG y métricas de vídeo: qué conviene probar en el frontend"
description: "Las últimas correcciones documentadas por Igalia muestran cómo el zoom, los recortes y el ciclo de reproducción pueden romper interfaces y mediciones."
publishedAt: 2026-11-02
sourceName: "Igalia"
sourceTitle: "WebKit Igalia Periodical #84"
sourceUrl: "https://blogs.igalia.com/webkit/blog/2026/wip-84/"
author: "Redacción Conquense Dev"
tags: ["frontend", "webkit", "svg", "testing", "web-performance"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

El resumen de desarrollo de WebKit que Igalia publicó el 2 de noviembre reúne correcciones con consecuencias prácticas para interfaces gráficas y reproductores. Su interés está en los casos límite: transformaciones, coordenadas y transiciones de estado. Son cambios documentados en el desarrollo del motor; el artículo no establece una versión estable de Safari que los distribuya todos. [Fuente: Igalia](https://blogs.igalia.com/webkit/blog/2026/wip-84/).

Una corrección afecta a `getScreenCTM()`, utilizada para obtener la matriz de transformación de un elemento SVG. El motor SVG basado en capas eliminaba tanto la contribución del zoom de página como la del `zoom` de CSS, cuando debía conservar esta última. El parche también ajusta una prueba para aceptar pequeñas diferencias de precisión numérica. Para un editor de diagramas, la implicación es concreta: conviene verificar que la geometría calculada siga correspondiéndose con la representación visual al cambiar la escala. [Parche de coordenadas](https://github.com/WebKit/WebKit/commit/2e63b3fa9f3981a0e683c6261d546a2af17f19bc).

Otro cambio elimina un recorte adicional aplicado al SVG exterior. Ese recorte podía truncar sombras, contornos y contenido rotado, aunque ya existía un mecanismo de overflow que contemplaba las transformaciones. El parche incorpora pruebas visuales de Web Platform Tests y señala que el desplazamiento del contorno necesitaba una corrección posterior. La enseñanza para las pruebas de componentes es distinguir entre el área del contenido y los efectos que se pintan fuera de su caja. [Parche de recorte](https://github.com/WebKit/WebKit/commit/9c83d3a8dc0f1f151cb95577a4a1d96642003bb5).

En vídeo, el cambio para plataformas que utilizan GStreamer corrige dos aspectos de las estadísticas: el total debe incluir fotogramas mostrados y descartados, y los contadores deben conservar continuidad durante operaciones que reinician estadísticas internas. La implementación acumula diferencias, detecta reinicios y protege datos compartidos entre hilos. Esto importa al interpretar telemetría: una pausa o una búsqueda temporal no debería confundirse con una mejora repentina de la reproducción. [Parche de métricas](https://github.com/WebKit/WebKit/commit/a5b3fb0e511a11a0810e9e0f45834e7416e33435).

Como propuesta de validación, estos casos sugieren construir pruebas alrededor de transiciones. Un gráfico puede comprobarse antes y después de aplicar escala, rotación y sombras; un reproductor, antes y después de pausar, buscar y reanudar. Una captura aislada del estado inicial deja fuera esas relaciones. También conviene separar las aserciones geométricas de las visuales: ambas responden preguntas distintas y pueden localizar mejor una regresión.

La conclusión técnica es acotada: estos parches ofrecen ejemplos útiles para ampliar una matriz de pruebas. No demuestran que una aplicación concreta esté afectada ni justifican retirar soluciones de compatibilidad sin comprobar las versiones que utilizan sus usuarios. El paso práctico es reproducir primero el caso mínimo y verificar después el comportamiento en los navegadores objetivo.
