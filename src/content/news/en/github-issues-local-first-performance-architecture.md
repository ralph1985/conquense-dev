---
translationId: github-issues-local-first-performance-20261014
lang: en
slug: github-issues-local-first-performance-architecture
title: "GitHub turns Issues navigation into a local-first architecture problem"
description: "GitHub explains how IndexedDB, preheating, service workers, and background revalidation reduced perceived latency in its Issues workflow."
publishedAt: 2026-10-14
sourceName: "The GitHub Blog"
sourceTitle: "From latency to instant: Modernizing GitHub Issues navigation performance"
sourceUrl: "https://github.blog/engineering/architecture-optimization/from-latency-to-instant-modernizing-github-issues-navigation-performance/"
author: "Alexander Lelidis"
tags: ["frontend", "web performance", "react", "indexeddb", "web architecture"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has documented a performance improvement in Issues that is more interesting for its architecture than for any isolated optimization. The team did not try to solve all latency by progressively moving the application from Rails to React. Instead, it identified which paths could become fast immediately and built a local-first model combining persistent caching, preheating, background revalidation, and service workers.

The starting point was uncomfortable: most navigations to an issue were still full navigations. In the initial measurement, 57.6% were hard navigations involving HTML, asset loading, JavaScript execution, and eventual hydration. React soft navigations were faster, but represented only part of the traffic. The boundary between Rails-rendered pages and React surfaces frequently forced a cold start, so waiting for a complete migration would not have solved the short-term problem.

The first component was a persistent IndexedDB cache for Issues responses. During a soft navigation, the application first attempts to recover local data and render a usable interface. It then requests a fresh version from the server and reconciles the state if it has changed. This stale-while-revalidate pattern separates two goals that are often conflated: showing something useful quickly and keeping information correct. If the network fails, a reasonably recent copy can continue to support interaction while an update is obtained.

The team then added preheating to increase cache-hit rates and a service worker to accelerate paths that still involved full navigation. The important technical decision is that each layer has a distinct role: IndexedDB provides persistence across sessions, memory avoids repeated reads during the active session, and the service worker helps during particular navigation cycles. This is not simply a matter of storing more data in the browser. Expiration, invalidation, reconciliation, and behavior when the server returns a different version all need explicit rules.

The published results show an uneven but meaningful improvement. Across Issues traffic, the 10th percentile fell from roughly 600 to 70 milliseconds; the 25th percentile from 800 to 120; and the median from about 1,200 to 700. The 90th percentile dropped from 2,400 to 2,100 milliseconds, a more modest reduction that shows where the remaining cost lies: cold starts, JavaScript execution, and paths that still depend on full rendering.

The lesson for other web applications is methodological. Before rewriting an interface, classify navigation types, measure what percentage pays each cost, and locate repeated paths where caching can remove work without hiding changes. Eventual consistency is not free and requires an explicit policy, but it can improve the experience without waiting for an architectural migration to finish. GitHub also provides a useful warning: once the server stops being the bottleneck, client startup can become the next limit.
