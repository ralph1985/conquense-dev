---
translationId: aws-deception-benchmark-20260909
lang: es
slug: aws-publica-un-benchmark-para-medir-las-falsas-alarmas-de-la-ia-en-seguridad
title: "AWS publica un benchmark para medir las falsas alarmas de la IA en seguridad"
description: "Deception Benchmark evalúa si los modelos distinguen vulnerabilidades reales de código seguro que solo parece vulnerable."
publishedAt: 2026-09-09
sourceName: "AWS Security Blog"
sourceTitle: "The state of AI for security: Measuring what matters most for building trust"
sourceUrl: "https://aws.amazon.com/blogs/security/the-state-of-ai-for-security-measuring-what-matters-most-for-building-trust/"
author: "Anshumali Shrivastava y Neha Rungta"
tags: ["security", "applied-ai", "evaluation", "software-engineering"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

AWS ha presentado Deception Benchmark, un conjunto de evaluación diseñado para medir un problema menos visible de la seguridad asistida por IA: la capacidad de distinguir una vulnerabilidad explotable de un patrón de código que parece peligroso, pero está correctamente mitigado. La publicación llega en un momento en que los modelos ya se emplean para triaje de vulnerabilidades, revisión de código, threat modeling y respuesta a incidentes.

El benchmark contiene 14.822 muestras, repartidas entre 16 lenguajes y más de 70 categorías CWE. Sus casos seguros están construidos para engañar a un clasificador superficial. En una variante, dos fragmentos comparten el mismo patrón sospechoso y solo una corrección sutil cierra la vía de explotación. En otra, el código es idéntico, pero el contexto de despliegue cambia el resultado: una NetworkPolicy de Kubernetes puede bloquear un SSRF o una frontera de IAM puede impedir una escalada de privilegios.

La estructura obliga a separar dos errores que la exactitud agregada oculta. La tasa de falsos positivos indica cuántos fragmentos seguros se marcan como vulnerables y representa el ruido que termina revisando un ingeniero. La tasa de falsos negativos indica cuántas vulnerabilidades reales se clasifican como seguras. AWS propone como umbral mínimo para producción mantener ambas por debajo del 10 %, aunque ningún modelo generalista probado alcanza ese objetivo en esta evaluación.

Con instrucciones directas, los modelos detectaron una gran parte de las vulnerabilidades reales, pero también marcaron como peligrosos entre el 41 % y el 99 % de los casos seguros, según la configuración. Los prompts orientados a demostrar la explotación redujeron los falsos positivos entre 17 y 74 puntos porcentuales, pero dejaron escapar entre el 7 % y el 44 % de las vulnerabilidades. El resultado muestra por qué encontrar patrones no equivale a comprender si una mitigación funciona.

También es relevante cómo se construyeron las etiquetas. Cada caso pasó por varias revisiones independientes y ciegas. Los desacuerdos se llevaron a adjudicación y, si persistían, el caso se excluía del conjunto puntuado en vez de forzar una corrección. El conjunto final puntuado reúne 9.695 muestras; otras 5.127 quedan reservadas para evitar que los sistemas optimicen mediante memorización. Una revisión humana de 100 casos puntuados no encontró errores de etiquetado, según AWS.

La utilidad práctica no está en convertir el benchmark en un certificado automático. Está en exigir a las herramientas de seguridad métricas que incluyan el coste de equivocarse. Un sistema que alerta sobre casi todo puede parecer sensible y, al mismo tiempo, saturar al equipo hasta que las alertas importantes pierdan credibilidad. Deception Benchmark se publica con los datos y el flujo de evaluación, pero sin las etiquetas, y ofrece una forma reproducible de comparar sistemas. Para código de alto riesgo, la revisión humana y la comprobación del entorno siguen siendo necesarias.
