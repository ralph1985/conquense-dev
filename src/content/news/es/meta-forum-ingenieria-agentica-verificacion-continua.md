---
translationId: meta-forum-agentic-engineering-20261015
lang: es
slug: meta-forum-ingenieria-agentica-verificacion-continua
title: "Meta construye Forum alrededor de la verificación continua, no de la generación de código"
description: "La experiencia de Meta con Forum muestra cómo los agentes de IA pueden participar en el ciclo de ingeniería cuando existen especificaciones precisas, pruebas automatizadas, comprob"
publishedAt: 2026-10-15
sourceName: "Engineering at Meta"
sourceTitle: "How Meta Built Forum With AI-Native Engineering"
sourceUrl: "https://engineering.fb.com/2026/10/15/ml-applications/how-meta-built-forum-ai-native-engineering/"
author: "Shengbo Guo, Bohou Luo, Shubhojeet Sarkar, Vivian Qu, Max (Xiangjun) Fan, Prerna Jain, Mike Plumpe, Chinmay Abhyankar y "
tags: ["applied-ai", "software-engineering", "testing", "maintainability"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Meta ha publicado cómo construyó Forum, una aplicación independiente para profundizar en las conversaciones de Facebook Groups, utilizando un agente de IA como participante del proceso de ingeniería. La historia es relevante porque no presenta al modelo como un autocompletado más, sino como parte de un bucle que planifica, implementa, compila, prueba, corrige y vuelve a verificar el trabajo.

La diferencia central está en el criterio de éxito. Para Meta, una tarea no termina cuando el código compila: debe superar pruebas automatizadas, comprobaciones visuales y una revisión humana respaldada por evidencias. Cada cambio llega con resultados de compilación, pruebas y sesiones de verificación registradas. El agente puede trabajar de forma asíncrona, pero la responsabilidad sobre el resultado continúa siendo humana.

Ese modelo exige convertir la planificación en una especificación técnica precisa. Meta describe contexto legible por máquinas, descomposición rigurosa y señales de aprobado o fallido integradas directamente en el flujo. También utiliza agentes de navegación que interactúan con la aplicación como lo haría una persona: leen la interfaz, ejecutan recorridos y detectan regresiones. No sustituyen todas las pruebas, pero amplían la frecuencia con la que pueden repetirse ciertos caminos críticos.

La arquitectura del proyecto también fue parte del experimento. El equipo priorizó un código sencillo y modular, porque los agentes aprenden patrones de lo que encuentran en el repositorio. Cuando una mala abstracción permanece, tiende a reproducirse en sesiones posteriores. Para reducir errores de contexto, los agentes recibieron herramientas para consultar el estado real del simulador, la jerarquía de vistas y las rutas disponibles, en lugar de depender de descripciones textuales o coordenadas aproximadas.

Meta separó además la experimentación de la aplicación de producción mediante una variante de compilación independiente. El entorno de prototipos comparte código, frameworks y sistema de diseño, pero excluye físicamente el código experimental del binario de producción. Así, diseñadores y colaboradores pueden probar cambios con agentes sin introducir esos cambios en la aplicación que utilizan los usuarios.

El equipo también automatizó pruebas de estrés con desplazamientos intensivos, navegación rápida, exploración aleatoria y cargas repetidas de medios. Según Meta, uno de esos recorridos descubrió un problema de memoria que el agente logró reproducir, aislar y ayudar a corregir antes del lanzamiento; la compañía afirma que el cambio redujo aproximadamente a la mitad el uso de memoria y los fallos de página observados en sesiones repetidas. Forum alcanzó la paridad funcional básica con Facebook Groups en ocho semanas, aunque ese dato procede de la propia empresa y no constituye una comparación independiente.

La lección técnica es más sobria que la promesa de “programar con IA”. El cuello de botella se desplaza desde escribir código hasta verificar que el resultado cumple la intención. Para aprovechar agentes con seguridad, un equipo necesita especificaciones comprobables, herramientas que expongan el estado real, pruebas repetibles, aislamiento de prototipos y una revisión humana rápida porque recibe evidencia estructurada. La velocidad, por sí sola, solo acelera también los errores.
