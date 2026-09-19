---
translationId: netflix-conductor-4-workflow-scale-20260821
lang: es
slug: netflix-conductor-4-escala-orquestacion-workflows
title: "Netflix rediseña Conductor para workflows diez veces más grandes"
description: "La nueva arquitectura separa metadatos y tareas, elimina bloqueos costosos y reduce la latencia p99 al escalar la orquestación distribuida."
publishedAt: 2026-08-21
sourceName: "Netflix Technology Blog"
sourceTitle: "Netflix Conductor: The Next Chapter"
sourceUrl: "https://netflixtechblog.medium.com/netflix-conductor-the-next-chapter-41ad21067649"
author: "Aravindan Ramkumar, en nombre del equipo de Conductor"
tags: ["distributed-systems", "workflow-orchestration", "scalability", "java"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Netflix ha explicado la evolución interna de Conductor, su motor de orquestación de workflows para coordinar microservicios y procesos empresariales de larga duración. La plataforma respalda aproximadamente 200.000 definiciones de workflow pertenecientes a unas 150 aplicaciones y ejecuta alrededor de 420 millones de workflows al mes. Se utiliza en producción de contenidos, publicidad, juegos y procesos de datos.

La escala obligó a revisar casi todas las capas del sistema. La primera generación dependía de Dynomite y DynoQueues, con Elasticsearch para indexación. Con el crecimiento, Netflix trasladó los datos de ejecución a Cassandra, descargó las entradas y salidas grandes en Amazon S3 y sustituyó la cola anterior por Timestone, un sistema propio de alto rendimiento. La indexación se desacopló del camino crítico mediante Kafka, permitiendo que el indexador creciera de forma independiente y escribiera en Elasticsearch.

El cuello de botella que quedaba estaba en el evaluador. Las versiones anteriores cargaban en memoria todo el estado de un workflow para decidir cuál era la siguiente tarea. Además, los metadatos, las tareas y los datos de usuario convivían en la misma partición de Cassandra. Ese diseño aumentaba la presión de memoria, producía filas muy grandes y complicaba las actualizaciones concurrentes.

Conductor 4.0 separa el metadato del workflow de los datos de cada tarea y asigna a cada tarea su propio registro. El evaluador trabaja con un blueprint ligero y recupera solo los datos necesarios para tomar la siguiente decisión. Según Netflix, el límite práctico pasó de unos 2.500 a 30.000 tareas por workflow, mientras que la latencia p99 de evaluación se redujo aproximadamente un 40% en producción.

El rediseño también cambia la coordinación del estado. En lugar de depender de bloqueos para serializar todas las escrituras, las tareas pendientes y las tareas terminales se almacenan en particiones distintas. Al leer, la aplicación reconcilia ambos estados aplicando una regla sencilla: un estado terminal, como COMPLETED o FAILED, siempre prevalece sobre uno no terminal. Así, una actualización tardía que marque una tarea como activa no puede revertir una finalización ya registrada.

La evaluación se mueve además fuera de la ruta síncrona y se procesa mediante colas exclusivas que permiten avanzar los workflows de forma secuencial. Netflix afirma que los fallos de adquisición de bloqueos, que habían llegado a unos 2.700 por intervalo durante periodos de contención, cayeron prácticamente a cero. La plataforma añade controles nativos de concurrencia, asignación dinámica de workers y un SDK de Java con tipado para definir workflows.

El interés de este caso no está en copiar una arquitectura de Netflix, sino en observar el patrón de evolución. Cuando un sistema distribuido crece, la optimización local deja de ser suficiente: hay que separar el camino crítico, reducir el estado que cada decisión necesita y convertir las garantías de consistencia en reglas explícitas. También conviene medir los límites reales del workflow, no solo la velocidad media. La latencia p99, la contención y el tamaño máximo son señales de diseño, no simples métricas operativas.
