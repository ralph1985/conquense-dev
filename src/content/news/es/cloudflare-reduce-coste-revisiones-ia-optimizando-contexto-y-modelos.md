---
translationId: cloudflare-optimizacion-inferencia-revisiones-20261019
lang: es
slug: cloudflare-reduce-coste-revisiones-ia-optimizando-contexto-y-modelos
title: "Cloudflare reduce un 68 % el coste de sus revisiones de código con optimización del contexto"
description: "La experiencia muestra que el coste de los agentes de revisión depende tanto de la arquitectura del contexto y el número de llamadas como del modelo elegido."
publishedAt: 2026-10-19
sourceName: "Cloudflare Blog"
sourceTitle: "Cutting our inference bill by 68% by being obsessive about optimization"
sourceUrl: "https://blog.cloudflare.com/obsessive-inference-optimization/"
author: "Ryan Skidmore"
tags: ["inteligencia artificial", "agentes", "revisión de código", "rendimiento", "optimización de costes"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha publicado un análisis poco habitual sobre el coste real de operar un revisor de código basado en agentes. El sistema había pasado de costar una media de 1,19 dólares por revisión en abril a unos 2,43 dólares durante sus semanas más caras de agosto. Tras varias semanas de instrumentación y experimentos, el coste medio bajó a 0,77 dólares, mientras que la mediana de duración cayó de 4 minutos y 9 segundos a 1 minuto y 32 segundos.

La parte más interesante no fue cambiar simplemente a un modelo más barato. Cloudflare descubrió que el revisor hacía una media de 16,6 llamadas al modelo por revisión y escribía unos 72.000 tokens en caché para después leer 1,08 millones. Aunque la tasa global de aciertos de caché había aumentado hasta el 97 %, el sistema estaba procesando mucho más contexto. El problema principal era que una gran parte del prompt inicial, idéntica entre repositorios, no podía reutilizarse entre sesiones.

La solución consistió en separar el prefijo compartido del prompt mediante un punto de caché estable. El equipo eliminó del principio del mensaje los datos específicos del repositorio y consiguió que las primeras solicitudes encontraran ese prefijo en entre el 91 % y el 99,5 % de los casos, frente a solo un 14-26 % antes. También incorporó índices de referencia directamente en el prompt del revisor de estándares, eliminó herramientas que algunos subagentes no podían usar, paralelizó lecturas de archivos y evitó ejecutar revisores que no tenían cambios relevantes en las revisiones posteriores.

El trabajo incluyó además una comparación en modo sombra antes de sustituir la versión anterior del sistema. Ambas versiones coincidieron en la decisión de aprobación en el 98 % de las solicitudes analizadas. Después, Cloudflare probó distintas combinaciones de modelos y niveles de esfuerzo. Un modelo más reciente redujo las llamadas y mantuvo aproximadamente el mismo número de hallazgos relevantes en algunas categorías, aunque el resultado dependió del tipo de revisión. En el análisis de calidad, el nivel de esfuerzo alto costaba más, pero recuperaba hallazgos importantes que se perdían con el nivel medio.

La lección técnica no es que la caché de prompts resuelva por sí sola el coste de los agentes. Es que un sistema de inferencia debe medirse como cualquier otro servicio: llamadas, tamaño y estabilidad del contexto, latencia, calidad y coste por resultado. Cloudflare también advierte de que sus comparaciones no constituyen un experimento estadístico perfecto y que parte de las ventanas analizadas fue corta. Aun así, el caso ofrece una pauta práctica para equipos que integran IA en CI: antes de cambiar de proveedor, hay que observar qué información se envía repetidamente, qué pasos pueden eliminarse y si la reducción de tokens conserva el valor de la revisión.
