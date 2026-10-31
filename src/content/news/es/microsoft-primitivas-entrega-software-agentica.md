---
translationId: microsoft-agentic-delivery-primitives-20261027
lang: es
slug: microsoft-primitivas-entrega-software-agentica
title: "Microsoft propone diseñar la entrega de software agéntica alrededor de artefactos y evidencias"
description: "Microsoft plantea que los agentes no eliminan el ciclo de vida del software: desplazan la atención humana hacia los objetivos, la validación, la operación y la interpretación de la"
publishedAt: 2026-10-27
sourceName: "Command Line, Microsoft"
sourceTitle: "The new primitives of agentic software delivery"
sourceUrl: "https://commandline.microsoft.com/new-agentic-software-delivery-primitives/"
author: "Tim Bozarth"
tags: ["applied-ai", "software-engineering", "maintainability", "developer-tools"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Microsoft ha publicado una propuesta para estructurar la entrega de software con agentes de IA a partir de piezas observables del ciclo de vida, no solo de herramientas que generan código. La tesis es sencilla: aunque un agente pueda ejecutar más pasos de forma autónoma, un sistema fiable sigue necesitando objetivos, implementación, validación, despliegue y observación.

La publicación resume el ciclo en cuatro etapas: Plan, Build, Verify y Observe. Cada una conserva una responsabilidad humana y produce un artefacto que permite continuar el trabajo. Plan debe dejar objetivos y criterios de aceptación. Build produce una implementación candidata, normalmente una pull request, junto con el contexto de las decisiones. Verify genera evidencias auditables sobre corrección, rendimiento y seguridad. Observe devuelve señales de producción que alimentan la siguiente ronda de planificación.

Este enfoque importa porque evita tratar la autonomía como una caja negra. Si un agente crea un cambio, el equipo necesita saber qué intentaba conseguir, qué restricciones tenía, qué pruebas ejecutó, bajo qué condiciones se publicó y qué ocurrió después. Sin esos enlaces, la velocidad de generación puede aumentar mientras disminuye la capacidad de revisar, depurar y mantener el sistema.

Microsoft sitúa una capa de conocimiento en el centro del flujo. Esa capa conecta objetivos, decisiones de diseño, contexto de implementación, evidencias de validación, historial de lanzamientos, señales operativas y registros del comportamiento de los agentes. La propuesta también distingue entre observaciones e interpretaciones y conserva el origen y la versión de cada elemento. En términos prácticos, no basta con guardar conversaciones o grandes volúmenes de trazas: el conocimiento debe responder preguntas concretas y tener un uso verificable.

La empresa compara esa memoria útil con un índice de base de datos o una vista materializada. Una organización debería poder comprobar si el agente trabaja mejor, más rápido o con menos errores cuando recibe el conocimiento sintetizado. Esa comparación convierte la memoria de una metáfora en una hipótesis evaluable. También ayuda a evitar un problema habitual: acumular documentación sin mejorar ninguna decisión posterior.

Microsoft menciona varias implementaciones relacionadas con sus productos. Copilot puede tomar una incidencia, crear un entorno seguro en GitHub Actions, analizar el repositorio, modificar código, ejecutar validaciones y producir una pull request para revisión humana. Code Review admite skills de agentes y MCP para incorporar normas del repositorio o contexto de sistemas externos. Además, las instrucciones, scripts y recursos pueden empaquetarse como skills reutilizables, de modo que un procedimiento eficaz no quede atrapado en una única sesión.

La propuesta no constituye una medición independiente de productividad y procede de un proveedor con intereses comerciales. Su valor está más cerca de un marco de diseño que de una promesa de rendimiento. Para un equipo que adopta agentes, la recomendación práctica es definir contratos entre etapas: entradas, salidas, criterios de aceptación, evidencias y señales de operación. Cada agente debe evaluarse con el mismo rigor que el software que produce.

La autonomía no elimina el trabajo de ingeniería. Lo redistribuye. La planificación, la validación y la observabilidad ganan importancia porque son las partes que mantienen la intención conectada con el comportamiento real del sistema.
