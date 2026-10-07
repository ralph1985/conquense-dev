---
translationId: uber-feature-logging-training-serving-consistency-20260922
lang: es
slug: uber-feature-logging-consistencia-entrenamiento-inferencia-20260922
title: "Uber usa el registro de características para cerrar la brecha entre entrenamiento e inferencia"
description: "El sistema de Uber Eats registra las características que realmente consume cada modelo y las reutiliza como fuente canónica de entrenamiento, reduciendo deriva, coste y latencia de"
publishedAt: 2026-09-22
sourceName: "Uber Engineering"
sourceTitle: "Taming the ML Firehose: Scaling Feature Consistency"
sourceUrl: "https://www.uber.com/us/en/blog/taming-ml-firehose/"
author: "Paarth Chothani, Chirag Agrawal y Amrith M."
tags: ["machine-learning", "data-platforms", "distributed-systems", "kafka", "flink"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los modelos de recomendación no solo dependen de su arquitectura. También dependen de que las características que reciben durante la inferencia sean comparables con las que utilizaron durante el entrenamiento. Uber ha descrito cómo su plataforma de recomendaciones de Uber Eats abordó esa diferencia mediante un sistema de registro de características, una técnica orientada a hacer de los valores servidos en producción la fuente canónica para el siguiente ciclo de entrenamiento.

El problema aparecía en detalles aparentemente menores. Una canalización podía representar un idioma como en-US mientras otra usaba en, o producir jp_JA frente a jp-JA. El modelo aprendía categorías que después no aparecían durante el servicio. La predicción podía seguir funcionando sin un error visible, pero la distribución de las entradas cambiaba y el rendimiento se degradaba. Uber también tenía que lidiar con linajes ETL frágiles, particiones ausentes y retrasos de varios días hasta que los cambios de producción llegaban a los datos de entrenamiento.

La propuesta consiste en registrar, durante la inferencia, los valores exactos que el modelo ha consumido. Esos datos se publican mediante Kafka y se combinan con los eventos de impresión que llegan desde el cliente. Flink realiza la unión dentro de una ventana temporal: conserva las predicciones solo el tiempo necesario para asociarlas con las recomendaciones que realmente vio una persona. El registro resultante contiene las características servidas y el resultado observado, por lo que evita volver a calcularlas mediante costosas uniones offline.

El volumen hacía inviable guardar todo. Uber menciona tráfico de hasta ocho millones de predicciones por segundo y estima que registrar todas las características podría alcanzar cientos de miles de millones de filas diarias, aproximadamente 1,7 petabytes por día. La respuesta fue seleccionar qué registrar. Una lista de permitidos limita el conjunto a las características que el modelo utiliza, reduciendo el tamaño de la carga entre cuatro y cinco veces. Los nombres descriptivos se codifican como identificadores enteros deterministas y solo se conservan candidatos que llegan a la pantalla del usuario, en lugar de almacenar todo el universo puntuado.

La operación de Flink necesitó más que añadir máquinas. Uber perfiló operadores individuales y asignó paralelismo distinto a las fases de preunión y unión. También tuvo que sustituir una estrategia de checkpoints que hacía crecer el estado de RocksDB hasta más de 12 terabytes por hora. La solución redujo el estado a metadatos esenciales, expulsó registros después de completar las uniones y deduplicó entradas. Métricas detalladas, validaciones deterministas, alertas como código y pruebas con una configuración parecida a producción completaron el sistema.

Según Uber, las características problemáticas pasaron de tasas de desajuste superiores al 10% a un 0% en los casos clave, mientras que algunos acuerdos de frescura bajaron de días a horas. El aprendizaje general es útil fuera del aprendizaje automático: la consistencia no se garantiza porque dos equipos compartan un esquema. Hay que observar los valores reales que atraviesan el sistema, conservar la evidencia necesaria y diseñar el registro con límites de coste, selección y retención desde el principio.
