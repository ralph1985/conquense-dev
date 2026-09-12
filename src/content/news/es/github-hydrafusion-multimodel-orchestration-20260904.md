---
translationId: github-hydrafusion-multimodel-orchestration-20260904
lang: es
slug: github-hydrafusion-multimodel-orchestration-20260904
title: "HydraFusion convierte la selección de modelos para programar en un problema de orquestación"
description: "El experimento de GitHub Copilot combina modelos y flujos de trabajo con límites de coste, revisión aislada y aplicación segura de cambios, aunque sus resultados aún son de pruebas"
publishedAt: 2026-09-04
sourceName: "GitHub Blog"
sourceTitle: "Project HydraFusion: Frontier quality via multi-model orchestration"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/"
author: "GitHub Staff"
tags: ["inteligencia-artificial", "agentes", "ingenieria-de-software", "evaluacion", "herramientas-de-desarrollo"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha presentado Project HydraFusion, una vista previa de investigación para Copilot CLI que decide no solo qué modelo usar, sino qué flujo de trabajo necesita cada tarea de programación. El sistema puede resolver una petición con un único modelo, empezar con uno eficiente y escalar a otro más capaz, o generar una solución y someterla a la revisión independiente de un segundo modelo.

La diferencia técnica está en tratar la orquestación como un problema de optimización. HydraFusion recibe señales sobre razonamiento, generación de código, depuración y uso de herramientas, y elige el patrón que espera que alcance el nivel de calidad requerido con el menor coste y latencia razonables. El objetivo no es invocar más modelos por defecto, sino reservar las llamadas adicionales para los casos en que aporten revisión, escalado o una segunda perspectiva.

El patrón Single envía la tarea a un modelo. Cascade permite que un modelo rápido prepare un primer resultado y que una puerta de calidad decida si debe aceptarse o elevarse a un modelo más potente. Critique separa la generación de la revisión: un modelo redacta, otro modelo de una familia diferente analiza el resultado en un contexto de solo lectura y el primero revisa una vez. La separación reduce el riesgo de que el revisor modifique directamente el repositorio y permite evaluar la propuesta antes de aplicarla.

GitHub también describe controles que son más interesantes que el selector de modelos. El runtime contabiliza el coste de cada tramo, incluidos reintentos, revisiones, escalados y fallbacks. Cada ejecución tiene límites explícitos de tiempo y cancelación. Las revisiones se ejecutan en contextos aislados y sin herramientas, mientras que los pasos que resuelven la tarea usan el espacio de trabajo con permisos normales. Si el flujo se cancela o falla la validación, no se aplica ningún parche. Antes de empezar, se comprueban las definiciones del flujo, las vinculaciones de modelos, los fallbacks y la disponibilidad de los modelos.

Los resultados publicados proceden de evaluaciones offline controladas y deben leerse con cautela. En TerminalBench 2.1, la configuración destacada obtuvo una calidad verificada 4,9 puntos superior a Opus 5 con un coste estimado un 67 % menor. En DeepSWE redujo el coste un 36 % con una diferencia de calidad de 1,5 puntos, y en CheckpointBench quedó 0,1 puntos por debajo con un coste un 65 % menor. GitHub advierte que esas cifras dependen de versiones de benchmarks, configuraciones, precios y modelos concretos.

La utilidad de HydraFusion no está únicamente en esos porcentajes. El experimento muestra que los asistentes de código empiezan a parecerse a sistemas distribuidos: necesitan presupuestos, timeouts, aislamiento, trazabilidad y reglas para no dejar cambios incompletos. La evaluación también debe medir la tarea completa y sus costes, no solo la respuesta textual del modelo.

La vista previa está disponible mediante `/experimental` en Copilot CLI y GitHub recomienda comenzar con tareas de programación amplias, bien delimitadas y de un solo turno. Todavía no es una garantía de calidad para cualquier repositorio. Es, más modestamente, una prueba de que la arquitectura que rodea al modelo puede ser tan determinante como el modelo elegido.
