---
translationId: cloudflare-tsrs-typescript-rust-20261020
lang: en
slug: tsrs-the-typescript-compiler-looking-for-rust-speed
title: "tsrs: the TypeScript compiler looking for Rust speed"
description: "Cloudflare, VoidZero, and collaborators introduce an experimental Rust port of TypeScript with promising performance and memory improvements."
publishedAt: 2026-10-20
sourceName: "Cloudflare Blog"
sourceTitle: "Introducing tsrs: a Port of TypeScript to Rust"
sourceUrl: "https://blog.cloudflare.com/typescript-rust-port"
author: "Boshen Chen, Dimitri Mitropoulos, and Christoph Nakazawa"
tags: ["typescript", "rust", "javascript", "tooling", "performance"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare, VoidZero, and Max Schwenk have introduced `tsrs`, an experimental Rust port of the TypeScript compiler incubated within the Oxc tooling ecosystem. The project has a focused goal: reduce the time teams spend waiting for type checking and lower the memory footprint of the tools used throughout the daily development cycle.

The first results published by its authors are striking, although they should still be treated as early benchmarks. With the same configuration and the same number of type-checking workers, `tsrs` is up to eight times faster and uses about 70% less memory than TypeScript 7.0. The article also notes that TypeScript 7.1 beta already includes substantial improvements and can be up to 2.5 times faster than TypeScript 7.0. The important comparison, therefore, is not an immediate replacement claim, but evidence that compiler cost has become a first-class optimization target.

The most important technical constraint is also the easiest to overlook: `tsrs` is not trying to redefine the language. It is not a fork intended to change TypeScript’s design. The team wants to follow the original implementation closely and keep the TypeScript team in control of the language’s evolution. That constraint makes the project difficult, because every difference in diagnostics, type resolution, or compiler behavior can become an incompatibility that is expensive to maintain.

The reason to accept that cost is architectural. A smaller and more efficient compiler can make a complete development environment viable where a traditional Node.js process would be too heavy: in a browser through WebAssembly, inside a sandbox for coding agents, on an embedded device, or at the edge. In those environments, memory is not merely a developer-comfort issue; it determines which tools can run together and how expensive it is to keep them available.

The project also proposes an interesting maintenance model. Its maintainers want to track TypeScript changes through automated reviews, compatibility matrices, and regular execution of the reference project’s test suite. The approach resembles Cloudflare’s process for tracking Next.js in Vinext: detect upstream changes, open issues, reproduce differences, and port tests before accepting a divergence.

For frontend teams, the news matters less because an experimental package can be installed today than because of the direction it signals. Toolchain performance, memory use, and portability are becoming part of development architecture. Still, `tsrs` should not be treated as a stable replacement: it still needs to complete capabilities such as LSP and content mappers, reduce behavioral differences, and demonstrate sustained compatibility. The practical lesson is measured: track real type-checking time, watch memory consumption, and distinguish a promising optimization from a production-ready dependency.
