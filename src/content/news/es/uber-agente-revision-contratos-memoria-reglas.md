---
translationId: uber-redlining-agent-feedback-rules-20261008
lang: es
slug: uber-agente-revision-contratos-memoria-reglas
title: "Uber convierte la revisión contractual en un laboratorio de agentes con memoria y reglas"
description: "El Legal Redlining Agent de Uber muestra cómo combinar reglas deterministas, recuperación semántica y supervisión experta para automatizar trabajo sensible sin eliminar el juicio专业"
publishedAt: 2026-10-08
sourceName: "Uber Engineering"
sourceTitle: "Scaling AI in Legal: Building Uber's Redlining Agent"
sourceUrl: "https://www.uber.com/au/en/blog/building-ubers-redlining-agent/"
author: "Austin Greco, Meghana Somasundara, Frank Tenente, Sean Po y Rush Tehrani"
tags: ["inteligencia artificial aplicada", "agentes", "arquitectura", "TypeScript", "React"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Uber ha explicado cómo construyó su Legal Redlining Agent, un complemento de Microsoft Word que ayuda a los equipos jurídicos a revisar cambios propuestos en contratos. El interés técnico del caso no está en presentar un modelo como sustituto del abogado, sino en mostrar una arquitectura que limita el alcance de la automatización, conserva la revisión humana y aprende de decisiones reales.

El sistema identifica modificaciones, intenta inferir la intención de la otra parte, consulta políticas internas y propone aceptar, rechazar o modificar una cláusula. También genera comentarios y marca el nivel de riesgo. Uber afirma que, tras su puesta en marcha, el tiempo medio de revisión se redujo más de un 20 % y que las decisiones generadas por IA alcanzaron una precisión del 91 %. Son métricas internas, pero sirven para entender que la calidad se mide sobre tareas concretas y no sobre una impresión general del modelo.

La primera versión utilizaba RAG con manuales y ejemplos de negociaciones. El equipo encontró tres problemas habituales: la similitud semántica no siempre recuperaba el precedente adecuado, el tono podía resultar impropio y los casos no cubiertos por los manuales producían respuestas poco fiables. La respuesta fue guardar más información de la intervención humana: la decisión tomada, el texto original, el cambio propuesto, los comentarios y la redacción final que el abogado aceptaba.

Ese almacén de feedback se consulta con filtros de metadatos y una segunda capa de evaluación basada en modelos. Un algoritmo de decaimiento temporal da más peso a decisiones recientes, para reducir el riesgo de aplicar políticas antiguas. La elección es importante: el sistema no necesita ajustar continuamente los pesos del modelo para reflejar cambios de criterio; puede modificar el contexto que recibe en cada ejecución y conservar trazabilidad sobre los ejemplos utilizados.

La arquitectura separa además lo que debe ser rígido de lo que admite interpretación. Las políticas no negociables pasan por un motor de reglas determinista. El tono, la estrategia y otros matices se apoyan en el bucle probabilístico de feedback. Para las modificaciones complejas, un flujo agentivo utiliza reglas y precedentes antes de redactar una contrapropuesta, reduciendo el riesgo de inventar términos o desviarse de las definiciones del contrato.

El complemento está construido con React y TypeScript y se ejecuta como panel lateral de Word. La API de Office obliga a usar caché, minimizar viajes de ida y vuelta y mantener estado propio porque tiene limitaciones y casos problemáticos con los cambios controlados. El backend, escrito en Python, coordina un grafo de tareas que ejecuta en paralelo la detección de intención, el riesgo y la consulta de políticas.

La lección aplicable a otros productos es sobria: un agente útil nace de un flujo de trabajo bien delimitado, datos de feedback suficientemente ricos, reglas explícitas y una interfaz integrada en la herramienta existente. La sofisticación del modelo llega después; sin esos controles, solo acelera la producción de respuestas difíciles de auditar.
