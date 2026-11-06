---
translationId: sentry-soft-navigation-web-vitals-20261029
lang: en
slug: sentry-web-vitals-internal-navigation
title: "Measuring internal SPA routes also requires reviewing dashboards"
description: "Sentry adds Web Vitals for internal navigation, highlighting an essential precaution: a changing population can resemble a performance improvement."
publishedAt: 2026-10-29
sourceName: "Sentry Blog"
sourceTitle: "Measuring soft navigation web vitals"
sourceUrl: "https://blog.sentry.io/measuring-soft-navigation-web-vitals/"
author: "Conquense Dev Editorial"
tags: ["frontend", "javascript", "web-performance", "observability"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On October 29, Sentry explained how its JavaScript SDK v11 records LCP, CLS, and INP for internal navigations. The feature requires the browser tracing integration and currently depends on Chromium 151 or later. The article warns that mixing these observations with document loads can improve aggregate figures without the application becoming faster. [Source: Sentry](https://blog.sentry.io/measuring-soft-navigation-web-vitals/).

Its relevance to frontend architecture lies in the unit of observation. An application can welcome users through a server-rendered page and then handle subsequent navigation with JavaScript. From the user's perspective, each screen has its own waiting time. However, the technical operations producing it can span data requests, module downloads, execution, and DOM updates.

As general analysis, measuring a request's duration does not establish when a screen becomes useful. A response can arrive quickly and still require considerable processing. The opposite can also happen: the main content appears while secondary tasks continue. It therefore helps to define which question each signal answers before turning it into a performance target or an alert.

The statistical problem deserves as much attention as instrumentation. Imagine two hypothetical groups: visits requiring a complete startup and transitions with resources already available. If the second group's proportion increases, an overall percentile can fall even though neither group improves individually. A useful dashboard should allow populations to be separated and preserve that separation when comparing versions. The SDK upgrade date should also be recorded to help interpret discontinuities.

Attribution by route can guide more specific investigations. When a screen is slow, the team can check whether the delay precedes the data request, occurs during it, or appears after the response arrives. These are different hypotheses: a request waterfall requires a different intervention from a long JavaScript task. The initial goal should be to locate the dominant segment, avoiding the introduction of preloading or caching before understanding it.

Representativeness also needs checking. A measurement available in particular browsers describes that population; it does not establish the experience of people using other engines. Device, connection, and entry method can change the sample's composition. Reports should show coverage and volume alongside performance values, especially for routes with little traffic.

The practical action is to review an important internal route and compare its behavior with a direct load of the same screen. Then check that dashboards and alerts distinguish the two experiences. Adding a new metric provides value when it helps explain the user's wait and preserves interpretable comparisons between deployments.
