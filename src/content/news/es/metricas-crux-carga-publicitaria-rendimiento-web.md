---
translationId: crux-ad-metrics-advertising-performance-20260915
lang: es
slug: metricas-crux-carga-publicitaria-rendimiento-web
title: "Chrome convierte la carga publicitaria en una métrica de experiencia real"
description: "Chrome incorpora cuatro métricas experimentales a CrUX para observar cómo afectan los anuncios a la experiencia de usuarios reales: cantidad, densidad, peso de red y consumo de CPU"
publishedAt: 2026-09-15
sourceName: "Chrome for Developers"
sourceTitle: "New ad metrics in Chrome User Experience Report"
sourceUrl: "https://developer.chrome.com/blog/crux-ad-metrics?authuser=1"
author: "Alex Cone"
tags: ["web-performance", "frontend", "CrUX", "advertising"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome ha añadido cuatro métricas experimentales al Chrome User Experience Report (CrUX) para describir la carga publicitaria de una página a partir de experiencias reales. La novedad importa porque convierte un aspecto habitualmente discutido de forma subjetiva —si una página tiene demasiados anuncios o si estos la hacen pesada— en señales observables a escala de origen.

Las métricas cubren cuatro dimensiones. Ad Count calcula la media de anuncios visibles en la ventana gráfica. Ad Density estima qué fracción de esa ventana ocupan. Ad Weight, en su dimensión de red, mide los bytes consumidos por los recursos publicitarios; en su dimensión de CPU, contabiliza los milisegundos de procesamiento asociados. Juntas ofrecen una imagen más amplia que el simple número de anuncios: dos páginas pueden mostrar la misma cantidad y producir costes muy distintos para la conexión o el dispositivo.

Para los equipos frontend, la consecuencia práctica es que el rendimiento deja de depender únicamente del código propio. Un sistema de anuncios puede alterar el peso transferido, ocupar espacio, competir por el procesador y contribuir a una experiencia visual más inestable. Las nuevas señales permiten estudiar esa parte del sistema junto con las métricas habituales de velocidad, capacidad de respuesta y estabilidad visual.

Chrome aclara, sin embargo, que estas métricas no forman parte de Core Web Vitals. Comparten dimensiones de disponibilidad y criterios de elegibilidad con los datos existentes de CrUX, pero todavía no tienen umbrales recomendados. Cada señal aparece marcada como experimental y Google espera que su disponibilidad aumente durante el mes siguiente a la publicación. Es una distinción importante: los datos pueden ayudar a investigar y comparar, pero no constituyen todavía un contrato de calidad equivalente al de LCP, INP o CLS.

La lectura correcta tampoco consiste en perseguir un número aislado. Un equipo puede cruzar la carga publicitaria con el rendimiento de dispositivos modestos, observar diferencias entre plantillas y detectar cuándo una integración publicitaria degrada una ruta crítica. Después debe validar las causas en sus propios controles de laboratorio y en la implementación concreta, porque CrUX ofrece datos agregados de usuarios y no explica por sí solo qué script, subasta o recurso provocó el coste.

El paso técnico más relevante es la ampliación del modelo de observabilidad. La calidad percibida de una web depende del conjunto de recursos que llegan al navegador, incluidos los que gestiona un tercero. Medirlos por separado puede ayudar a que las decisiones de monetización se comparen con efectos verificables sobre red, CPU y espacio disponible. Por ahora, conviene tratar las señales como material de diagnóstico y seguir la documentación de Chrome para recuperar e interpretar los datos.
