---
translationId: ai-augmented-aadl-vscode-20260916
lang: es
slug: ia-aadl-vscode-arquitectura-verificable
title: "El SEI integra IA y análisis verificable de arquitectura en VS Code"
description: "Una extensión de AADL conecta agentes de programación con validación semántica, análisis de latencia y resultados trazables para modelar sistemas complejos."
publishedAt: 2026-09-16
sourceName: "Software Engineering Institute"
sourceTitle: "AI-Augmented AADL in Visual Studio Code"
sourceUrl: "https://sei.cmu.edu/blog/ai-augmented-aadl-in-visual-studio-code/"
author: "Colin Dempsey y Lutz Wrage"
tags: ["software-architecture", "applied-ai", "model-based-engineering", "verification", "developer-tools"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

El Software Engineering Institute ha presentado una extensión de Visual Studio Code que lleva herramientas de AADL al entorno habitual de desarrollo y permite conectarlas con herramientas de programación asistida por IA. AADL, estándar de SAE International, sirve para describir componentes de software y hardware, procesadores, memorias, buses, comunicaciones, modos operativos y propiedades que pueden analizarse de forma automatizada.

La propuesta parte de una limitación conocida de los modelos generativos: producir texto que parece válido no demuestra que una arquitectura lo sea. Un modelo puede contener referencias sin resolver, propiedades mal aplicadas, flujos incompletos o supuestos temporales que no significan lo que el autor cree. Por eso, la extensión combina servicios de lenguaje con instanciación y análisis específicos de arquitectura.

La herramienta ofrece diagnósticos sintácticos y semánticos, autocompletado, navegación, documentación contextual, paquetes AADL reutilizables e instanciación de componentes. También permite ejecutar análisis de latencia extremo a extremo, carga de buses y alcanzabilidad de modos, con resultados en formatos como CSV, HTML, DOT o SMV. El conjunto se apoya en componentes de código abierto relacionados con OSATE y puede utilizarse desde VS Code o mediante una interfaz de línea de comandos.

El flujo descrito por el SEI tiene seis pasos. El ingeniero define el objetivo arquitectónico, sus restricciones y los criterios de aceptación. Un agente genera o modifica el modelo AADL. El servidor de lenguaje devuelve diagnósticos específicos, que sirven para corregir referencias, tipos y propiedades. Después, el modelo se instancia y se ejecutan los análisis relevantes. Los informes resultantes alimentan la siguiente decisión de diseño y quedan disponibles para revisión.

Para demostrar el enfoque, los investigadores construyeron un ejemplo de controlador de vuelo con paquetes separados para tipos de datos, hardware, software y despliegue. El modelo incluye sensores, procesadores principal y de respaldo, memoria, buses físicos y virtuales, flujos de control, modos normal y degradado, y límites de latencia. El agente ayudó a generar declaraciones repetitivas, responder a diagnósticos, completar propiedades y mantener instrucciones reproducibles. La validación determinista siguió siendo responsabilidad de las herramientas y de los ingenieros.

La distinción es importante. Que el modelo no produzca diagnósticos significa que cumple las reglas conocidas por el servidor. Que pueda instanciarse indica que la arquitectura declarada es coherente para ese paso. Un resultado de latencia dentro de un límite demuestra que los valores introducidos satisfacen ese cálculo bajo sus supuestos. Ninguna de esas condiciones prueba por sí sola que los requisitos sean correctos, que las mediciones sean reales o que el modelo represente por completo el sistema físico.

La lección aplicable a otros equipos es tratar la IA como parte de un circuito de evidencia, no como autoridad arquitectónica. Los modelos necesitan requisitos explícitos, bibliotecas de dominio, análisis reproducibles, procedencia de los valores y revisión humana. En ese marco, un agente puede acelerar la escritura y la exploración de alternativas sin convertir una salida plausible en una decisión de ingeniería. Es una separación de responsabilidades bastante menos vistosa que la autonomía total, pero considerablemente más defendible.
