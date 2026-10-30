---
translationId: bazel-persistent-test-runners-20261027
lang: es
slug: bazel-prueba-ejecutores-persistentes-reducen-tiempo-tests
title: "Bazel explora ejecutores persistentes para reducir el tiempo de las pruebas"
description: "Una nueva propuesta para Bazel reutiliza procesos de prueba de larga duración y reduce un 46 % el tiempo de ejecución en las pruebas Java del propio proyecto."
publishedAt: 2026-10-27
sourceName: "EngFlow Blog"
sourceTitle: "Persistent Test Runners: How Persistent Workers for Tests Can Cut Test Times by 46%"
sourceUrl: "https://blog.engflow.com/2026/10/27/persistent-test-runners-how-persistent-workers-for-tests-can-cut-test-times-by-46/"
author: "John Cater"
tags: ["testing", "bazel", "integración continua", "rendimiento", "herramientas de desarrollo"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Bazel lleva años utilizando trabajadores persistentes para acelerar la compilación. Una propuesta presentada por EngFlow en el contexto de BazelCon 2026 aplica la misma idea a la ejecución de pruebas: mantener vivo un proceso preparado y reutilizarlo entre varios casos, en lugar de pagar el coste de arranque cada vez.

Ese coste puede incluir `fork` y `exec`, la inicialización de una máquina virtual de Java, la creación de fixtures pesadas, la descarga de imágenes de contenedor o la puesta en marcha de emuladores. En suites grandes, muchas pruebas individuales son cortas, de modo que el arranque representa una parte importante del tiempo total. Un proceso persistente también puede conservar cachés de compilación JIT y dependencias ya cargadas.

La propuesta intenta resolver un problema que hizo fracasar una implementación anterior. Reutilizar una JVM no consiste únicamente en dejarla abierta: los cambios de classpath pueden dejar clases obsoletas, las dependencias compartidas pueden mezclar el runner con el código probado y el estado global debe aislarse entre ejecuciones. Limpiar correctamente una JVM requiere mecanismos complejos de carga de clases y una disciplina estricta para eliminar efectos residuales.

La nueva API, denominada `PersistentTestInfo`, conecta dos modelos que Bazel mantenía separados. La API de pruebas describe cómo se ejecuta una prueba y cómo se comunican su resultado, sus logs y su configuración. La API de workers describe acciones que pueden ejecutarse en modo persistente, incluyendo el protocolo, los requisitos de ejecución y el posible multiplexado. Con `PersistentTestInfo`, una regla puede declarar cómo participar en ese modelo sin depender de que la prueba sea una regla nativa integrada en Bazel.

El prototipo se evaluó con 46 objetivos de prueba Java del propio Bazel, ejecutados cuatro veces. La mediana del tiempo total pasó de 36,5 minutos con la estrategia local a 19,6 minutos con el worker persistente: una reducción del 46 % y una aceleración aproximada de 1,9 veces. Treinta y cinco objetivos fueron más rápidos. Los once restantes fueron más lentos y correspondían a pruebas cortas, de menos de 14 segundos, en parte porque escanear el classpath desde una JVM persistente puede costar más que iniciar un proceso aislado.

El resultado todavía no es una funcionalidad lista para producción. La propuesta está en desarrollo y las APIs pueden cambiar durante su revisión. Su interés técnico está en otro punto: acelerar el feedback exige controlar el ciclo de vida, la invalidación y el aislamiento, no solo reutilizar procesos. La misma cautela se aplica a runners de JavaScript, navegadores o contenedores. Mantener un entorno caliente puede reducir latencia, pero solo es una mejora sostenible si cada prueba conserva un estado reproducible y no hereda residuos de la anterior.
