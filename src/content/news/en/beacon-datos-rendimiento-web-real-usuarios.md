---
translationId: beacon-datos-rendimiento-web-20260928
lang: en
slug: beacon-datos-rendimiento-web-real-usuarios
title: "BEACON turns real-world web performance into an open dataset"
description: "Cloudflare has published BEACON, an aggregated real-user measurement dataset for studying LCP, transfer size, and network quality at global scale."
publishedAt: 2026-09-28
sourceName: "Cloudflare Blog"
sourceTitle: "How fast is the web? Explore billions of real-user measurements with BEACON"
sourceUrl: "https://blog.cloudflare.com/how-fast-is-the-web/"
author: "Ryan Townsend and Nic Jansma"
tags: ["web-performance", "rum", "observability", "privacy"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Web optimization often starts in an overly comfortable environment: a fast laptop, a stable connection, and an application tested close to the machine that built it. Cloudflare is trying to widen that perspective with BEACON, an open dataset based on real-user measurements. The project brings together billions of daily observations and makes it possible to study how pages behave by country, browser, operating system, and connection protocol.

BEACON’s technical value is not only its scale. It also separates two factors that are often mixed together in performance reports: the quality of the website itself and the quality of the network carrying it. Cloudflare plans to relate the data to Radar’s Internet Quality Index to study that interaction. A page may have a good Largest Contentful Paint (LCP) on a fast network and still provide a poor experience when bandwidth or latency deteriorates. Conversely, an excellent network can hide problems in page weight, processing, or delivery that become visible on constrained connections.

The initial public table covers a sample of 10,000 sites, normalized so that the highest-traffic domains do not dominate the results. Records are aggregated across dimensions such as country, operating system, browser, and protocol. Groups with fewer than five observations are discarded, and Cloudflare removes potential identifiers such as domain names and URL paths. Together, those measures aim to balance analytical usefulness, representativeness, and privacy.

The early results show meaningful regional differences. For landing pages, the published table places median LCP at 1,370 milliseconds, the 75th percentile at 2,681, and the 95th at 8,940. The data also shows an expected relationship between bandwidth and LCP, but a more interesting signal appears in transfer size: some regions download less content, possibly because their websites are more deliberately adapted to constrained networks. Cloudflare presents this as a hypothesis for further research, not as a proven explanation.

The engineering lesson is methodological. Lab testing remains valuable for locating regressions and comparing controlled changes, but it cannot replace field data. A JavaScript budget, image strategy, or rendering decision should be checked against real devices and networks. BEACON also shows why global averages can hide important inequalities: the same bundle may look acceptable in a fiber-connected office and become a barrier for users on modest phones.

The dataset is available through BigQuery and includes reproducible queries. Its first results do not establish causality, but they provide a public foundation for studying where the web falls short and which improvements genuinely help users.
