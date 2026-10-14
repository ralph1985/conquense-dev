---
translationId: go-archsimd-arm64-wasm-20261002
lang: en
slug: go-expands-simd-to-arm64-wasm
title: "Go expands its SIMD experiment to arm64 and WebAssembly"
description: "Go 1.27’s experimental archsimd API brings vector instructions to more architectures, including arm64 and WebAssembly."
publishedAt: 2026-10-02
sourceName: "The Go Programming Language"
sourceTitle: "Arch-specific SIMD in Go"
sourceUrl: "https://go.dev/blog/archsimd"
author: "Junyang Shao and David Chase"
tags: ["go", "systems", "performance", "webassembly", "simd"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

The Go team has expanded its SIMD experiment in Go 1.27 with support for arm64 and WebAssembly, alongside the experimental amd64 support that was already available. The new API lives in the `simd/archsimd` package and is enabled with `GOEXPERIMENT=simd`, so it should still be treated as an evolving capability rather than a stable interface for every production system.

SIMD, short for Single Instruction, Multiple Data, applies one operation to several values stored in vector registers. Instead of processing a sequence one element at a time, a single instruction can operate on multiple integers or floating-point values in parallel. The benefit is most visible in workloads with uniform computation: image processing, compression, cryptography, numerical analysis, and some data-processing pipelines.

Go’s proposal aims to remove the need for developers to write architecture-specific assembly for every processor. `archsimd` provides types such as `Float32x4`, `Int32x8`, and `Uint8x16`, using common method names such as `Add` when an operation has the same meaning across architectures. When instructions differ in their edge-case behavior, the API keeps distinct names to make those differences explicit. That choice matters: hiding too much hardware detail can produce apparently portable code with subtle boundary errors.

Current support covers AVX, AVX2, and parts of AVX-512 on amd64, NEON on arm64, and 128-bit WebAssembly SIMD. WebAssembly support is particularly relevant for services that share logic between servers and browsers, although applications still need capability checks and measurements for data-transfer costs. Vectorizing a small function does not guarantee an improvement if moving values to and from memory dominates the total runtime.

The design also includes a practical warning. SIMD vectors occupy between 16 and 64 bytes, and large composite values may be placed in memory rather than kept in registers because of current limitations in Go’s ABI and SSA backend. In hot loops, developers should avoid wrapping vectors in large arrays or structs until those optimizations are available.

The significance of this update is less that every Go program should now be vectorized and more that the ecosystem is building a gradual path toward portable low-level performance: a general API for common operations and an architecture-specific layer for exceptional instructions. Planned work includes SVE and SVE2 on arm64, as well as architectures such as RISC-V, Power, and s390x. The practical lesson for teams is familiar but valuable: portable performance requires feature detection, architecture-specific benchmarks, and a scalar fallback path.

AI-generated content.
