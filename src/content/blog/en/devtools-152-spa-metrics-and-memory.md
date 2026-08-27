---
translationId: devtools-152-medicion-spa-y-memoria
lang: en
slug: devtools-152-spa-metrics-and-memory
title: "DevTools 152 brings SPA metrics and memory debugging closer to agents"
description: "Chrome DevTools adds Core Web Vitals for soft navigations and new heap-inspection capabilities for its MCP server."
publishedAt: 2026-08-25
sourceName: "Chrome for Developers"
sourceTitle: "What's new in DevTools (Chrome 152)"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-152"
author: "Matthias Rohmer"
tags: ["web performance", "debugging", "ai tooling"]
readingTime: 3
aiDisclosure: "This text was generated with AI and reviewed before publication."
---

Chrome DevTools 152 combines improvements that address two common problems: understanding single-page-application performance and finding memory retention without manually walking every runtime structure. The update adds Core Web Vitals for soft navigations in Performance Live Metrics and expands the DevTools MCP server with heap-snapshot queries.

In an SPA, changing views does not necessarily mean loading a new document. A router can change the URL, unmount components, fetch data, and paint a different screen without a conventional navigation. If observability only looks at the initial load, it may label an application healthy even when its first visit is fast but later transitions block input or repaint too much. Seeing Core Web Vitals associated with those soft navigations helps evaluate the experience where a meaningful share of usage actually happens.

The practical consequence is not chasing a single number. Teams should choose representative flows—search, filtering, opening detail, and returning to results—and record which interaction starts each transition. They can then relate a degradation to JavaScript work, requests, layout changes, or images. That sequence supports prioritization: removing unnecessary renders, splitting a long task, preloading data deliberately, or deferring resources that do not take part in the view. A metric becomes useful when it is tied to a reproducible scenario and an improvement hypothesis.

The same release improves memory work for agents using Chrome DevTools' MCP server. New operations include detailed object-property queries in a heap snapshot and GC-root retaining paths. It can also filter objects by native V8 execution context and inspect native contexts in snapshot summaries. This removes navigation steps through a large capture and provides information needed to explain why an object is still alive.

Even so, automating inspection does not turn a capture into a conclusive diagnosis. A retaining path can be legitimate: caches, session state, or global structures may deliberately keep references. A useful process compares snapshots under controlled conditions, repeats an action, captures at the appropriate observation point, and checks whether object counts or retained size grow without returning to a steady state.

DevTools 152 also improves request resending and binary-payload inspection in the Network panel. Together with soft-navigation metrics and heap analysis, the direction is clear: make a modern application more observable without turning every investigation into an endless manual session. The criterion remains the same: use these aids to produce evidence, validate the cause in code, and then confirm that the fix has not moved the problem elsewhere.
