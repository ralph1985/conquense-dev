---
translationId: go-portable-simd-20260924
lang: es
slug: go-simd-portable-rendimiento-multiplataforma
title: "Go introduce una API SIMD experimental para escribir código vectorizado multiplataforma"
description: "La nueva interfaz `simd` de Go 1.27 intenta acercar el rendimiento de ensamblador a un código legible que pueda ejecutarse en distintas arquitecturas."
publishedAt: 2026-09-24
sourceName: "The Go Blog"
sourceTitle: "Platform-independent SIMD in Go"
sourceUrl: "https://go.dev/blog/simd-experiment"
author: "David Chase y Junyang Shao"
tags: ["go", "simd", "rendimiento", "sistemas", "webassembly"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

El equipo de Go ha explicado la nueva API SIMD experimental incluida en Go 1.27. SIMD, sigla de Single Instruction Multiple Data, permite aplicar una misma operación a varios valores en paralelo. Es una técnica habitual en criptografía, procesamiento de datos, compresión, imágenes y cargas de IA, pero durante años su uso desde Go exigía escribir ensamblador específico para cada arquitectura.

Go 1.26 incorporó una API dependiente de arquitectura para amd64 y Go 1.27 añadió soporte para arm64, incluido NEON, y para las instrucciones SIMD de WebAssembly. Sobre esa base, la nueva interfaz portable `simd` elimina la necesidad de que el código de aplicación conozca el tamaño exacto de los registros vectoriales. La implementación actual cubre AVX, AVX2 y AVX-512 en amd64, NEON en arm64 y SIMD de WebAssembly, además de ofrecer emulación cuando una plataforma no dispone de una implementación nativa compatible.

La decisión de diseño es deliberadamente conservadora. Las arquitecturas no coinciden en el tamaño de sus vectores, en el funcionamiento de las máscaras ni en las operaciones disponibles. En vez de exponer todas las instrucciones particulares, `simd` ofrece un conjunto común de cargas, almacenamientos, aritmética, comparaciones y selección. Algunas operaciones ausentes se emulan mediante otras instrucciones. Así, un mismo algoritmo puede ejecutarse con aceleración nativa cuando existe y continuar funcionando con una ruta de respaldo cuando no existe.

El blog muestra un producto escalar como ejemplo: cargar bloques de `float32`, multiplicarlos y acumularlos con `MulAdd`. La API también permite cargar la parte final de un slice que no encaja exactamente en un vector. Todavía faltan operaciones de reducción como sumar todos los elementos de un vector, prevista para una versión posterior, y otras primitivas más especializadas. Por eso la interfaz no pretende sustituir de inmediato a `archsimd` ni a todo el ensamblador manual.

La implementación interna también es interesante. El compilador genera variantes especializadas para distintos tamaños vectoriales y una ruta de emulación, y eleva el coste de selección fuera de los bucles críticos cuando puede. El equipo tuvo que equilibrar rendimiento, tamaño del ejecutable y presión sobre la caché de instrucciones: añadir una función especializada puede acelerar una asignación, pero demasiadas variantes pueden expulsar código útil de la caché y neutralizar la mejora.

Para los desarrolladores, el beneficio principal es de mantenimiento. Un kernel vectorizado deja de estar necesariamente repartido entre archivos de ensamblador y ramas específicas de CPU. Sin embargo, la API sigue marcada como experimental y requiere `GOEXPERIMENT=simd`. Los proyectos que la prueben deberían comparar resultados y consumo en hardware representativo, verificar la ruta de emulación y aislar el código detrás de una interfaz propia. La lección general es que la portabilidad de rendimiento se consigue definiendo una abstracción pequeña, midiendo sus costes y aceptando que no toda instrucción especializada merece entrar en la API común.
