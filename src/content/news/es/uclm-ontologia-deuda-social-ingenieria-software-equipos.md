---
translationId: uclm-social-debt-ontology-software-teams-20260826
lang: es
slug: uclm-ontologia-deuda-social-ingenieria-software-equipos
title: "Una investigación vinculada a la UCLM convierte la deuda social del software en un modelo analizable"
description: "El trabajo publicado en Software and Systems Modeling propone una ontología formal para representar problemas de coordinación, conocimiento y comunicación que suelen quedar fuera�"
publishedAt: 2026-08-26
sourceName: "Springer Nature"
sourceTitle: "An ontology-based metamodel for the analysis and management of social debt in software development teams"
sourceUrl: "https://link.springer.com/article/10.1007/s10270-026-01413-6"
author: "Eydy del Carmen Suárez Brieva, César Jesús Pardo Calvache y Ricardo Pérez-Castillo"
tags: ["ingeniería del software", "mantenibilidad", "ontologías", "calidad", "castilla-la-mancha"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Una investigación publicada en Software and Systems Modeling propone una forma formal de analizar la llamada deuda social en los equipos de desarrollo. El trabajo cuenta entre sus autores con Ricardo Pérez-Castillo, del grupo Alarcos de la Universidad de Castilla-La Mancha, cuya afiliación aparece vinculada al campus de Talavera de la Reina. La propuesta es relevante porque lleva a un terreno computable problemas que suelen aparecer en retrospectivas o conversaciones privadas, pero rara vez quedan representados en las herramientas de ingeniería.

La deuda social describe costes derivados de fallos de comunicación, coordinación y colaboración, así como de estructuras organizativas o decisiones poco claras. Puede manifestarse como ambigüedad de roles, concentración de conocimiento en pocas personas, cuellos de botella para coordinar tareas o patrones de colaboración ineficaces. El resultado no es solo malestar del equipo: también puede traducirse en retrabajo, defectos, retrasos y pérdida de conocimiento cuando alguien deja de estar disponible.

El artículo presenta la Social Debt Ontology, un metamodelo basado en ontologías que proporciona un vocabulario estructurado para representar causas, efectos, “community smells”, estrategias de mitigación, indicadores, métricas, riesgos y procesos. El modelo contiene 46 clases, 74 propiedades de objeto y 286 individuos. Se implementó en OWL 2 DL con Protégé siguiendo una adaptación de la metodología REFSENO, lo que permite describir las relaciones de forma explícita y procesable por herramientas de razonamiento.

La validación combina preguntas de competencia expresadas mediante consultas SPARQL, comprobaciones de consistencia lógica con el razonador HermiT y dos estudios de caso. La calidad de la ontología se evaluó con la metodología FOCA, atendiendo a aspectos como completitud, claridad, consistencia, adaptabilidad y eficiencia computacional. Esta combinación importa: una taxonomía útil para una presentación no es necesariamente un modelo que pueda sostener trazabilidad o recomendaciones automatizadas.

La aportación no debe confundirse con un detector automático de equipos disfuncionales. El trabajo ofrece un marco reutilizable para hacer explícitas relaciones que normalmente permanecen dispersas en chats, tickets, revisiones y memoria organizativa. En una aplicación futura, ese vocabulario podría ayudar a conectar señales de proceso con decisiones de mejora, siempre que las métricas se interpreten con contexto y no como una puntuación absoluta de las personas.

La lección para la ingeniería de software es sobria pero útil: la mantenibilidad depende también de cómo se distribuyen las responsabilidades y el conocimiento. Formalizar esos riesgos no sustituye la conversación del equipo, pero puede mejorar la trazabilidad de las causas y hacer comprobables algunas hipótesis. Para organizaciones que ya gestionan deuda técnica con datos, la ontología abre una vía para incorporar la dimensión social sin reducirla a una opinión informal ni a una métrica aislada.
