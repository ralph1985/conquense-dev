---
translationId: uber-dependency-failure-analysis-20260915
lang: es
slug: uber-analisis-automatico-dependencias-en-la-malla-de-servicios
title: "Uber automatiza el análisis de dependencias fallidas en su malla de servicios"
description: "Uber describe un sistema que combina contexto de peticiones, middleware y métricas para identificar qué dependencias provocan fallos en APIs críticas sin muestrear cada petición."
publishedAt: 2026-09-15
sourceName: "Uber Engineering"
sourceTitle: "Large-Scale Automated Dependency Analysis Across Uber's Service Mesh"
sourceUrl: "https://www.uber.com/us/en/blog/automated-dependency-analysis/"
author: "Deepanshu Mehndiratta, Alok Srivastava, Shivam Jindal y Ankit Srivastava"
tags: ["sistemas distribuidos", "observabilidad", "fiabilidad", "microservicios", "Go"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

En una arquitectura de microservicios, una petición que falla en la API visible para el usuario puede depender de una cadena larga de llamadas asíncronas. Saber qué servicio originó el problema y qué dependencias realmente pueden derribar al servicio principal es difícil incluso cuando existen trazas distribuidas. Uber ha explicado un sistema para catalogar esas relaciones automáticamente en su malla de servicios.

El problema inicial es estadístico. Las trazas contienen mucho contexto, pero procesar todas las peticiones resulta demasiado caro a gran escala. Con una tasa de muestreo del 0,01 %, una API con una disponibilidad del 99,9 % podría tardar horas en capturar un único fallo, y todavía más en reunir suficientes ejemplos para establecer una relación estable. Esperar a que aparezcan trazas representativas no ofrece la velocidad necesaria para sistemas que cambian continuamente.

La alternativa de Uber consiste en registrar métricas de cada fallo mediante el proxy local que ya intermedia las llamadas entre servicios. Para recuperar la granularidad perdida, el sistema añade middleware de entrada y salida en la capa YARPC. El middleware de entrada asigna un identificador a la petición y lo propaga mediante `context.Context`. Cuando la aplicación llama a un servicio descendiente, el middleware de salida utiliza ese identificador para asociar la llamada, el endpoint destino y su resultado con la petición original.

Los datos se acumulan temporalmente en un `RequestTracker`. Al completar la petición, el middleware emite una métrica que relaciona el endpoint de entrada con cada dependencia de salida y registra si fallaron ambos extremos. Esa información permite observar todos los fallos sin almacenar una traza completa de cada solicitud. El coste cambia de almacenar historias detalladas a diseñar una señal agregada suficientemente precisa para la decisión que se quiere tomar.

Uber clasifica cada dependencia como fail-close, fail-open o desconocida. Una dependencia fail-close es aquella cuyo fallo suele hacer fallar también al llamador; una fail-open puede fallar sin propagar el error. La clasificación usa la proporción de casos en los que fallan el descendiente y el llamador: valores iguales o superiores a 0,8 se consideran fail-close, mientras que valores iguales o inferiores a 0,2 se consideran fail-open. El intervalo intermedio evita presentar una causalidad incierta como un hecho.

El sistema también exige precisión en el contexto y en el orden de los middleware. Las reintentos se procesan después del middleware de análisis para no contar cada intento como una dependencia independiente. Esta decisión es pequeña, pero evita distorsionar la relación entre el fallo original y la respuesta observada.

La lección es aplicable fuera de Uber: la observabilidad útil no siempre requiere más trazas, sino mejores relaciones entre eventos. Un esquema de métricas con contexto, umbrales explícitos y categorías de incertidumbre puede localizar dependencias críticas y orientar inversiones de fiabilidad. Aun así, los umbrales son heurísticas: deben validarse frente a cambios de tráfico, despliegues y comportamientos de reintento. La automatización acelera la detección, pero no convierte una correlación mal modelada en causalidad.
