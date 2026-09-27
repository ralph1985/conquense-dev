---
translationId: browser-connection-allowlists-chrome-20260923
lang: en
slug: chrome-connection-allowlists-network-boundaries-for-web-apps
title: "Chrome introduces connection allowlists to restrict web application traffic"
description: "Chrome 152 adds a header that applies a default-deny network policy to documents and workers, with particular value for third-party or AI-generated code."
publishedAt: 2026-09-23
sourceName: "Chrome for Developers"
sourceTitle: "Connection allowlists: Secure your web application's network access"
sourceUrl: "https://developer.chrome.com/blog/connection-allowlist-announcement"
author: "Sebastian Benz and José Luis Zapata"
tags: ["web security", "JavaScript", "browser APIs", "Chrome", "applied AI"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Modern web applications no longer execute only code written by the team that maintains them. They include third-party scripts, widgets, embedded content and, increasingly, interfaces or code fragments generated with AI. That composition speeds up development, but it also expands the places from which an application may try to send data. Chrome has introduced connection allowlists, a browser-level policy for controlling that traffic.

The proposal is configured through the `Connection-Allowlist` HTTP header. A server specifies permitted URL patterns using the standardized `URLPattern` syntax, and the browser blocks connections that do not match before they are established. The policy is separate for each window or worker, allowing different parts of an application to have different network boundaries.

The technical distinction from Content Security Policy matters. CSP controls which resources may be loaded or executed, but it is not designed as a general list of network destinations. It also does not comprehensively cover mechanisms such as DNS prefetch, some navigations or WebRTC. The new policy is complementary: CSP determines what may enter or execute, while the allowlist determines where that code may communicate.

The design includes several operational safeguards. Redirects and WebRTC connections are blocked by default and must be explicitly enabled when required. There is also a report-only mode, using `Connection-Allowlist-Report-Only`, which sends violations through the Reporting API before enforcement begins. For a cautious rollout, this makes it possible to discover hidden dependencies without turning the first deployment into a carefully automated outage.

Chrome recommends isolating untrusted code in a dedicated iframe, preferably cross-origin or sandboxed, and applying the policy there. Adding the header to a document that shares an origin with trusted code is not enough: same-origin scripting may preserve a path around the intended isolation. A network perimeter needs to be paired with a clearly defined execution perimeter.

The architectural lesson is that web application security can be expressed through declarative limits closer to the browser. Teams running generated content, integrating external providers or building sandboxes can start in report-only mode, review observed connections and then move to a minimal destination set. The feature is available starting with Chrome 152; while support expands elsewhere, teams should retain progressive enhancement and a functional fallback. It does not replace CSP, process isolation or code review, but it addresses a specific exfiltration path: communication with destinations that were never approved.
