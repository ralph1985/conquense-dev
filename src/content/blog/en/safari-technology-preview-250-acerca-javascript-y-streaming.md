---
translationId: webkit-safari-technology-preview-250-resource-management
lang: en
slug: safari-technology-preview-250-acerca-javascript-y-streaming
title: "Safari Technology Preview 250 brings JavaScript closer to resource lifetimes and streaming"
description: "WebKit adds Explicit Resource Management and early ReadableStream upload support in fetch() to Safari Technology Preview 250."
publishedAt: 2026-08-13
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 250"
sourceUrl: "https://webkit.org/blog/18191/release-notes-for-safari-technology-preview-250/"
author: "Jon Davis"
tags: ["JavaScript", "Web APIs", "WebKit", "TypeScript", "streaming"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

WebKit has published Safari Technology Preview 250 with two changes that are particularly relevant to application JavaScript: support for Explicit Resource Management and an initial implementation of ReadableStream-based uploads in fetch(). This is not yet a guarantee of availability in stable Safari, but it is useful evidence for evaluating how browser capabilities are evolving and which abstractions may eventually stop depending on generated compatibility code.

Explicit Resource Management adds `using` and `await using`, together with `Symbol.dispose`, `DisposableStack`, and `AsyncDisposableStack`. The goal is to express in the language itself that a resource must be closed when execution leaves a scope. This fits connections, files, locks, temporary sessions, or any object whose cleanup should not depend on every exit path manually calling a method. In asynchronous code, `await using` can wait for the release of resources that also have asynchronous cleanup work pending.

The architectural consequence is not merely shorter syntax. If a project adopts this pattern, its internal APIs can describe more precisely who owns a resource and how long that ownership lasts. That can reduce leaks and partial states, but it also requires checking target-browser support, transpiler behavior, and interaction with libraries that already use `close`, `dispose`, or custom callbacks. TypeScript has supported transforming these constructs for some time; native engine execution can gradually reduce the cost of that compatibility layer.

The second change concerns `fetch()`: WebKit adds initial support for a request body backed by a `ReadableStream` and for the `duplex` option on `Request`. Together, they allow data to be produced and sent in chunks instead of collecting the entire payload in memory before transmission begins. This can help with large uploads, progressive generation, or integrations that already use streams. An early implementation in a preview release does not remove product-level concerns, however: resumability, server limits, cancellation, retries, and observability still matter.

The practical approach is cautious: test these capabilities in Safari Technology Preview, keep a fallback path, and measure real support before removing a transpiler or custom abstraction. The notes also include Clipboard API, WebAssembly, and Web Inspector improvements, a reminder that platform evolution is not limited to the language. For a team, the value is not adopting every new feature immediately, but identifying which accidental complexity may disappear once interoperability is sufficient.
