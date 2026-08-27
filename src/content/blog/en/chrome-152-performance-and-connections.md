---
translationId: chrome-152-rendimiento-y-conexiones
lang: en
slug: chrome-152-performance-and-connections
title: "Chrome 152 adds performance signals and connection controls"
description: "The new Chrome release adds an API for adapting experiences to CPU performance and an experimental mechanism for limiting network destinations."
publishedAt: 2026-08-25
sourceName: "Chrome for Developers"
sourceTitle: "New in Chrome 152"
sourceUrl: "https://developer.chrome.com/blog/new-in-chrome-152"
author: "Rachel Andrew"
tags: ["web performance", "security", "browsers"]
readingTime: 3
aiDisclosure: "This text was generated with AI and reviewed before publication."
---

Chrome 152 reaches the stable channel with two changes worth attention from a web-engineering perspective: the CPU Performance API and Connection Allowlists. These are not visual changes or mere browser conveniences; they create practical options for execution decisions and for reducing an application's outbound surface.

The CPU Performance API lets an application learn a classification of a device's CPU performance. Its sensible use is not to turn that signal into an access requirement, but to adjust optional work: a visual simulation, animation complexity, the size of a local processing batch, or the frequency of an expensive task. An experience should remain functional at every tier; the signal can help prevent non-essential enhancements from degrading interaction on less capable machines.

That calls for progressive degradation. Before branching on the signal, teams should separate what is essential from what can be simplified. They also need to measure the outcome with real users and devices: a performance label is not a substitute for metrics such as INP, LCP, battery use, or error rate. Chrome also says that users can override the reported tier in settings and that organizations can manage it through policy. It should therefore not be treated as a reliable hardware test or an access-control mechanism.

The second change, Connection Allowlists, is presented as an HTTP-header-based security mechanism. With `Connection-Allowlist`, a site can declare URL patterns allowed for network communications initiated by a document or web worker. The browser, rather than application code alone, enforces that boundary. If a compromised script tries to contact an unauthorized destination, a well-defined policy can block the connection.

The technical value is in turning inventory into an executable restriction. Many frontends load analytics, payments, maps, fonts, first-party APIs, and third-party resources; simply knowing those destinations is already difficult. An allowlist forces teams to document them, uncover implicit dependencies, and review provider changes. It can complement CSP, infrastructure egress rules, and backend controls, but it does not replace them.

Adoption needs care. Applications with dynamic endpoints, A/B testing, or third-party integrations may break when the list is too narrow. A sensible approach is to begin with observation and test environments, keep the inventory alongside deployment configuration, and define who reviews every new origin. Chrome 152 does not remove the need to validate inputs or protect secrets; it adds another layer so that a client-side failure has fewer available paths to the outside.
