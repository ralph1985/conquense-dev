---
translationId: google-toolgrad-tool-use-data-20260910
lang: es
slug: google-toolgrad-genera-primero-las-cadenas-de-herramientas-para-entrenar-agentes
title: "Google genera primero las cadenas de herramientas para entrenar mejores agentes"
description: "ToolGrad invierte el flujo habitual de creación de datos sintéticos y construye primero una secuencia válida de llamadas a API antes de redactar la petición del usuario."
publishedAt: 2026-09-10
sourceName: "Google Research"
sourceTitle: "ToolGrad: Efficient tool-use dataset generation with textual gradients"
sourceUrl: "https://www.research.google/blog/toolgrad-efficient-tool-use-dataset-generation-with-textual-gradients/"
author: "Zhongyi Zhou y Ruofei Du"
tags: ["applied-ai", "agents", "tool-use", "machine-learning"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Research ha presentado ToolGrad, un método para generar datos de entrenamiento de agentes que usan herramientas. Su idea central invierte el orden habitual: en lugar de inventar primero una petición de usuario y pedir a otro agente que descubra mediante ensayo y error cómo resolverla, ToolGrad construye primero una cadena válida de llamadas a API y redacta después la petición que esa cadena debe satisfacer.

El cambio aborda un cuello de botella conocido. Los conjuntos de datos de uso de herramientas necesitan ejemplos que relacionen una intención con una secuencia ejecutable de llamadas. El enfoque query-first puede desperdiciar mucho trabajo: una instrucción generada puede ser ambigua o imposible y el agente de búsqueda debe recorrer alternativas hasta encontrar una solución. ToolGrad parte de una solución explícita, por lo que la anotación de la intención resulta más directa y requiere un único paso de modelo para asociar la consulta y la respuesta.

El sistema organiza el proceso en cuatro módulos. El API Proposer selecciona candidatos para ampliar el flujo actual. Los API Executors prueban en paralelo las llamadas elegidas y producen informes de ejecución. El API Selector revisa esos informes, conserva la mejor llamada y la añade a la cadena. Por último, el LLM Updater reescribe la consulta y la respuesta para que encajen con el conjunto de APIs acumulado. El ciclo se repite hasta producir una muestra con una petición, un flujo verificado y una respuesta final.

ToolGrad toma de TextGrad la idea de los gradientes textuales: un crítico describe en lenguaje natural qué debe mejorarse y esa señal orienta la siguiente iteración. Aquí no se optimiza solo un prompt estático, sino una secuencia de operaciones que puede hacerse más larga y compleja. En los experimentos, Google usó la base de ToolBench, con más de 16.000 APIs, y comunicó una tasa de paso del 99,8 % para la generación frente a un enfoque de búsqueda anterior.

El equipo también generó ToolGrad-500 y ajustó modelos Gemma 3 de 1.000, 4.000 y 12.000 millones de parámetros. En el Berkeley Function Calling Leaderboard, el modelo de 12.000 millones obtuvo 83,1 puntos, una cifra cercana a Gemini 2.5 Pro con 83,2 y Claude 4.5 Opus con 82,8, y superior a la puntuación publicada para GPT-5, 74,4. Son resultados reportados por Google y dependen del conjunto, el ajuste y la configuración de evaluación.

La lección técnica es que la calidad del dato puede ser tan importante como el tamaño del modelo. Una cadena que se ejecuta correctamente ofrece una señal más verificable que una intención vaga seguida de exploración costosa. Aun así, el método no elimina los problemas de producción: las APIs cambian, las herramientas tienen permisos y efectos laterales, y un flujo sintético no garantiza que un agente gestione bien errores, límites o decisiones ambiguas. ToolGrad mejora la fabricación del material de entrenamiento; la fiabilidad operativa sigue requiriendo contratos, pruebas y observabilidad.
