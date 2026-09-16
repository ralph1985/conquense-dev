---
translationId: retrieve-for-train-search-20260915
lang: es
slug: retrieve-for-train-acelera-la-busqueda-con-ia
title: "Retrieve-for-Train traslada el razonamiento de la búsqueda al entrenamiento"
description: "Google Research presenta un sistema que compila durante el entrenamiento los objetivos de diversidad y cobertura para reducir la latencia de la expansión de consultas con IA."
publishedAt: 2026-09-15
sourceName: "Google Research"
sourceTitle: "Bypassing inference bottlenecks: Accelerating complex AI search with Retrieve-for-Train"
sourceUrl: "https://research.google/blog/bypassing-inference-bottlenecks-accelerating-complex-ai-search-with-retrieve-for-train/"
author: "Pengcheng Jiang y Judith Yue Li"
tags: ["inteligencia artificial", "búsqueda", "recuperación de información", "rendimiento"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los sistemas de búsqueda asistidos por inteligencia artificial tienen un problema que no se resuelve simplemente con un modelo de lenguaje más grande: construir un conjunto de resultados que sea relevante, diverso y coherente puede exigir mucho razonamiento durante la consulta. Google Research presenta Retrieve-for-Train, una arquitectura que intenta trasladar ese coste desde el momento en que el usuario espera una respuesta hasta una fase de entrenamiento offline.

El caso de uso es la expansión de consultas. Ante una petición amplia, como buscar equipamiento para acampada, el sistema debe proponer subconsultas que cubran necesidades complementarias sin devolver diez variantes casi idénticas del mismo producto. Un modelo de lenguaje general puede generar esas consultas de forma autoregresiva, pero cada token adicional aumenta la latencia y no garantiza que el conjunto final tenga buena cobertura.

Retrieve-for-Train divide el proceso en tres fases. Primero, un modelo de lenguaje se entrena mediante aprendizaje por refuerzo para generar expansiones evaluadas como conjunto, no solo como elementos aislados. La recompensa combina tres objetivos: que las consultas correspondan con elementos recuperables de la base de datos, que sean suficientemente diversas y que sigan alineadas con la intención original. Después, ese modelo produce pares de entrenamiento de forma offline. Finalmente, un modelo de difusión compacto aprende a convertir la representación de una consulta en un conjunto completo de representaciones objetivo en un único paso no autoregresivo.

El detalle importante está en la función de recompensa. La relevancia individual no mide bien propiedades como la complementariedad o la diversidad. Además, optimizar un único objetivo puede producir atajos: una consulta puede acercarse matemáticamente a la base de datos sin ser útil, o varias consultas pueden colapsar en paráfrasis repetidas. Google Research describe la diversidad geométrica como un contrapeso que dificulta ese comportamiento oportunista.

En sus experimentos, el retriever de difusión tenía 53,9 millones de parámetros y se evaluó en recuperación abierta y recuperación composicional, con datos de moda y listas musicales. Según el equipo, ofreció una aceleración de entre 12 y 20 veces frente a enfoques autoregresivos. En lotes de contexto grandes, la latencia de estos últimos podía acercarse a 50 segundos, mientras que el modelo destilado se mantenía entre menos de un segundo y unos pocos segundos.

La lección para los equipos de producto no es que la difusión sustituya automáticamente a los modelos de lenguaje en búsqueda. Es más concreta: cuando el objetivo real afecta al conjunto completo de resultados, conviene expresarlo como una métrica de conjunto y decidir qué parte del razonamiento debe ocurrir antes de la petición. También será necesario validar el comportamiento con datos propios, porque los experimentos descritos usan dominios y representaciones específicas. La arquitectura ofrece una vía para reducir coste y latencia, pero la calidad final seguirá dependiendo de los objetivos, los datos y las comprobaciones que se mantengan en producción.
