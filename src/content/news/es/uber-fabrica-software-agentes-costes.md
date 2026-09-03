---
translationId: uber-software-factory-2026-08-27
lang: es
slug: uber-fabrica-software-agentes-costes
title: "Uber convierte el desarrollo asistido por IA en una disciplina de costes y operaciones"
description: "Uber explica cómo mide y optimiza una flota de agentes que participa en revisión de código, CI, incidencias y mantenimiento. El interés técnico está en sus métricas, bucles de ver¬"
publishedAt: 2026-08-27
sourceName: "Uber Engineering"
sourceTitle: "Running a Software Factory Efficiently at Uber Scale"
sourceUrl: "https://www.uber.com/us/en/blog/efficient-software-factory/"
author: "Uday Kiran Medisetty"
tags: ["applied-ai", "software-engineering", "developer-tools", "mcp", "observability"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

## La IA de desarrollo también necesita ingeniería de costes

Uber ha publicado una descripción detallada de cómo está operando sus herramientas de IA para el ciclo de vida del software. La empresa afirma que más del 70 % de sus pull requests se atribuyen a agentes locales o cloud, que mantiene más de 3.600 habilidades de agente y que ejecuta más de 30.000 usos de esas habilidades cada día. Son cifras internas, pero el valor de la publicación no depende solo de la escala: muestra qué métricas y límites hacen falta cuando los agentes dejan de ser una herramienta ocasional y pasan a formar parte de la operación diaria.

El modelo de costes de Uber descompone cada sesión en seis factores multiplicativos: usuarios, sesiones por usuario, turnos por sesión, solicitudes por turno, tokens por solicitud y precio por token. Esta separación permite distinguir crecimiento de uso y desperdicio operativo. Por ejemplo, una factura mayor puede deberse a más adopción, a contextos demasiado grandes o a demasiados turnos de razonamiento. Cada causa exige una intervención diferente.

La empresa también intenta medir el valor producido, no únicamente el consumo. Para los agentes gestionados registra costes por pull request fusionada, revisión, alerta o tarea de limpieza, junto con señales de calidad como tasa de reversiones, F1 y tiempo medio de recuperación. Ese enfoque es útil porque evita considerar una respuesta barata como éxito si genera más revisiones manuales o problemas posteriores.

Entre las optimizaciones descritas está la selección de modelos mediante benchmarks construidos con trabajo real. Uber compara precisión, recuperación, F1, coste, latencia, timeouts y ruido para escoger configuraciones que formen una frontera razonable entre calidad y precio. También ajusta la caché de prompts: las sesiones interactivas reciben una ventana más larga porque los ingenieros suelen dejarlas inactivas durante varios minutos, mientras que los subagentes mantienen una caché más corta.

Otro problema es el tamaño del contexto que introducen las herramientas MCP. La carga directa de muchos esquemas puede añadir decenas de miles de tokens antes de que empiece la tarea. Uber responde con un gateway común, resolución de herramientas mediante CLI y búsqueda bajo demanda. Además, usa code-mode para agrupar llamadas y mantener los ciclos de espera fuera del contexto activo del modelo. En sus pruebas, ese patrón redujo más del 50 % de los tokens en consultas pequeñas y más del 90 % en flujos agrupados.

La lección aplicable a otros equipos es concreta: escalar agentes requiere observabilidad de coste, evaluación sobre tareas reales, permisos y contexto bien delimitados. Los porcentajes de Uber no son automáticamente reproducibles, pero la ecuación y la metodología sí ofrecen una base para medir si una automatización entrega valor o simplemente produce más actividad.
