---
translationId: meta-thin-orchestrator-20261019
lang: es
slug: meta-thin-orchestrator-agentes-especializados
title: "Meta mejora sus agentes de datos haciendo más pequeño el orquestador"
description: "Un sistema de Meta separa el enrutamiento determinista del razonamiento de dominio y utiliza agentes especializados con contexto aislado para reducir errores en pipelines de datos."
publishedAt: 2026-10-19
sourceName: "Engineering at Meta"
sourceTitle: "The Thin Orchestrator: How We Made Our AI Agents More Reliable by Giving the Router Less to Do"
sourceUrl: "https://engineering.fb.com/2026/10/19/ml-applications/thin-orchestrator-ai-agent-architecture/"
author: "Meta Engineering"
tags: ["applied-ai", "systems", "software-architecture", "reliability"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Meta ha descrito una arquitectura para agentes de producción cuyo componente central hace deliberadamente poco. Su orquestador tiene unas 1.300 líneas, coordina más de 20 flujos de trabajo y dirige las peticiones hacia 14 agentes especializados. No genera configuraciones, no razona sobre el código de dominio y no toca directamente el repositorio: clasifica, recopila datos, aplica controles y delega.

El problema apareció al automatizar la incorporación de columnas en los sistemas de recomendación de Meta. El proceso atraviesa tres repositorios, tres lenguajes de programación y hasta seis etapas que deben permanecer sincronizadas. El primer diseño utilizaba un único agente con todos los esquemas, reglas de generación, requisitos de validación y patrones de más de diez fuentes de datos. Funcionaba en demostraciones, pero en producción mezclaba convenciones de un subsistema con otro.

Meta probó que aumentar el contexto no solucionaba el problema. Con instrucciones manuales específicas, el agente único alcanzaba entre un 70% y un 80% de éxito; sin esa preparación, la tasa descendía al 10%-20%. La interpretación de la compañía es que no se trataba principalmente de una deficiencia de prompts, sino de un límite arquitectónico: demasiadas responsabilidades y demasiados patrones incompatibles en el mismo contexto.

La solución separa dos capas. La primera es un orquestador determinista que clasifica la intención, comprueba si el objetivo ya existe, recopila los campos necesarios, descubre información disponible, aplica puertas de fiabilidad y gestiona errores. La segunda contiene agentes expertos con contexto aislado: uno conoce los registros de esquemas, otro genera código para las fuentes de datos y otro se ocupa de las validaciones. Solo la delegación utiliza razonamiento intensivo de un modelo.

El sistema aplica un protocolo fijo de siete pasos y organiza las fases mediante plantillas de flujo. La incorporación de una columna puede seguir la secuencia esquema, validación, población y pruebas; una migración puede reutilizar los mismos agentes en otro orden. Para Meta, esa separación permite añadir capacidades mediante nuevas plantillas, sin crear un agente desde cero. El conocimiento se carga en tiempo de ejecución desde archivos organizados por dominio, de modo que una actualización no obliga a modificar el orquestador.

Según la empresa, preparar una nueva columna pasó de tres o cuatro días manuales, y aproximadamente un día con el sistema anterior, a menos de una hora. Alrededor de dos tercios de los cambios llegan sin modificaciones humanas significativas. Son resultados internos y deben interpretarse como evidencia de un caso concreto, no como una garantía para cualquier sistema multiagente.

La idea sí es transferible. Las decisiones de enrutamiento, duplicación, permisos y puertas de calidad suelen ser deterministas y conviene mantenerlas fuera del modelo. El razonamiento de dominio puede quedar en agentes pequeños, con entradas explícitas, fuentes de conocimiento acotadas, pasos repetibles y tratamiento de errores. Esta frontera reduce la propagación de fallos: un especialista puede equivocarse sin contaminar todo el estado del sistema.

La arquitectura también mejora la mantenibilidad. Un agente nuevo debería seguir la misma estructura que los demás, y un caso de uso adicional debería intentar reutilizar especialistas existentes mediante una plantilla. En sistemas de IA aplicados a software, más contexto no siempre significa más inteligencia. A veces significa más oportunidades para mezclar reglas que nunca debieron compartir espacio.
