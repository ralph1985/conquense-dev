---
translationId: jpeg-xl-chrome-rust-decoder-web-performance-20261006
lang: en
slug: jpeg-xl-chrome-rust-decoder-web-performance-20261006
title: "JPEG XL reaches Chrome with a lesson in performance and security"
description: "Chrome 155 adds JPEG XL decoding through a component written primarily in Rust. The change combines compression, HDR, SIMD, and memory safety, but does not make other image formats"
publishedAt: 2026-10-06
sourceName: "Chrome for Developers"
sourceTitle: "Shipping JPEG XL in Chrome"
sourceUrl: "https://developer.chrome.com/blog/jpeg-xl-in-chrome"
author: "Luca Versari, Moritz Firsching and Philip Jägenstedt"
tags: ["jpeg-xl", "chrome", "rust", "web-performance", "security"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Chrome 155 adds decoding support for JPEG XL, an image format designed to preserve more visual information with fewer bytes. Chrome’s announcement presents its main advantage for high-fidelity photography: the format offers, according to the team, 30% to 50% better compression than JPEG, as well as lossless compression, built-in HDR, lossless JPEG transcoding, and more flexible progressive decoding.

The news matters less because another image extension has appeared than because of how the support was built. Chrome integrates `jxl-rs`, a decoder implementation written in Rust. Decoders process complex binary data received from the network and therefore form a particularly sensitive attack surface. The browser sandbox remains an important barrier, but the team treats memory safety as an earlier defense: reduce the risks of out-of-bounds reads, heap overflows, and use-after-free errors inside the component itself.

The challenge was to avoid paying for that safety with an unacceptable performance cost. The work uses SIMD abstractions to take advantage of processor-specific instructions without unnecessarily expanding `unsafe` code. It also aims to reduce data copies and maintain an efficient processing pipeline across image-region boundaries. This is a relevant choice for any multimedia library: the useful comparison is not Rust versus C++, but memory safety, CPU usage, memory consumption, and latency on real devices.

Chrome says the implementation has been subjected to fuzzing, AI-assisted review, and performance testing across different platforms. That does not prove that the decoder is invulnerable, but it does show a sensible strategy: combine a memory-safe language, isolation, automated testing, and continuous measurement. No single layer replaces the others.

For web teams, the immediate consequence is not to migrate every image to `.jxl`. The announcement itself recommends evaluating JPEG XL and AVIF according to the use case. Cross-browser support, decoding costs, and the need to retain a fallback will remain part of the decision. A cautious implementation could experiment with original photographs, HDR images, or assets where lossless compression has clear value, using content negotiation and `picture` with alternative formats.

The broader lesson is that web performance does not end with file size. An efficient format also needs a decoder that is fast, safe, and testable. JPEG XL’s arrival in Chrome turns that discussion into a concrete test for the entire chain: asset generation, format selection, delivery, decoding, and observability across diverse devices.
