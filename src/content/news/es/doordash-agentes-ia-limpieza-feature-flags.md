---
translationId: doordash-feature-flag-agents-20260824
lang: es
slug: doordash-agentes-ia-limpieza-feature-flags
title: "DoorDash automatiza la limpieza de feature flags con agentes de IA"
description: "Un sistema multiagente elimina flags obsoletos usando estado de experimentación en producción, worktrees aislados y validaciones deterministas."
publishedAt: 2026-08-24
sourceName: "DoorDash"
sourceTitle: "Automating Feature-Flag Cleanup at Scale with a Multi-Agent LLM System"
sourceUrl: "https://careersatdoordash.com/blog/automating-feature-flag-cleanup-at-scale-with-a-multi-agent-llm-system/"
author: "Atharv Chandratre y Jai Datar"
tags: ["software-engineering", "applied-ai", "maintainability", "feature-flags"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Las feature flags son útiles para desplegar funciones gradualmente, ejecutar experimentos y activar mecanismos de emergencia. También acumulan deuda técnica: cuando una función ya está completamente desplegada, la condición que la protegía suele permanecer en el código, junto con sus ramas, tests y dependencias. DoorDash ha publicado un sistema para automatizar esa limpieza a escala.

La plataforma de experimentación de la compañía gestiona más de 60.000 flags en unos 623 repositorios y crea aproximadamente 2.300 nuevas cada mes. El sistema identifica como obsoleta una flag que no ha cambiado en 90 días, sigue referenciada en el código, no está archivada ni retirada y no figura en una lista de exclusión. Un proceso diario crea una incidencia de Jira para cada caso.

El problema no se resuelve siempre con una transformación sintáctica. En DoorDash, la definición de una flag, el cliente que la consulta y la lógica de negocio pueden estar separados por varias capas de inyección de dependencias. Una limpieza aparentemente sencilla puede afectar entre cinco y veinte archivos. Además, el valor correcto no se deduce solo del repositorio: hay que consultar el estado real del despliegue. Un experimento abandonado al 0% no debe tratarse como una función activada, y uno parcialmente desplegado exige criterio humano.

El flujo tiene dos fases. Primero, un agente orquestador consulta las incidencias, busca referencias en el repositorio y obtiene mediante MCP los metadatos de la plataforma de experimentación, incluido el porcentaje de despliegue y el valor objetivo. Un ingeniero revisa el informe y confirma ese valor antes de modificar código. Después, agentes especializados trabajan en worktrees de Git aislados, con hasta cuatro ejecuciones simultáneas por repositorio. Cada agente localiza referencias, aplica la estrategia adecuada, actualiza los tests y ejecuta compilación, pruebas, cobertura de parche JaCoCo y análisis estático de Detekt. Solo se abre la pull request si las comprobaciones pasan.

En una evaluación de 50 flags, 45 produjeron pull requests utilizables, con una media de 13,8 minutos y 4,79 dólares por limpieza. Treinta y una se fusionaron a la primera, catorce necesitaron una revisión y cinco requirieron intervención del equipo. La tasa de éxito en un solo intento fue del 100% para los casos simples, del 94% para los medios y del 85% para los complejos. DoorDash no observó bugs ni regresiones en la muestra.

La lección técnica no es que un modelo pueda borrar código sin supervisión. Es que la automatización resulta más fiable cuando conoce el estado operativo que el repositorio no contiene, trabaja en entornos aislados y tiene límites verificables. En este caso, los fallos se manifestaron sobre todo como limpieza incompleta en cadenas de llamadas profundas, no como cambios incorrectos. Para equipos que experimentan con agentes de programación, esa frontera —completitud frente a corrección— es una métrica mucho más útil que contar líneas generadas.
