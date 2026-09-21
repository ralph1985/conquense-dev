---
translationId: safari-27-quality-and-web-testing-20260917
lang: en
slug: safari-27-prioritizes-quality-and-connects-agents-to-the-browser
title: "Safari 27 turns browser quality into a development tool"
description: "Safari’s new release combines a local MCP server for coding agents with deep WebKit improvements across forms, scrolling, JavaScript modules, browser APIs, and web testing."
publishedAt: 2026-09-17
sourceName: "WebKit"
sourceTitle: "WebKit Features for Safari 27.0"
sourceUrl: "https://webkit.org/blog/18325/webkit-features-for-safari-27-0/"
author: "Jen Simmons, Saron Yitbarek, Tim Nguyen, Antoine Quint, and other WebKit contributors"
tags: ["webkit", "safari", "browser-apis", "web-testing", "accessibility"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Safari 27.0 arrives with a lesson more interesting than a simple list of APIs: on the web platform, compatibility and implementation quality are core parts of development infrastructure. WebKit reports 844 fixes and improvements, alongside a new ES module loader, a rebuilt CSS Zoom implementation, and changes that bring behaviors such as `innerText` and HTTP caching closer to the standards.

The release’s most consequential engineering change is the inclusion of Safari’s MCP server. It runs locally and lets a coding agent inspect the browser’s DOM, network requests, screenshots, and console output. With that information, an agent can verify form states, compare computed styles across browsers, identify missing labels, incorrect ARIA attributes or poor contrast, and inspect navigation and resource-load timings. It does not replace engineering judgment, but it turns part of manual verification into a reproducible and observable workflow.

The local design matters as well. WebKit says the server makes no network calls of its own and cannot access personal information in Safari: captured data goes directly to the agent selected by the developer. For teams experimenting with agents on frontend work, that boundary addresses a common concern: giving a debugging tool more access than the task actually requires.

Safari 27 also improves the platform underneath applications. Customizable `select` controls make it possible to build visually adapted menus without replacing the native control with a collection of `div` elements and JavaScript. Scroll anchoring prevents the page from jumping when content is inserted above the current position, a frequent problem in progressively loaded interfaces. For components and design systems, `revert-rule` provides a more precise way to undo declarations without discarding the rest of a rule, while `:host:has()` lets a custom element respond to the state of its own Shadow DOM tree.

Several less visible changes are important for specialized applications. JavaScript now has full support for top-level `await`; WebAssembly gains JSPI, which allows synchronous-looking code to suspend while waiting for Promises; WebDriver can simulate digital credentials in tests; and WebRTC exposes more controls and statistics related to latency, codecs, and jitter buffers.

The practical conclusion is not to enable every feature immediately. It is to test the release against a real browser matrix, observe differences, and use native capabilities when they solve a concrete problem. Safari 27 shows that a mature platform advances through new APIs and through hundreds of fixes that remove edge cases, inconsistencies, and maintenance work.
