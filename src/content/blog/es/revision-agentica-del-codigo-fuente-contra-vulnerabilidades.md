---
translationId: agentic-source-code-review-2026-08
lang: es
slug: revision-agentica-del-codigo-fuente-contra-vulnerabilidades
title: "Revisión agéntica del código fuente para encontrar vulnerabilidades con más contexto"
description: "Google Threat Intelligence describe una arquitectura multiagente que combina análisis automatizado, modelado de amenazas y validación humana para acelerar la búsqueda de vulnerabil"
publishedAt: 2026-08-18
sourceName: "Google Threat Intelligence"
sourceTitle: "Staying Ahead of Adversarial AI Through Agentic Source Code Review"
sourceUrl: "https://cloud.google.com/blog/topics/threat-intelligence/staying-ahead-of-adversarial-ai-through-agentic-source-code-review"
author: "Alex Tselevich y Michael Maturi"
tags: ["seguridad", "inteligencia artificial", "ingeniería de software", "vulnerabilidades", "código fuente"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Google Threat Intelligence ha explicado cómo utiliza un sistema multiagente para analizar código fuente y descubrir rutas de explotación. La propuesta, denominada Agentic Vulnerability Discovery Harness (AVDH), no se presenta como un sustituto de los especialistas de seguridad, sino como una infraestructura para ampliar su capacidad de análisis en repositorios grandes y complejos.

La idea central es estructurar el trabajo de los modelos mediante una secuencia determinista de fases. El proceso comienza con el reconocimiento del repositorio y la elaboración de un modelo de amenazas. Un agente identifica el propósito de la aplicación, sus tecnologías, la documentación disponible y los componentes relevantes. Después, varios exploradores especializados revisan áreas como autenticación, autorización, routing y otros puntos de entrada.

Este paso es importante porque el análisis de una función aislada suele perder información decisiva. Una vulnerabilidad puede depender de permisos definidos en otro módulo, de una condición de routing o de una transformación aplicada varios saltos antes. Por eso, AVDH enriquece cada entrada identificada con el contexto relacionado y decide si necesita análisis de control de acceso, de flujo de datos o de ambos.

A partir de ahí, agentes especializados generan hipótesis sobre posibles fallos. El análisis de control de acceso busca, entre otros problemas, autorizaciones ausentes, comprobaciones realizadas contra la identidad equivocada y escaladas de privilegios. El análisis de flujo sigue los datos controlados por el usuario hasta funciones peligrosas o “sinks”, donde podrían producirse inyecciones SQL, XSS, ejecución de comandos o traversal de rutas.

La arquitectura separa la generación de hipótesis de su validación. Varias instancias revisan cada posibilidad y un agente de síntesis clasifica el resultado como confirmado, refutado o rechazado. Después intervienen especialistas humanos, que reproducen la explotación y ejecutan pruebas de concepto en entornos controlados. Los hallazgos que no superan esa comprobación se descartan.

Según el artículo, el sistema encontró más de cien vulnerabilidades críticas confirmadas durante una investigación de respuesta a incidentes en dos días. También analizó decenas de millones de líneas de código y contribuyó a doce CVE asignados. Son cifras comunicadas por el propio proveedor, por lo que deben interpretarse como resultados de una experiencia interna y no como una evaluación independiente.

La lección técnica más útil no es simplemente que los modelos puedan revisar código. Es que su eficacia depende de la orquestación: inventarios de activos, SBOM, documentación de arquitectura, inteligencia de amenazas, reglas específicas por lenguaje y framework, filtros de confianza y validación dinámica. Sin ese contexto, un sistema puede producir demasiados falsos positivos o pasar por alto rutas de ataque relevantes.

Para los equipos de ingeniería, el patrón sugiere una defensa por capas. El análisis automatizado puede ampliar la cobertura y priorizar trabajo repetitivo, mientras que las personas conservan la responsabilidad de validar explotabilidad, impacto y divulgación. También resulta necesario medir el sistema con benchmarks propios, vulnerabilidades realmente alcanzables y revisión humana, porque los conjuntos públicos pueden estar presentes en los datos de entrenamiento de los modelos.

En otras palabras, el valor no está en añadir un chatbot al proceso de seguridad, sino en diseñar un pipeline reproducible que conecte contexto arquitectónico, análisis especializado, verificación adversarial y criterio experto.
