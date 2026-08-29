---
translationId: rust-198-20260820
lang: en
slug: rust-1-98-improves-numeric-performance-and-integer-formatting
title: "Rust 1.98 improves numeric performance and integer formatting"
description: "The new stable Rust release adds algebraic floating-point operations, buffer-based integer formatting, and several stabilized APIs."
publishedAt: 2026-08-20
sourceName: "Rust Blog"
sourceTitle: "Announcing Rust 1.98.0"
sourceUrl: "https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/"
author: "The Rust Release Team"
tags: ["rust", "performance", "compilers", "software engineering"]
readingTime: 3
aiDisclosure: "AI-generated text, reviewed before publication."
---

Rust 1.98.0 is now available as a new stable version of the language. It is not centered on one highly visible feature, but on a set of changes affecting two areas that matter for systems software: numeric optimization and efficient text generation.

The most notable change is the addition of algebraic methods for `f32` and `f64`. Ordinary floating-point operations preserve evaluation order because rounding means they are not associative. By contrast, methods such as `algebraic_add` allow the compiler to reorder selected operations using the algebraic properties of real numbers. This can enable more vectorization and parallelism in numeric loops, in a way similar to the aggressive floating-point optimizations available in other compilers.

The trade-off matters: results may be non-deterministic across optimizations or platforms, although using these methods does not introduce undefined behavior. They therefore fit calculations where performance has priority over bit-for-bit reproducibility. They should not automatically replace ordinary arithmetic in accounting, cryptography, reproducible simulations, or tests that depend on exact results.

The second practical improvement is `format_into`, available on primitive integer types. The method writes a decimal representation into a `NumBuffer` and returns a reference to the text stored in that buffer. By avoiding much of the dynamic dispatch associated with some uses of `write!`, it may reduce work on hot paths such as serializers, protocols, and metrics. The project’s references report performance similar to `itoa`, so some specialized dependencies may no longer be necessary in straightforward code.

The release also stabilizes APIs for working with string ranges and subslices, adds support for several UTF-16 conversion methods, and documents stronger guarantees related to `ManuallyDrop` and `Box`. These are less conspicuous changes, but they reduce the distance between an experimental API and an interface that can be maintained for longer.

For teams, the upgrade deserves a targeted evaluation. New algebraic methods should be measured with real data, and code that depends on reproducible results should be reviewed. In services where number formatting is significant, `format_into` can be compared with the current implementation using project-specific benchmarks. As with any compiler upgrade, validation should cover target platforms, Clippy checks, and integration tests; a possible performance gain is not a substitute for that evidence.
