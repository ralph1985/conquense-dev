---
translationId: agentic-red-teaming-security-2026-08-13
lang: es
slug: red-teaming-seguridad-era-agentes
title: "El red teaming ante ataques ejecutados por agentes"
description: "Google plantea cómo adaptar los ejercicios ofensivos y la detección cuando la automatización con IA reduce el tiempo de reacción."
publishedAt: 2026-08-13
sourceName: "Google Security Blog"
sourceTitle: "The Evolving Role of the Red Team in the Era of Agentic Security"
sourceUrl: "https://blog.google/security/the-evolving-role-of-the-red-team-in-the-era-of-agentic-security/"
author: "Daniel Fabian"
tags: ["ciberseguridad", "ia aplicada", "red teaming", "arquitectura"]
readingTime: 3
aiDisclosure: "Texto generado con IA y revisado antes de su publicación."
---

Los equipos de seguridad llevan años usando ejercicios de red teaming para comprobar si una organización detecta, contiene y recupera de un ataque plausible. La propuesta reciente del equipo de Red Teams de Google no cambia ese objetivo, pero sí el escenario que conviene ensayar: adversarios que emplean agentes de IA para automatizar partes de la intrusión.

La diferencia técnica no es que un modelo sustituya por completo a un atacante experto. El cambio relevante es que ciertas tareas repetitivas —reconocimiento, clasificación de información encontrada, priorización de sistemas comprometidos o búsqueda de credenciales expuestas— pueden ejecutarse con menos intervención humana y en paralelo. Para actores que privilegian el volumen, esa automatización puede reducir el tiempo entre el acceso inicial y el movimiento lateral. Por tanto, una alerta que llegue a un analista puede hacerlo cuando varias acciones ya se han encadenado.

El artículo también distingue entre campañas muy dirigidas y operaciones indiscriminadas. En las primeras, delegar decisiones críticas en un agente puede introducir ruido y poner en riesgo herramientas o accesos valiosos. En las segundas, una menor precisión puede ser aceptable si se compensa con más velocidad y alcance. Esta distinción es importante para no convertir la expresión “ataque agente” en una predicción única: el riesgo depende del incentivo del adversario y de qué parte de la cadena pueda automatizarse de forma fiable.

Para los equipos defensivos, la consecuencia práctica es revisar el tiempo de respuesta como una propiedad del sistema, no solo como una métrica del SOC. Resulta útil medir cuánto tardan los registros en estar disponibles, cuánto tarda una detección en correlacionarse y qué controles pueden actuar sin esperar una aprobación manual. También conviene identificar qué automatizaciones legítimas existen en la organización, qué identidad usan y qué permisos tienen. Un agente interno con privilegios amplios, trazabilidad insuficiente o secretos accesibles puede ampliar la superficie de ataque aunque se haya creado para una tarea inocua.

Google recomienda una transición gradual en el red teaming: automatizar primero módulos acotados de un ejercicio clásico y conectarlos después si ofrecen resultados verificables. El enfoque evita asumir que la autonomía completa es necesaria desde el primer día. Un subagente de reconocimiento, por ejemplo, puede servir para comprobar la visibilidad de activos o la calidad de la segmentación sin concederle capacidad de alterar sistemas de producción.

La oportunidad está en aplicar la misma idea al lado defensor. Los agentes pueden ayudar a resumir evidencias, enriquecer alertas o proponer contenciones, pero el diseño debe conservar límites de permisos, registro de decisiones y una vía clara de reversión. El valor de un ejercicio no consiste en demostrar que la IA ataca rápido, sino en descubrir qué controles dejan de ser suficientes cuando la velocidad operativa aumenta.
