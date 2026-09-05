---
translationId: 20260905-github-copilot-coste-por-tarea
lang: es
slug: github-copilot-optimiza-el-coste-de-los-agentes-por-tarea
title: "GitHub demuestra que optimizar agentes de código exige medir la tarea completa"
description: "GitHub comparte cómo Copilot reduce costes eliminando trabajo redundante sin recortar el contexto que los agentes necesitan para terminar correctamente."
publishedAt: 2026-09-02
sourceName: "GitHub Blog"
sourceTitle: "How we make AI coding more cost efficient without sacrificing task quality"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/how-we-make-ai-coding-more-cost-efficient-without-sacrificing-task-quality/"
author: "Erik Kristensen y Napalys Klicius"
tags: ["IA aplicada", "agentes de código", "ingeniería de software", "optimización", "testing"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha publicado una explicación detallada de cómo está reduciendo el coste de Copilot sin perseguir una métrica engañosa: el número de tokens de cada llamada individual. La idea central es sencilla y aplicable a cualquier agente de programación: una respuesta más corta no es necesariamente más eficiente si obliga al modelo a repetir comandos, recuperar información o mantener más turnos de contexto.

El ejemplo más claro aparece en la salida de terminal. GitHub probó una herramienta que recortaba las respuestas del shell y observó que, cuando desaparecía información útil, el agente volvía a abrir la salida original o ejecutaba de nuevo el comando. El ahorro local se convertía en más llamadas y más tiempo para completar la tarea. Por eso Copilot clasifica ahora las respuestas: conserva sin cambios la salida parecida al código, como `git diff` o `git show`; reorganiza los resultados de búsqueda sin eliminar coincidencias; y comprime selectivamente el ruido repetitivo de instalaciones, compilaciones y pruebas. La salida completa sigue disponible mediante una vía explícita de recuperación.

El equipo también eliminó los números de línea que acompañaban a cada archivo leído. Las herramientas actuales de edición ya no los necesitan y el formato solo añadía tokens repetidos. Según GitHub, la modificación redujo aproximadamente un 5 % el coste de inferencia en evaluaciones offline y cerca de un 3 % el coste medio diario por usuario en una prueba online, sin regresiones materiales en calidad.

La parte más instructiva afecta a los prompts. Un proceso de compresión redujo aproximadamente a la mitad las instrucciones de una herramienta que lanza agentes especializados. Sin embargo, una prueba online descubrió que la redacción resultante hacía que agentes independientes trabajaran en serie en vez de hacerlo en paralelo. GitHub detuvo el experimento, escribió una evaluación de regresión para ese comportamiento y corrigió la instrucción. La versión final eliminó unos 1.300 tokens por turno, pero solo después de demostrar que conservaba la intención operativa.

También se redujeron turnos innecesarios en trabajos ejecutados en segundo plano. Cuando terminan un comando o un subagente, el sistema entrega ahora el resultado directamente y agrupa notificaciones relacionadas, en lugar de despertar al modelo para que solicite información que ya estaba disponible.

La lección técnica no es comprimir todo. Es optimizar el resultado de extremo a extremo, preservar información semánticamente valiosa y convertir los comportamientos importantes en pruebas. En agentes de código, la eficiencia pertenece al arnés de ejecución tanto como al modelo: los formatos, los reintentos, la recuperación y la orquestación pueden determinar el coste y la calidad final.
