---
translationId: retrieve-for-train-set-retrieval-20260915
lang: es
slug: retrieve-for-train-entrena-la-busqueda-de-conjuntos-sin-pagar-el-coste-en-cada-consulta
title: "Retrieve-for-Train traslada el razonamiento de la búsqueda desde la consulta al entrenamiento"
description: "Google Research propone entrenar fuera de línea un modelo de difusión para generar conjuntos de resultados diversos y coherentes con mucha menos latencia en producción."
publishedAt: 2026-09-15
sourceName: "Google Research"
sourceTitle: "Bypassing inference bottlenecks: Accelerating complex AI search with Retrieve-for-Train"
sourceUrl: "https://www.research.google/blog/bypassing-inference-bottlenecks-accelerating-complex-ai-search-with-retrieve-for-train/"
author: "Pengcheng Jiang y Judith Yue Li"
tags: ["applied-ai", "information-retrieval", "machine-learning", "search", "performance"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los sistemas de búsqueda y recomendación no siempre deben devolver el resultado individual más relevante. En muchas consultas necesitan construir un conjunto coherente: ante “equipamiento para acampada”, por ejemplo, una buena respuesta combina tienda, saco de dormir, hornillo y linterna en lugar de repetir cuatro variantes de la misma tienda. Google Research propone Retrieve-for-Train para resolver ese problema trasladando gran parte del razonamiento costoso desde el momento de la consulta al entrenamiento fuera de línea.

La dificultad está en que las propiedades importantes pertenecen al conjunto completo. La diversidad, la cobertura y la complementariedad no pueden medirse adecuadamente observando un elemento aislado. Los modelos de lenguaje generalistas suelen ampliar una consulta con paráfrasis cercanas, lo que produce resultados redundantes. Además, generar muchas subconsultas de forma autorregresiva obliga al sistema a producir tokens secuencialmente, una penalización difícil de compatibilizar con una caja de búsqueda que debe responder en fracciones de segundo.

Retrieve-for-Train separa el proceso en tres etapas. Primero, un modelo de lenguaje aprende mediante aprendizaje por refuerzo a producir expansiones evaluadas por una recompensa que considera el conjunto. Después, ese modelo genera fuera de línea pares de consulta y conjunto objetivo que sirven como supervisión sintética, sin depender de etiquetas humanas para cada ejemplo. Por último, un modelo de difusión compacto, con 53,9 millones de parámetros, aprende a transformar directamente la representación vectorial de una consulta en un conjunto de representaciones objetivo en una sola pasada no autorregresiva.

La función de recompensa es la pieza crítica. El sistema combina anclaje, diversidad y alineación. El anclaje penaliza resultados que se alejan de los elementos realmente recuperables en la base de datos. La diversidad utiliza Vendi Score para evitar que todas las subconsultas ocupen la misma región semántica. La alineación mantiene la relación con la intención original. Google explica que estas señales actúan como contrapesos: optimizar solo el anclaje puede producir cadenas sin sentido que explotan la geometría del índice, mientras que añadir solo alineación puede hacer que el modelo repita la consulta original.

En las evaluaciones descritas, el método superó la búsqueda de consulta única, la expansión sin entrenamiento específico y un baseline Best-of-N en tareas de recuperación de conjuntos. El modelo de difusión fue entre 12 y 20 veces más rápido que los enfoques autorregresivos. En lotes de contexto grandes, la latencia autorregresiva se acercaba a 50 segundos, mientras que Retrieve-for-Train-Diffusion se mantenía entre menos de un segundo y unos pocos segundos, según el escenario.

La lección de arquitectura es más amplia que el modelo concreto. Cuando una propiedad de calidad es cara de calcular pero estable durante el uso, puede ser rentable compilarla durante el entrenamiento y desplegar después un componente pequeño y especializado. También recuerda que optimizar IA exige diseñar recompensas contra el atajo que el modelo intentará explotar. La latencia no se arregla únicamente con más hardware: a veces hay que cambiar qué trabajo se hace en línea y cuál se prepara antes.
