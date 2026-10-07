---
translationId: firefox-157-security-advisory-sandbox-jit-20260929
lang: en
slug: firefox-157-security-advisory-sandbox-jit-webassembly-20260929
title: "Firefox 157 highlights the breadth of a modern browser’s attack surface"
description: "Mozilla’s advisory covers high-impact vulnerabilities in process isolation, the DOM, WebGPU, WebAssembly, JIT compilation, storage, and extensions."
publishedAt: 2026-09-29
sourceName: "Mozilla Foundation"
sourceTitle: "Security Vulnerabilities fixed in Firefox 157"
sourceUrl: "https://www.mozilla.org/en-US/security/advisories/mfsa2026-97/"
author: "Mozilla"
tags: ["security", "web-browsers", "webgpu", "webassembly", "javascript"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Mozilla has published the security advisory associated with Firefox 157, covering vulnerabilities across several browser layers: the DOM, navigation, process isolation, WebGPU, WebAssembly, the JavaScript engine, IndexedDB, caching, extensions, and DevTools. The document classifies numerous issues as high impact, although it does not claim that they are all exploitable under the same conditions or that every flaw is being actively exploited.

Examples include sandbox escapes in navigation, content-process, and graphics components; use-after-free bugs in widgets, WebGPU, WebAssembly, and the DOM; and incorrect boundary conditions in audio, video, and graphics code. The advisory also documents uninitialized memory, information disclosure, privilege escalation, and JIT miscompilation issues in WebAssembly and the JavaScript engine. In a multiprocess browser, these categories matter because a vulnerability that begins in page content may attempt to cross the boundaries separating that content from more privileged components.

The advisory also includes flaws affecting controls in the web security model. One example is a possible same-origin policy bypass in WebExtensions, alongside issues involving site isolation, Service Workers, and DevTools. They do not all have the same attack path: some require specially crafted content, others depend on an extension or a specific configuration, and some may cause denial of service. The list is a reminder that browser security is not limited to blocking malicious scripts; it also depends on the integrity of parsers, JIT engines, storage, graphics, and developer tools.

For web teams, the immediate consequence is operational. Updating Firefox reduces exposure for people who develop, test, or administer applications, especially when they use WebAssembly, WebGPU, extensions, or advanced debugging tools. In managed environments, the advisory can also feed version inventories, update policies, and criteria for prioritizing regression tests. Teams distributing desktop applications built on web technologies should separately review the update cycle of the runtime they bundle, because installing Firefox on workstations does not automatically fix an old embedded engine.

There is a second engineering lesson. The range of issues shows why browser security requires defense in depth: process isolation, bounds checks, memory management, origin policies, and privilege reduction work as complementary layers. A use-after-free bug can become an escalation or a sandbox escape only if it manages to pass other mitigations. Security fixes should therefore not be treated as context-free version changes.

Mozilla also says it has changed how it publishes advisories and now issues individual advisories for internally identified memory-safety vulnerabilities. For maintainers, that greater granularity makes it easier to connect each fix with a component, a test, and an update decision. The prudent practice is to update, review the actual scope of the technologies in use, and retain evidence of the corrected version without extrapolating beyond what the advisory confirms.
