---
translationId: secure-enterprise-agents-2026
lang: es
slug: microsoft-prueba-una-arquitectura-de-seguridad-para-agentes-en-la-empresa
title: "Microsoft prueba una arquitectura de seguridad para agentes en la empresa"
description: "Un piloto interno de Microsoft combina identidades de agentes, protección en tiempo de ejecución, prevención de pérdida de datos y control de dispositivos en un entorno real."
publishedAt: 2026-08-27
sourceName: "Microsoft Inside Track"
sourceTitle: "Securing AI agents in the enterprise: Learnings from our journey at Microsoft"
sourceUrl: "https://www.microsoft.com/insidetrack/blog/securing-ai-agents-in-the-enterprise-learnings-from-our-journey-at-microsoft/"
author: "Mark Armstrong"
tags: ["seguridad", "agentes-ia", "identidad", "empresa"]
readingTime: 3
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Microsoft ha descrito un piloto interno para comprobar si los agentes de IA pueden operar dentro de una empresa sin quedar fuera de los controles existentes. El proyecto reunió a equipos de Microsoft Digital, Windows, Entra, Intune, Defender, Purview y Microsoft Security. Más que anunciar una capacidad aislada, el caso muestra el problema arquitectónico que aparece cuando un agente necesita identidad, acceso a recursos, red y capacidad de actuar.

La prueba se ejecutó dentro del tenant corporativo de Microsoft, con un entorno dedicado de Windows 365 Cloud PC para aproximadamente 100 usuarios internos. El equipo implicado superó los 70 participantes de distintos grupos de producto y negocio. Los escenarios incluían imágenes de Windows con Copilot CLI y OpenClaw, aprovisionamiento de Cloud PC, identificadores de agente en Entra, protección de ejecución de Defender, políticas de prevención de pérdida de datos de Purview, configuración mediante Intune y controles de red de Global Secure Access.

La decisión técnica más importante es tratar a los agentes como actores diferenciados, no como extensiones invisibles de la cuenta humana. Los Agent IDs permiten distinguir una acción ejecutada por una persona de otra iniciada por un agente. Esa separación proporciona una base para aplicar permisos, registrar actividad y analizar incidentes. No resuelve por sí sola el riesgo, pero evita que las auditorías tengan que inferir quién actuó a partir de una identidad compartida.

El resto del diseño funciona como una defensa por capas. Windows 365 ofrece el entorno de trabajo; Intune aplica configuración a dispositivos y agentes; Entra gestiona identidad; Global Secure Access añade controles de red durante la ejecución; Defender vigila el comportamiento; y Purview limita movimientos de información sensibles. La utilidad de esta combinación está en que los controles acompañan al agente mientras usa herramientas y datos, en lugar de confiar únicamente en filtros alrededor del modelo.

Este enfoque también cambia dónde debe probarse la seguridad. Un agente puede parecer seguro en una demostración y comportarse de otra forma cuando accede a repositorios, correo, archivos corporativos o servicios internos. Por eso el piloto se centró en escenarios de trabajo reales y en mantener activadas las políticas corporativas, según Microsoft. La integración permite observar si las restricciones sobreviven al uso cotidiano y si los equipos pueden investigar las acciones generadas.

Hay que leer el resultado con el alcance correcto. El artículo es un informe de experiencia del propio proveedor, no una evaluación independiente ni una garantía de que cualquier empresa pueda reproducir el mismo nivel de control. Tampoco demuestra que todos los agentes sean seguros. Sí aporta una referencia útil para diseñar una implantación: inventariar identidades no humanas, limitar el entorno de ejecución, registrar las acciones, aplicar controles de datos y probar la integración en un tenant representativo.

La lección técnica es que la seguridad de los agentes no pertenece a un único producto ni a una única capa del modelo. Depende de que identidad, dispositivo, red, datos y monitorización compartan señales suficientes para gobernar una acción de principio a fin. Ese trabajo es menos visible que la interfaz conversacional, pero determina si la automatización puede entrar realmente en la operación diaria.
