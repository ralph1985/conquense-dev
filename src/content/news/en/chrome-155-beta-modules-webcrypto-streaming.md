---
translationId: chrome-155-beta-web-platform-20260916
lang: en
slug: chrome-155-beta-modules-webcrypto-streaming
title: "Chrome 155 Beta improves module recovery and expands the web platform toolkit"
description: "The beta adds retries for failed modules, post-quantum cryptographic algorithms, streamed HTML insertion, and additional controls for windows and media"
publishedAt: 2026-09-16
sourceName: "Chrome for Developers"
sourceTitle: "Chrome 155 beta"
sourceUrl: "https://developer.chrome.com/blog/chrome-155-beta"
author: "Rachel Andrew"
tags: ["chrome", "javascript", "browser-apis", "web-platform", "web-performance"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Chrome 155 has entered beta with a set of changes that is more interesting for its architectural implications than for the number of individual features. The release improves recovery from failed JavaScript module loads, expands WebCrypto with post-quantum algorithms, and adds primitives for more coherent and progressive HTML insertion. Because it is a beta, these capabilities should be tested before they become mandatory production dependencies.

The most immediately useful change for distributed applications is the ability to retry a module load that failed. Previously, the browser could retain the failure and make a second import() fail immediately, even when the original problem was an unstable network or a temporary CDN interruption. Chrome 155 enables a manual retry. That creates a stronger strategy for applications that load routes or features on demand: record the failure, apply a bounded retry policy, and provide visible recovery to the user. It does not replace good asset distribution or consistent versioning, but it prevents a transient error from becoming an unrecoverable state inside the tab.

The beta also adds Import Text, a TC39 proposal that allows text to be imported with a module declaration and a type attribute. The aim is to treat selected textual resources as data in the module graph rather than resolving them through bundler-specific loaders. Its value will depend on final interoperability and tool support, but it points toward simpler pipelines for templates, queries, and small static resources that currently require custom transformations.

On the security side, WebCrypto adds ML-KEM, ML-DSA, ChaCha20-Poly1305, and X-Wing. The presence of post-quantum-related algorithms does not mean that an application should automatically change its protocol, nor that every browser supports them. It does provide a way to experiment with hybrid designs and prepare libraries that may need key encapsulation or signatures resilient to future cryptanalytic advances. Any adoption should wait for specifications, compatibility, and expert review; new cryptography is not an appropriate place for improvisation.

Chrome 155 also continues the platform’s work on partial updates and HTML streaming. Positional methods and new streaming methods provide a more consistent model for dynamic insertion, while Trusted Types and sanitizer-related options help keep performance work separate from the risk of injecting untrusted markup. The release adds controls to pause audio in hidden iframes, WebTransport support for request and response headers, and window-management functions such as maximize, minimize, restore, or preventing resizing.

The practical lesson is progressive compatibility. Applications should detect capabilities, keep fallback paths, and test failed modules, streaming, WebCrypto, and permission policies in real browsers. A beta is a useful laboratory for anticipating change, not an invitation to remove existing mechanisms yet.
