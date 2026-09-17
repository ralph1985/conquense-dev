---
translationId: harness-engineering-behavioral-evals-ai-agents-20260909
lang: es
slug: evaluaciones-conductuales-agentes-codificacion-ia
title: "Google propone evaluar los agentes de código por su comportamiento observable"
description: "Una propuesta de Google Developers recomienda combinar benchmarks de extremo a extremo con evaluaciones pequeñas y deterministas que comprueben las acciones intermedias de los Agnt"
publishedAt: 2026-09-09
sourceName: "Google Developers Blog"
sourceTitle: "The Anatomy of Harness Engineering: How to Evaluate, Iterate, and Guard AI Coding Agents"
sourceUrl: "https://developers.googleblog.com/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/"
author: "Taylor Mullen y Christian Gunderman"
tags: ["software-engineering", "testing", "applied-ai", "maintainability"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Developers Blog ha descrito una estrategia de evaluación para agentes de programación basada en conductas observables, no solo en el resultado final de una tarea. La propuesta responde a un problema práctico: un benchmark de extremo a extremo puede indicar que un agente ha empeorado unos puntos, pero rara vez explica qué cambió ni qué comportamiento debe corregirse.

Los autores recomiendan usar evaluaciones conductuales como una capa intermedia. En lugar de preguntar únicamente si el agente completó una refactorización de varios archivos, una prueba puede comprobar si pidió aclaraciones ante una instrucción ambigua, si ejecutó el validador local al modificar un archivo de construcción o si incluyó enlaces canónicos al generar documentación. Son comprobaciones pequeñas, rápidas y relacionadas con acciones concretas del sistema.

La comparación con las pruebas de integración resulta útil. Una evaluación conductual funciona como un contrato sobre el arnés del agente: observa llamadas a herramientas, cambios de archivos y decisiones intermedias. Así, un cambio de prompt, de esquema de herramientas o de modelo puede someterse a una batería local y determinista antes de llegar a un benchmark costoso o a un entorno compartido. El resultado no demuestra que el agente resuelva cualquier tarea, pero sí ayuda a detectar regresiones específicas y a localizar su causa.

El orden de adopción también es relevante. Google aconseja empezar con intuición de desarrollador y uso real del sistema, lo que denomina dogfooding. Un equipo puede observar cómo el agente trabaja sobre su propio repositorio, automatiza tareas rutinarias y tropieza con los límites actuales. Cuando ya existen comportamientos que proteger, tiene sentido convertirlos en una suite de evaluaciones. Construir una infraestructura compleja antes de conocer esos comportamientos produciría métricas difíciles de interpretar.

Esta separación entre capacidad global y disciplina operativa encaja bien con la ingeniería de software tradicional. Un agente puede producir una solución que pasa los tests y, aun así, haber ignorado una instrucción de seguridad, inventado una opción de línea de comandos o modificado una zona que debía permanecer intacta. Las aserciones intermedias permiten capturar esos fallos aunque el resultado parezca correcto en un caso concreto.

La lección no es sustituir los benchmarks amplios. Las pruebas de extremo a extremo siguen siendo necesarias para comprobar que el sistema resuelve trabajos completos. La propuesta es combinarlas con controles más baratos que funcionen como guía durante la evolución del agente. Ese diseño crea una cadena de verificación proporcional: observación detallada para iterar, benchmarks integrales para confirmar capacidad y revisión humana para los riesgos que ninguna métrica cubre por completo.

Para equipos que integran agentes en flujos de desarrollo, el beneficio principal es la mantenibilidad del propio sistema de IA. Los prompts, las herramientas y los modelos cambian; los comportamientos que el equipo considera obligatorios deberían quedar expresados como pruebas repetibles.
