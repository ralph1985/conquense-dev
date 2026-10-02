---
translationId: go-portable-simd-20260924
lang: en
slug: go-portable-simd-cross-platform-performance
title: "Go introduces an experimental portable SIMD API for cross-platform vectorization"
description: "Go 1.27’s new `simd` interface aims to bring near-assembly performance closer to readable code that can run across different architectures."
publishedAt: 2026-09-24
sourceName: "The Go Blog"
sourceTitle: "Platform-independent SIMD in Go"
sourceUrl: "https://go.dev/blog/simd-experiment"
author: "David Chase and Junyang Shao"
tags: ["go", "simd", "performance", "systems", "webassembly"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

The Go team has described the new experimental SIMD API included in Go 1.27. SIMD, short for Single Instruction Multiple Data, applies one operation to several values in parallel. The technique is common in cryptography, data processing, compression, imaging, and AI workloads, but using it from Go previously required architecture-specific assembly.

Go 1.26 introduced an architecture-dependent API for amd64, while Go 1.27 added support for arm64, including NEON, and for WebAssembly SIMD instructions. On top of that foundation, the new portable `simd` interface removes the need for application code to know the exact size of vector registers. The current implementation supports AVX, AVX2, and AVX-512 on amd64, NEON on arm64, and WebAssembly SIMD, while also providing emulation when a platform lacks a compatible native implementation.

The design is deliberately conservative. Architectures differ in vector width, mask behavior, and available operations. Instead of exposing every platform-specific instruction, `simd` provides a common set of loads, stores, arithmetic operations, comparisons, and selection. Some missing operations are emulated with other instructions. As a result, one algorithm can use native acceleration where available and still run through a fallback path elsewhere.

The blog demonstrates a dot product by loading blocks of `float32` values, multiplying them, and accumulating them with `MulAdd`. The API can also load the remaining part of a slice when its length does not fit an exact vector. Reduction operations such as summing every element of a vector are not yet included and are planned for a later release, along with other specialized primitives. The interface is therefore not intended to immediately replace `archsimd` or all hand-written assembly.

The internal implementation is also notable. The compiler generates specialized variants for different vector widths together with an emulation path, and it can move dispatch overhead out of critical loops. The team had to balance performance, executable size, and instruction-cache pressure: adding a specialized function can speed up an allocation, but too many variants can evict useful code from the cache and cancel the improvement.

For developers, the main benefit is maintainability. A vectorized kernel no longer has to be split across assembly files and CPU-specific branches. The API is still experimental and requires `GOEXPERIMENT=simd`, however. Projects testing it should compare output and resource use on representative hardware, verify the emulation path, and isolate the code behind their own interface. The broader lesson is that portable performance comes from defining a small abstraction, measuring its costs, and accepting that not every specialized instruction belongs in the shared API.
