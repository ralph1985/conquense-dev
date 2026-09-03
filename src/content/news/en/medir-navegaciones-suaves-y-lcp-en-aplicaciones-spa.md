---
translationId: cloudflare-soft-navigation-rum
lang: en
slug: medir-navegaciones-suaves-y-lcp-en-aplicaciones-spa
title: "Measuring soft navigations changes SPA observability"
description: "Cloudflare Web Analytics improves client-side navigation measurement and separates native Soft Navigation API data from fallback paths."
publishedAt: 2026-08-21
sourceName: "Cloudflare Developers"
sourceTitle: "Web Analytics improves soft navigation measurement for Single Page Applications (SPAs)"
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-08-21-improved-soft-navigation-measurement-for-single-page-applications/"
author: "Cloudflare Web Analytics"
tags: ["web performance", "SPA", "Core Web Vitals", "RUM", "browser APIs"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has updated Web Analytics to improve measurement of soft navigations in single-page applications. The change may look small at the interface level, but it affects a fundamental performance question: how long does it take for the main content to appear after someone changes views without fully reloading the document?

With a traditional navigation, the browser creates a new loading context, so the page’s metrics can be associated with it relatively clearly. In an SPA, React, Angular, Vue, Svelte, or a custom implementation may intercept a link, update history, and change the DOM without downloading a new document. To the user, this is still a navigation; for many measurement tools, it has historically been difficult to distinguish that event from work belonging to the previous screen.

The improvement relies on Chrome’s Soft Navigation API. When the native API is available and the application performs a client-side navigation, Cloudflare records the `soft-navigation` type and can measure Largest Contentful Paint for that transition. This provides better visibility into the perceived performance of internal routes, not just the initial load. An SPA that starts quickly but takes too long to open each view can hide that problem if teams analyze only full navigations.

Compatibility remains part of the design. For browsers without the native API, Cloudflare uses a path based on the Navigation API or History API and records `routing-apis`. In that case, it can retain other Core Web Vitals, but it cannot collect LCP for those soft navigations. That difference means teams should not compare every data point as if it came from the same mechanism. It also means router, history, and DOM-update decisions have direct consequences for observability.

The change may alter the number of pageviews shown in the dashboard and GraphQL API because events that were previously grouped as `navigate` are now classified in more detail. Teams should review dashboards, alerts, and queries that depend on `navigationType`, especially when thresholds are calculated by route or browser. An apparent drop may be a classification change; an apparent improvement may conceal a change in coverage.

The technical lesson is to treat navigation, rendering, and measurement as related but distinct responsibilities. The router should emit identifiable transitions, the interface should update in a measurable way, and the RUM system should indicate which method it used. Data should be checked against user traces and tests across multiple engines rather than relying only on Lighthouse or a single local session.

For mature SPAs, LCP availability on soft navigations creates a concrete opportunity: establish route-level performance budgets and detect regressions after code, data, or architectural changes. The API does not remove frontend complexity, but it makes one previously hidden part of that complexity visible.
