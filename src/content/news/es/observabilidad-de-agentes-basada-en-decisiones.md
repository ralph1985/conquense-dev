---
translationId: agent-observability-decisions-2026-08-25
lang: es
slug: observabilidad-de-agentes-basada-en-decisiones
title: "La observabilidad de agentes debe seguir decisiones, no solo peticiones"
description: "MongoDB propone instrumentar el recorrido de decisiones de un agente para detectar bucles, contexto irrelevante y costes que el APM tradicional no muestra."
publishedAt: 2026-08-25
sourceName: "MongoDB Developer Blog"
sourceTitle: "Agent Observability: Monitoring Decisions, Not Requests"
sourceUrl: "https://www.mongodb.com/company/blog/technical/agent-observability-monitoring-decisions-not-requests"
author: "Mikiko Bazeley, Ashish Kumar, Massimiliano Marcon, Charlie Xu, Ahmed Sulaiman y Nandini Kapa"
tags: ["observabilidad", "agentes", "opentelemetry", "sistemas-distribuidos", "aiops"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

## Cuando una petición correcta produce un resultado incorrecto

En un servicio web convencional, una petición, su latencia y su código de respuesta ofrecen una unidad razonable de observación. En un agente de IA, cada paso puede completarse correctamente y, aun así, la tarea completa puede fallar. El agente puede recuperar un contexto irrelevante, elegir una herramienta con parámetros inventados, perder información durante una delegación o entrar en un bucle de replanificación.

Un artículo técnico de MongoDB sostiene que ese comportamiento exige observar decisiones, no únicamente peticiones. La diferencia es práctica: el sistema debe mostrar qué contexto leyó el agente, qué acción eligió, qué herramienta invocó, qué resultado obtuvo y por qué continuó con el siguiente paso. Un registro de una llamada de modelo puede confirmar que la llamada terminó; no explica por qué el proceso nunca convergió.

## Tres trabajos distintos

El texto separa monitorización, observabilidad y evaluación. La monitorización responde si el sistema está sano: disponibilidad, errores, latencia y consumo. La observabilidad permite reconstruir qué sucedió y localizar el componente responsable. La evaluación decide si la conducta fue buena según un criterio definido. Mezclar las tres funciones suele producir paneles llenos de señales, pero sin una explicación útil de los fallos.

La pieza central propuesta es una traza jerárquica. La invocación principal del agente actúa como span padre, con spans hijos para llamadas al modelo, ejecución de herramientas y lecturas o escrituras de memoria. Esa estructura conecta los pasos y permite distinguir un fallo del modelo de otro causado por el orquestador, el estado persistente, la recuperación de contexto o una herramienta externa.

El artículo señala que las convenciones semánticas de GenAI para OpenTelemetry están convergiendo, aunque todavía se encuentran en desarrollo y han cambiado durante 2026. Adoptar un formato común puede reducir el coste de integrar frameworks y plataformas, pero no elimina la necesidad de decidir qué datos conservar, quién puede leerlos y durante cuánto tiempo. Las trazas pueden contener información sensible, instrucciones internas o datos recuperados de usuarios.

## Métricas que describen el trabajo real

Para producción, MongoDB destaca tres señales: calidad de la decisión, relevancia del contexto recuperado y coste total por tarea. El último concepto incluye infraestructura, tokens y supervisión humana, porque una acción autónoma no tiene un coste fijo comparable al de una petición HTTP. Entre las alertas útiles aparecen el fracaso de finalización, la caída de relevancia y la regresión del coste por tarea.

Estas métricas no sustituyen a las trazas. Una traza puede registrar perfectamente una secuencia y no saber si la decisión era correcta. Hace falta una evaluación independiente con ejemplos, resultados esperados o revisión humana. Del mismo modo, observar una lectura de memoria no significa convertirla automáticamente en memoria persistente.

La recomendación es separar el estado de ejecución de la memoria duradera. El primero describe una tarea concreta; la segunda contiene conocimiento reutilizable entre sesiones y necesita políticas propias de retención, acceso y borrado. Para equipos que están pasando de prototipos a producción, esta separación evita que el sistema de diagnóstico se convierta accidentalmente en otro almacén de datos sensibles.

La consecuencia arquitectónica es clara: operar agentes requiere telemetría a nivel de decisión, no solo APM a nivel de petición. Esa telemetría hace visibles los bucles y las desviaciones antes de que aparezcan como simples quejas de latencia o respuestas erróneas.
