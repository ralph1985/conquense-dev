---
translationId: agentic-ide-extension-traceability-20260911
lang: es
slug: editores-ia-extensiones-suministro-software
title: "Los editores asistidos por IA pueden romper la trazabilidad de las extensiones"
description: "Una investigación de SafeDep muestra que importar extensiones desde Visual Studio Code a Cursor puede instalar la versión más reciente de otro registro, no la versión que el equipo"
publishedAt: 2026-09-11
sourceName: "SafeDep"
sourceTitle: "The Agentic IDE Extension Blind Spot"
sourceUrl: "https://safedep.io/cursor-extension-import-versions/"
author: "Vignesh Naikoti"
tags: ["ciberseguridad", "cadena de suministro", "IDE", "JavaScript"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los equipos que migran de Visual Studio Code a editores asistidos por IA pueden conservar la apariencia de su entorno y perder, sin embargo, una parte importante de su trazabilidad. Una investigación de SafeDep señala que la función de importación de configuración de Cursor copia el identificador de cada extensión, pero no la versión instalada. Después busca ese nombre en el registro que utiliza Cursor y descarga la versión que allí aparece como más reciente.

El problema no es que cada actualización sea maliciosa. El problema es que el resultado deja de estar determinado por el entorno original y por una versión que el equipo haya revisado. Cursor no puede usar el Marketplace de Microsoft para los forks de Visual Studio Code y obtiene muchas extensiones a través de Open VSX, normalmente mediante su propio proxy. Los dos registros pueden tener versiones distintas, editores distintos o ninguna extensión equivalente. Un identificador con formato `publisher.extension` tampoco demuestra por sí solo que el código proceda del mismo propietario en ambos registros.

SafeDep mantuvo deliberadamente tres extensiones en versiones antiguas de Visual Studio Code y repitió la importación en Cursor. Según sus resultados, las tres terminaron en las versiones más recientes disponibles en Open VSX. La investigación también documenta casos en los que extensiones de Microsoft no están disponibles en Open VSX y son sustituidas por extensiones propias de Anysphere. Ese comportamiento puede ser intencionado y legítimo, pero ilustra que el nombre que se solicita no basta para conocer qué código se va a ejecutar.

Las extensiones de un editor tienen capacidades que merecen un tratamiento similar al de una dependencia de aplicación: pueden leer archivos, iniciar procesos y acceder al código fuente, claves de nube o claves SSH disponibles en la máquina. La actualización automática añade una tensión real. Mantenerla activa permite recibir correcciones rápidamente, pero también hace que una nueva versión se ejecute antes de que el equipo pueda revisarla. Desactivarla reduce ese riesgo inmediato, aunque prolonga la permanencia de versiones vulnerables.

La respuesta práctica es recuperar controles conocidos de la cadena de suministro. Tras importar una configuración, conviene comparar las listas y versiones de ambos editores. Para instalaciones reproducibles, Cursor admite especificar una versión con `publisher.extension@version`. Esas versiones deben quedar registradas junto al proyecto o en la documentación del equipo. También puede ser razonable introducir un periodo de espera antes de aceptar actualizaciones, revisar el editor y el registro que realmente sirven el paquete, y limitar las instalaciones a una lista de editores o extensiones aprobados.

La conclusión no es abandonar los IDE asistidos por IA. Es tratar su ecosistema de extensiones como software ejecutable y no como una preferencia visual que se copia sin más. Un flujo de migración que conserva nombres pero pierde versiones puede introducir cambios operativos sin que aparezcan en el diff del repositorio; por eso la identidad, la procedencia y la versión deben formar parte de la revisión.
