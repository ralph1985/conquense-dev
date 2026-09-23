---
translationId: chrome-devtools-soft-navigation-agents-20260922
lang: en
slug: chrome-devtools-mide-spas-y-agentes-con-mas-control
title: "Chrome DevTools makes SPA and coding-agent testing more reproducible"
description: "The September update combines agent security controls, complete soft-navigation measurement, and new tools for memory and performance analysis."
publishedAt: 2026-09-22
sourceName: "Chrome for Developers"
sourceTitle: "New in DevTools - October 2026"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-october-2026/"
author: "Matthias Rohmer"
tags: ["frontend", "javascript", "devtools", "web-performance", "testing"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Chrome for Developers has summarized the features added to DevTools over the past month. The value of the update is less about one isolated feature than about the connection between diagnosis, automation, and reproducibility. For teams maintaining single-page applications, navigation measurement and agent-assisted automation are becoming less separate as engineering concerns.

The most important performance improvement is full support for soft-navigation analysis in the Performance panel. SPAs can change views without a traditional navigation, so conventional page-load metrics do not always describe the real user experience. DevTools now carries that analysis from trace views and Live Metrics into Insights. In practice, this gives engineers a more continuous way to investigate when an internal transition creates excessive work, delayed interaction, or an expensive visual update.

The update also adds calibrated CPU-tier overrides through the Chrome DevTools Protocol, using `Emulation.setCPUPerformanceOverride`. It is a small feature with an important engineering consequence: performance comparisons depend less on the developer’s particular computer. A team can exercise the same interaction under different CPU profiles and record results that are easier to compare in CI or during regression reviews.

The Application panel now exposes experimental advertising metrics for viewport ad density, ad count, total ad CPU usage, and total ad network usage. These metrics do not replace real-user monitoring, but they provide a more direct way to locate costs that were previously mixed with the rest of the page. For products carrying many third-party scripts, that attribution can turn a vague performance discussion into a list of accountable components and possible actions.

The other major theme is DevTools’ preparation for coding agents. The MCP server can disable JavaScript evaluation, restrict file-system roots, and load source maps on demand. It also adds more precise heap-snapshot queries, including searches by retained size, property, or V8 execution context. These controls matter because an agent inspecting a page should not automatically have permission to execute arbitrary scripts or explore arbitrary local paths.

There are practical improvements for ordinary debugging as well: visible inactive styles, keyboard-accessible DOM-tree adorners, traces for threads that contain only CPU profiles, and path-traversal protection for local overrides. Together, they express a clear principle: better measurement requires control over the environment, scope, and evidence. Teams should verify the behavior against the exact Chrome and MCP versions they use, but the direction is significant. The browser is becoming a more rigorous foundation for debugging SPAs, investigating memory, and supervising development agents.
