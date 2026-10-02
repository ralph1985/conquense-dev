---
translationId: cloudflare-kitesurf-webmcp-20260928
lang: en
slug: cloudflare-kitesurf-webmcp-agent-browser
title: "Cloudflare advances an agent browser with WebMCP and standards testing"
description: "Kitesurf’s latest update shows that agent browsers need explicit APIs, measurable web compatibility, and optimization focused on the agent-browser loop."
publishedAt: 2026-09-28
sourceName: "Cloudflare Blog"
sourceTitle: "The road to the agentic browser: A Kitesurf update"
sourceUrl: "https://blog.cloudflare.com/kitesurf-update/"
author: "Celso Martinho"
tags: ["cloudflare", "webmcp", "browsers", "ai-agents", "web-performance"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has published an update to Kitesurf, its experimental agent browser running on Workers. The project starts from a specific premise: an agent does not need exactly the same browser as a person. For automated tasks, predictable access to state, functions, and results can matter more than simulating clicks across a visual interface.

The main addition is WebMCP support. This mechanism lets a website expose tools directly to agents. Instead of moving through a page until it finds a button for searching flights, a client can invoke an equivalent function such as `searchFlights()`. The difference is not cosmetic. An explicit API reduces the fragility caused by selectors, layout changes, loading timing, and elements that only exist after JavaScript has run.

Kitesurf has also expanded its web-standards coverage. The update adds support for CSS Layout, CSSOM, CSS Typed OM, and custom elements, as well as URL-based module resolution, JSON modules, and import maps. These capabilities matter for modern applications that load JavaScript as modules and build interfaces from components. Iframe behavior has also improved in timing, isolation, text rendering, and character encodings.

Validation relies on Web Platform Tests, the shared suite used by browser projects to check platform interoperability. Cloudflare says Kitesurf now passes more than 730,000 subtests, roughly 500,000 more than at launch. That number does not prove that the browser can reproduce every real-world application, but it is a more useful technical signal than an isolated demonstration: the team is measuring its distance from common standards and expanding coverage continuously.

Performance has been treated as a problem specific to agent use. Cloudflare reduced work crossing between the Boa JavaScript engine and the DOM, removed repeated work in timers and script loading, and improved memory release and selective font loading. The goal is not only to make the first render faster, but to reduce waiting inside an agent’s observe-think-act loop. According to the company, wall-clock time and CPU usage remain roughly in line with the launch benchmarks despite the broader standards support.

The architecture separates PageScript, which manages the page session and page code, from PageRenderer, which produces pixels. That separation allows security-sensitive parts to remain server-side while rendering can be moved to another Worker or client when useful. Kitesurf also integrates with Browser Run through CDP, Playwright, Puppeteer, and MCP, and it can run from a terminal.

The practical lesson for web teams is clear: preparing applications for agents is not just a matter of adding a prompt. It is worth exposing explicit actions, reducing dependence on visual geometry, testing standards compatibility, and measuring the latency of every agent turn. The agent-oriented web is still experimental, but its central engineering problems are already visible: interaction contracts, isolation, interoperability, and observability.
