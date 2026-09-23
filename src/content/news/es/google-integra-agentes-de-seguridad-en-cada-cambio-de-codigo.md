---
translationId: google-agentic-security-infrastructure-20260918
lang: es
slug: google-integra-agentes-de-seguridad-en-cada-cambio-de-codigo
title: "Google integra agentes de seguridad en cada cambio de código"
description: "Google describe un sistema de análisis previo al envío que combina modelos, grafos de llamadas, reglas estructurales y revisión humana para reducir vulnerabilidades sin esperar a a"
publishedAt: 2026-09-18
sourceName: "Google Cloud Blog"
sourceTitle: "Changing the game: Using agentic AI to secure infrastructure code"
sourceUrl: "https://cloud.google.com/blog/topics/systems/using-ai-agents-to-secure-google-infrastructure/"
author: "Andrés Lagar-Cavilla y Parthasarathy Ranganathan"
tags: ["security", "ai", "software-engineering", "devops", "supply-chain"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google ha publicado una descripción de su enfoque para incorporar agentes de inteligencia artificial a la seguridad del código de infraestructura. La propuesta no consiste simplemente en pedir a un modelo que revise un pull request, sino en distribuir el trabajo entre análisis rápidos, contexto específico del repositorio, validaciones deterministas y una segunda capa nocturna. La lección general es relevante para cualquier organización que esté aumentando la velocidad de generación de código.

El primer cambio es temporal. En lugar de depender principalmente de análisis grandes y periódicos, Google ejecuta un escaneo previo al envío para cada cambio, en todas las capas de la pila. El argumento técnico es que un cambio pequeño requiere menos contexto que una revisión completa del sistema y puede devolver una respuesta útil al desarrollador o al agente que ha generado el código. La seguridad se convierte así en una comprobación cercana al momento de escritura, similar a un linter o a un análisis estático integrado en el flujo habitual.

Para reducir falsos positivos, el sistema utiliza modelos de amenaza localizados. La información no procede solo de documentos estáticos: se combina con metadatos vivos de la base de código y con un grafo de dependencias y llamadas entre paquetes y bibliotecas. Según Google, esta estrategia ha reducido la tasa de falsos positivos hasta aproximadamente el 3% en algunos casos. Es una cifra declarada por la empresa y no una auditoría independiente, pero ilustra un principio sólido: el contexto de seguridad debe evolucionar junto al código y no permanecer como documentación olvidada.

La respuesta rápida se divide en dos pasos. Un escaneo ligero produce candidatos y un agente especializado los valida mediante análisis sintáctico, recorrido del grafo de llamadas y reglas de seguridad previamente indexadas. Google afirma que ese triage supera el 92% de precisión y termina en menos de un minuto bajo sus condiciones internas. Después, un escaneo posterior al envío se ejecuta durante las pruebas de integración nocturnas para detectar riesgos que solo aparecen al combinar varios cambios.

El ciclo se cierra con un agente de reparación. A partir del hallazgo y de una prueba generada que muestra cómo se puede ejercer la vulnerabilidad, propone un parche coherente con los estándares internos y lo devuelve a la revisión humana original. Esto es importante: automatizar la corrección no elimina la revisión, pero reduce el tiempo entre detección y una propuesta concreta.

El diseño ofrece varias recomendaciones transferibles. Conviene separar los agentes de generación, análisis y triage para limitar sesgos; combinar modelos con validación estructural; mantener actualizados los modelos de amenaza; y conservar una aprobación humana para los cambios sensibles. Google también ha evolucionado Mantis, su arnés de revisión multiagente de código abierto. El valor del enfoque no está en delegar la seguridad a un modelo, sino en construir un sistema con contexto, evidencias y límites operativos que pueda funcionar a la velocidad real del desarrollo.
