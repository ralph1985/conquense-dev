---
translationId: retry-storms-error-ownership-20260917
lang: es
slug: uber-reintentos-contexto-error-cascadas
title: "Uber convierte los reintentos en una decisión basada en contexto"
description: "Uber describe una infraestructura compartida que atribuye la propiedad de los errores antes de permitir nuevos reintentos, reduciendo la amplificación de tráfico durante degrad·"
publishedAt: 2026-09-17
sourceName: "Uber Engineering"
sourceTitle: "How Uber Protects Against Retry Storms"
sourceUrl: "https://www.uber.com/us/en/blog/protecting-against-retry-storms/"
author: "Deepanshu Mehndiratta, Alok Srivastava, Vibhor Dhingra y Ankit Srivastava"
tags: ["sistemas-distribuidos", "resiliencia", "microservicios", "observabilidad"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los reintentos suelen presentarse como una protección sencilla frente a fallos transitorios: si una llamada no funciona, se vuelve a intentar. En una arquitectura de microservicios profunda, sin embargo, esa regla puede convertir un fallo localizado en una tormenta de tráfico. Uber ha explicado cómo está abordando el problema con una capa compartida de infraestructura que decide qué servicio tiene la propiedad del error antes de permitir nuevos reintentos.

El riesgo aparece por la amplificación entre niveles. En una cadena lineal de servicios, si cada salto hace un reintento, el número de solicitudes puede crecer de forma exponencial mientras el servicio degradado continúa recibiendo trabajo. Los presupuestos de reintentos reducen la multiplicación, pero no resuelven la pregunta esencial: cuándo un error es recuperable y cuándo solo está propagándose desde más abajo.

La propuesta de Uber separa síntoma y causa. Un servicio que falla porque una dependencia descendente ha fallado no debería presentar automáticamente ese error como propio ante todos sus clientes. En cambio, el servicio que no tiene una dependencia fallida y genera el error sí puede reclamar su propiedad. Esa información se propaga mediante la infraestructura de llamadas y permite que el middleware de reintentos actúe únicamente cerca del origen probable del problema.

Para establecer esa relación, Uber combina su análisis de dependencias con middleware de llamadas. El sistema correlaciona errores de entrada y salida, clasifica las dependencias como fail-close o fail-open y comunica la decisión mediante cabeceras de contexto. Las dependencias fail-close pueden hacer que falle toda la ruta hasta la raíz; las fail-open permiten que el servicio superior continúe. Cuando falta contexto, el primer punto que no puede confirmar la relación limita la propagación, reduciendo el radio de la tormenta.

La arquitectura también evita depender únicamente de trazas distribuidas. Uber señala que muestrear una fracción pequeña de solicitudes puede tardar demasiado en capturar fallos representativos. Su alternativa registra métricas de cada fallo mediante el proxy local Muttley y middleware basado en yarpc. Con esos datos calcula la probabilidad de que un fallo descendente provoque el fallo del llamador: por encima del 80 % clasifica el enlace como fail-close; por debajo del 20 %, como fail-open; entre ambos valores lo mantiene desconocido.

El resultado comunicado por Uber es concreto: durante una degradación de un servicio profundo, el mecanismo habría evitado 9,5 millones de solicitudes espurias. En sus API orientadas al usuario, el radio máximo de una tormenta pasó de 25 niveles a 3, y la media de 20 a 2.

La lección técnica no es eliminar los reintentos, sino hacerlos conscientes de la causalidad. Los presupuestos siguen siendo útiles, pero necesitan señales compartidas, propagación de contexto y una política explícita para los errores ambiguos. También conviene medir los casos de pérdida de contexto y los falsos positivos: una política demasiado agresiva puede suprimir una recuperación legítima. En sistemas distribuidos, la resiliencia depende tanto de saber cuándo insistir como de saber cuándo dejar de golpear una puerta que ya está ardiendo.
