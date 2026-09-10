---
translationId: turbopack-chunking-2026-09-03
lang: en
slug: turbopack-javascript-chunking-navigation-performance
title: "Turbopack rethinks JavaScript chunking around navigation data"
description: "Next.js explains how Turbopack balances transferred bytes, request count, caching, and navigation when deciding which modules to share."
publishedAt: 2026-09-03
sourceName: "Next.js"
sourceTitle: "How Turbopack chunks your JavaScript"
sourceUrl: "https://nextjs.org/blog/turbopack-chunking"
author: "Sam Poder"
tags: ["turbopack", "nextjs", "javascript", "web-performance", "bundling"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

JavaScript chunking is often presented as a choice between one large bundle and many small files. A new technical explanation from Next.js shows that the real problem is less tidy: each strategy optimizes a different combination of initial loading, cache reuse, request count, and later navigation. There is no ideal chunk size independent of how users move through an application.

The article compares three extremes using the Next.js website itself. One chunk contains all 355 modules in 1.09 MB and favors cross-page caching, but it forces simple routes to download unnecessary code. One chunk per page reduces over-shipping, although shared modules are duplicated. One chunk per module preserves fine-grained reuse, but creates 355 requests and increases network and compression overhead. HTTP/2 makes requests cheaper, but it does not remove headers, coordination costs, or the compression opportunities lost when files become too small.

Turbopack’s solution relies on chunk groups: units that load together for a route or flow. The bundler can merge modules within the same group without adding code that the navigation already needed. In the published measurement, the default configuration reduces total requests from 96 to 38 compared with no merging, while transferring slightly less JavaScript. Merging everything lowers requests to 15, but increases total downloaded code by 10% across the complete journey. The outcome depends on whether a session ends on the first page or continues navigating.

Next.js 16.3 adds a response to information the build cannot know: what the browser has already cached. With `experimental.turbopackChunking.generateComponentChunks`, Turbopack emits both merged chunks and component-level versions. At runtime it can choose the complete file or only the missing pieces, avoiding another download of a shared module during a soft navigation.

There are also options for replacing general assumptions with site data: weighting the probability of a bounce, prioritizing critical routes, and declaring clusters of pages that users commonly visit together. The team is also experimenting with CommonJS tree-shaking, a shared runtime, and deferred loading for WebAssembly and Web Worker code.

The lesson for any frontend application is methodological. A bundle should be evaluated alongside real routes, sessions, and cache behavior, not only by its size on disk. Navigation metrics can justify a different bundling strategy and prevent optimizations that improve the first click while making the rest of the visit more expensive.
