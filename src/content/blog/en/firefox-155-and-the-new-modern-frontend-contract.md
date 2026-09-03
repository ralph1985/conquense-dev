---
translationId: tech-2026-09-firefox-155
lang: en
slug: firefox-155-and-the-new-modern-frontend-contract
title: "Firefox 155 expands the modern frontend contract"
description: "The new stable Firefox release adds improvements to CSS, JavaScript modules, WebTransport, and developer tools that directly affect web architecture."
publishedAt: 2026-09-01
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 155 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155"
author: "MDN contributors"
tags: ["javascript", "frontend", "css", "web-apis", "performance"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Firefox 155, released on September 1, collects several small improvements that point toward a web with less incidental JavaScript. It is not a release that requires applications to be rewritten, but it does provide new pieces for simplifying styles, coordinating asynchronous work, and building interactive transports with more control.

The CSS change with the clearest architectural impact is the expansion of `attr()`. The function is no longer limited to `content` and can be used in any property, with types such as lengths, time units, fallback values, and container style queries. A component can receive part of its visual configuration through HTML attributes without a script reading those attributes and converting them into inline styles. That reduces synchronization between DOM state and application state, although teams should still check browser support before removing a fallback.

Firefox also adds `Promise.allKeyed()` and `Promise.allSettledKeyed()`, defined in a TC39 proposal. Unlike the traditional variants, they accept an object and return an object with the same keys. In code that loads independent data sources, this avoids remembering which position corresponds to each result and makes refactoring less fragile. It is still a language proposal, so a shared library should provide a compatibility strategy if it must run in older browsers.

Another less visible change addresses an operational problem: JavaScript, JSON, CSS, and text modules that fail because of a network error or an incorrect MIME type are no longer permanently cached as failed. A dynamic import can recover after the server becomes healthy again. This does not replace retries, timeouts, or observability, but it prevents a transient error from blocking a module for the entire lifetime of the document.

At the network layer, version negotiation allows HTTP/3 to negotiate QUIC v2 on supported systems. Firefox 155 also adds WebTransport send groups, allowing an application to group streams that share bandwidth and establish priorities. That matters for real-time experiences in which telemetry, controls, and primary content compete over the same connection.

The practical lesson is to treat these capabilities as progressive enhancements, not universal requirements. Test them behind capability detection, keep alternative paths, and measure their effect with real users. The value of this release is not limited to new APIs: it also moves browser behavior closer to declarative component models, recoverable network failures, and prioritized transport.
