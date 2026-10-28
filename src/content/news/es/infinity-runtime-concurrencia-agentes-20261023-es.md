---
translationId: infinity-runtime-agent-concurrency-20261023
lang: es
slug: infinity-runtime-concurrencia-agentes-20261023-es
title: "Infinity propone tratar a los agentes de IA como tareas suspendibles, no como procesos siempre activos"
description: "AWS y UC Berkeley han publicado Infinity, un runtime experimental que guarda el estado conversacional durante las esperas y reanuda los agentes cuando llegan eventos o resultados."
publishedAt: 2026-10-23
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing Infinity: a runtime for extreme agent concurrency"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-infinity-a-runtime-for-extreme-agent-concurrency/"
author: "Shadaj Laddad"
tags: ["artificial-intelligence", "agent-runtime", "rust", "serverless", "concurrency"]
readingTime: 6
aiDisclosure: "Contenido generado automáticamente con IA."
---

AWS y UC Berkeley han publicado Infinity como un proyecto experimental de código abierto bajo licencia Apache 2.0. Su idea central es sencilla: un agente que espera el resultado de una herramienta no debería mantener ocupado un proceso, una función serverless o una gran cantidad de memoria. En lugar de bloquear el bucle de ejecución, Infinity guarda el historial de conversación y termina el tramo activo. Cuando llega el resultado, un mensaje o un temporizador, el runtime carga el estado y continúa desde el punto adecuado.

El diseño se inspira en las coroutines y en el modelo async/await. Cada ejecución se divide en slices acotados. Un slice carga el historial, realiza una llamada al modelo, persiste la salida y puede despachar como máximo una herramienta. Nunca espera una operación externa de duración indefinida. Así, una compilación que tarda veinte minutos o una aprobación que llega tres días después no obliga a mantener viva una función durante todo ese tiempo.

El runtime organiza los agentes como hilos lógicos con colas de entrada. Los mensajes de un mismo hilo se procesan en orden para evitar que dos ejecuciones sobrescriban el mismo historial, mientras que hilos diferentes pueden ejecutarse en paralelo. El modo serverless de referencia usa una cola FIFO de SQS, Lambda para ejecutar cada paso, Aurora DSQL para las conversaciones y DynamoDB para el estado de deduplicación. Este diseño obliga a asumir entregas al menos una vez, identificadores estables e idempotencia.

AWS afirma que un benchmark sintético alcanzó unos 100 KB de memoria por agente inactivo y que esa cifra permitiría extrapolar alrededor de 75.000 agentes en 8 GB. Es importante leer bien el resultado: la prueba se ejecutó en un hilo de un AMD EPYC con un modelo simulado; no fue una demostración ejecutada en una Raspberry Pi ni una medición con tráfico de producción. El número sirve para ilustrar el coste del estado en reposo, no para dimensionar automáticamente un sistema real.

Otro problema interesante aparece cuando las herramientas producen eventos sucesivos. Las APIs de modelos suelen esperar una respuesta por llamada de herramienta, por lo que Infinity introduce llamadas de herramienta sintéticas para representar eventos posteriores sin atribuirlos falsamente al usuario. También puede procesar cada evento en un hilo hijo, evitando que una suscripción con cientos de eventos infle el contexto del agente principal.

El valor del proyecto está en separar espera, estado y cómputo. Esa separación puede reducir costes en agentes que pasan gran parte de su vida esperando builds, revisiones o aprobaciones. Pero Infinity sigue siendo una primera versión de investigación. Quedan por validar la autenticidad de los eventos, la planificación con prioridades, la compactación de historiales ramificados y la forma en que los modelos razonan sobre eventos intercalados. Es una arquitectura prometedora para estudiar, no una garantía de producción.
