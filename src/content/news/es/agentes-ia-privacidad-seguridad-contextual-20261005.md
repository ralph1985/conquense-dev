---
translationId: agentes-ia-privacidad-seguridad-contextual-20261005
lang: es
slug: agentes-ia-privacidad-seguridad-contextual-20261005
title: "Google propone una capa contextual para controlar la seguridad de los agentes de IA"
description: "Un informe del taller CAPS identifica tres dificultades estructurales de los agentes autónomos y propone combinar políticas contextuales, sandboxing, controles de usuario y evalu"
publishedAt: 2026-10-05
sourceName: "Google Research"
sourceTitle: "Open and Emergent Problems in Agentic Privacy and Security: A Contextual Angle"
sourceUrl: "https://research.google/blog/open-and-emergent-problems-in-agentic-privacy-and-security-a-contextual-angle/"
author: "Eugene Bagdasarian y Marco Gruteser"
tags: ["inteligencia-artificial", "agentes", "privacidad", "seguridad", "software"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Research ha publicado un informe de taller sobre los problemas abiertos de privacidad y seguridad que plantean los agentes de IA. El documento reúne el trabajo de más de cincuenta investigadores y profesionales vinculados al taller Contextual Agent Privacy and Security, y propone una idea útil para la ingeniería: controlar a un agente no consiste únicamente en darle menos permisos, sino en evaluar si cada acción es apropiada para el contexto concreto.

El informe destaca tres diferencias respecto al software determinista tradicional. La primera es la ambigüedad de las entradas: un agente interpreta lenguaje natural, imágenes y documentos que pueden contener instrucciones maliciosas o ambiguas. La segunda son los flujos de control probabilísticos: el sistema puede elegir planes y rutas distintas ante peticiones parecidas, lo que dificulta asegurar su comportamiento con pruebas convencionales. La tercera es la autonomía, incluida la delegación entre agentes. Cuando una tarea se prolonga y se divide en subtareas, pedir confirmación al usuario en cada paso deja de ser una solución práctica y puede producir fatiga de aprobación.

La propuesta conceptual se apoya en la teoría de la integridad contextual. En lugar de tratar la privacidad como secreto absoluto o como una lista fija de permisos, el sistema debe razonar sobre quién comunica qué información, a quién y bajo qué reglas. Un asistente puede necesitar datos personales para reservar un viaje, pero eso no significa que pueda compartirlos con cualquier herramienta descubierta durante el proceso.

Para llevar esa idea a la arquitectura, el informe plantea una capa supervisora con un motor de políticas contextuales. Antes de ejecutar una llamada a una herramienta, el agente propondría una acción y el motor evaluaría el flujo de datos, la identidad del agente, el contexto de la petición y las reglas aplicables. La política podría generarse o ajustarse dinámicamente cuando cambian las herramientas disponibles o el objetivo de la tarea. En la práctica, esto se parece menos a una autorización binaria y más a una decisión de capacidades con expiración, trazabilidad y posibilidad de revocación.

El informe no presenta un producto listo para instalar ni un protocolo estandarizado. Su valor está en ordenar una agenda de investigación y diseño. La defensa propuesta es deliberadamente multicapa: sandboxing del sistema, razonamiento del modelo, controles comprensibles para la persona usuaria, límites para la colaboración entre agentes y mecanismos de gobernanza entre organizaciones. También reclama entornos de evaluación multiagente, similares a un `Agent Gym`, capaces de medir interacciones largas y fallos encadenados.

Para los equipos de software, la consecuencia es concreta. Un agente que puede leer datos y ejecutar acciones necesita identidad propia, permisos mínimos, registros de decisiones, simulaciones de herramientas y pruebas de abuso prolongadas. Las revisiones puntuales del prompt o del resultado final no bastan para cubrir el comportamiento emergente. La seguridad de estos sistemas tendrá que observar el recorrido completo: intención, plan, herramientas, datos transferidos, resultado y efectos secundarios.
