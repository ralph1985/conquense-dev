---
translationId: go-archsimd-arm64-wasm-20261002
lang: es
slug: go-abre-simd-arm64-wasm
title: "Go amplía su experimento SIMD a arm64 y WebAssembly"
description: "La API experimental archsimd de Go 1.27 permite aprovechar instrucciones vectoriales en más arquitecturas, incluido WebAssembly."
publishedAt: 2026-10-02
sourceName: "The Go Programming Language"
sourceTitle: "Arch-specific SIMD in Go"
sourceUrl: "https://go.dev/blog/archsimd"
author: "Junyang Shao y David Chase"
tags: ["go", "sistemas", "rendimiento", "webassembly", "simd"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

El equipo de Go ha ampliado en Go 1.27 su experimento SIMD con soporte para arm64 y WebAssembly, además del soporte experimental que ya existía para amd64. La nueva API se encuentra en el paquete `simd/archsimd` y se activa mediante `GOEXPERIMENT=simd`, por lo que todavía debe considerarse una capacidad en evolución y no una interfaz estable para cualquier proyecto de producción.

SIMD, siglas de Single Instruction, Multiple Data, permite aplicar una operación a varios valores almacenados en registros vectoriales. En lugar de procesar una secuencia elemento a elemento, una instrucción puede operar sobre varios enteros o números en coma flotante al mismo tiempo. El beneficio aparece sobre todo en algoritmos con trabajo homogéneo: procesamiento de imágenes, compresión, criptografía, análisis numérico o ciertas cargas de datos.

La propuesta de Go intenta evitar que los usuarios tengan que escribir ensamblador específico para cada procesador. `archsimd` ofrece tipos como `Float32x4`, `Int32x8` o `Uint8x16`, y utiliza métodos con nombres comunes, como `Add`, cuando la operación tiene el mismo significado en distintas arquitecturas. Cuando las instrucciones difieren en su comportamiento, la API conserva nombres distintos para hacer visibles esas diferencias. Esa decisión es importante: esconder demasiado el hardware puede producir código aparentemente portable con errores sutiles en los casos límite.

El soporte actual cubre AVX, AVX2 y parte de AVX-512 en amd64, NEON en arm64 y SIMD de 128 bits en WebAssembly. La expansión a WebAssembly resulta especialmente interesante para servicios que comparten lógica entre servidor y navegador, aunque el código debe seguir comprobando la disponibilidad de las capacidades y medir el coste de la transferencia de datos. Vectorizar una función pequeña no garantiza una mejora si las cargas y descargas desde memoria dominan el tiempo total.

El propio diseño contiene una advertencia práctica. Los vectores SIMD ocupan entre 16 y 64 bytes, y las estructuras compuestas grandes pueden acabar en memoria en vez de permanecer en registros debido a limitaciones actuales del ABI y del backend SSA de Go. En bucles críticos conviene evitar envolver vectores en arrays o estructuras grandes hasta que esas optimizaciones estén resueltas.

La noticia importa menos como una invitación a vectorizar todo que como una señal de madurez del ecosistema. Go está intentando ofrecer una ruta progresiva: una API más general para operaciones comunes y una capa específica para instrucciones excepcionales. El siguiente trabajo previsto incluye SVE y SVE2 en arm64, además de arquitecturas como RISC-V, Power y s390x. Para los equipos, la lección es conocida pero útil: el rendimiento portable exige feature detection, benchmarks por arquitectura y una ruta escalar de respaldo.

Contenido generado automáticamente con IA.
