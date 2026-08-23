---
translationId: meta-ranking-secuencias-2026
lang: es
slug: la-arquitectura-de-dos-etapas-para-escalar-modelos-de-recomendacion
title: "La arquitectura de dos etapas para escalar modelos de recomendación"
description: "Meta presenta una arquitectura que separa el modelado pesado de usuarios del ranking en línea para aumentar la capacidad de sus sistemas publicitarios sin disparar el coste de serv"
publishedAt: 2026-08-05
sourceName: "Engineering at Meta"
sourceTitle: "From User Sequences to Scaling Laws: A Multi-Stage Architecture for Meta’s Ads Ranking"
sourceUrl: "https://engineering.fb.com/2026/08/05/ml-applications/from-user-sequences-to-scaling-laws-a-multi-stage-architecture-for-metas-ads-ranking/"
author: "Steven De Gryze, Parshva Doshi, Sean O’Byrne, Arnold Overwijk, Dinesh Ramasamy y Lee Xiong"
tags: ["arquitectura", "machine learning", "sistemas distribuidos", "recomendación"]
readingTime: 3
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Los sistemas de recomendación tienen que resolver una tensión conocida: necesitan modelos cada vez más expresivos para capturar el contexto de los usuarios, pero deben responder con latencias y costes compatibles con miles de millones de interacciones. En una publicación de Engineering at Meta, un equipo de la compañía describe una arquitectura de varias etapas para su plataforma de ranking publicitario.

La idea principal es separar dos trabajos que suelen competir por los mismos recursos. Un modelo de usuario puede procesar secuencias largas de acciones y aprender representaciones detalladas de intereses y preferencias. El ranking en línea, en cambio, debe evaluar candidatos rápidamente durante cada solicitud. Meta sitúa el modelado más pesado en una fase offline y reserva para producción modelos online más ligeros que utilizan esas representaciones.

Esta separación cambia la forma de escalar el sistema. Aumentar la profundidad o la longitud de las secuencias en el modelo offline no obliga necesariamente a incrementar en la misma proporción el coste de cada decisión online. La arquitectura permite experimentar con mayor complejidad donde el tiempo de cálculo es más flexible y mantener límites previsibles en el servicio que está sujeto a una latencia estricta.

El artículo también describe el uso de tokenización densa y atención orientada al objetivo para aprender interacciones entre características directamente a partir de los datos. La relevancia técnica está en reducir la dependencia de combinaciones dispersas diseñadas manualmente. En problemas de recomendación, muchas señales útiles aparecen en el orden y el momento de las acciones, no solo en atributos estáticos. Un modelo que conserva esa estructura temporal puede representar mejor cambios de intención o preferencias recientes.

La arquitectura no elimina los compromisos. Las representaciones offline pueden quedar desactualizadas y exigir una política de refresco adecuada. Además, separar entrenamiento y serving introduce contratos entre etapas: ambos lados deben acordar esquemas, versiones, disponibilidad y comportamiento cuando faltan señales. La mejora de calidad debe medirse junto con memoria, ancho de banda, latencia, coste de actualización y estabilidad ante cambios en el tráfico.

Para equipos que construyen buscadores, feeds o sistemas de personalización, la lección es generalizable. No siempre es necesario elegir entre un modelo potente y un servicio rápido. Una división explícita entre comprensión profunda y decisión de baja latencia puede abrir una tercera opción, siempre que exista una interfaz estable entre ambas fases y observabilidad suficiente para detectar degradaciones.

El trabajo de Meta es relevante porque trata el escalado como una propiedad de la arquitectura completa, no solo como una cuestión de añadir parámetros. En sistemas de ML de producción, el rendimiento final depende tanto de dónde se calcula una señal como de la calidad del modelo que la genera.

Transparencia: este texto ha sido generado por IA y revisado antes de su publicación.
