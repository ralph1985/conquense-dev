---
translationId: shopify-liquid-streaming-performance-20260922
lang: en
slug: shopify-liquid-streaming-performance-20260922
title: "Shopify sends HTML earlier and cuts Liquid storefront TTFB by 29%"
description: "The platform now streams the head while the rest of the template renders, allowing the browser to download critical styles, fonts, and scripts sooner"
publishedAt: 2026-09-22
sourceName: "Performance @ Shopify"
sourceTitle: "Liquid storefronts now start loading 29% faster"
sourceUrl: "https://performance.shopify.com/blogs/blog/liquid-storefronts-now-start-loading-29-faster"
author: "Mateusz Krzeszowiak"
tags: ["web-performance", "streaming-html", "ttfb", "frontend-architecture", "shopify"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Shopify has changed the timing of Liquid rendering so that the browser can start working sooner. On pages that meet specific requirements, the platform sends the part of the layout up to `{{ content_for_header }}` as soon as it is ready, then continues streaming the rest of the document. The final HTML does not change; the time at which its pieces arrive does.

That distinction matters because the head usually contains metadata, stylesheet links, font preloads, and scripts. Previously, the browser received nothing until both the head and the template sections were finished, with those sections accounting for most rendering time. With chunked delivery, the browser can parse the head, open connections, and begin downloads while Shopify continues generating the content. The server and browser work in parallel instead of waiting for one another.

During the rollout, Shopify measured an approximate 29% reduction in TTFB at the 75th percentile for the median store and a 21% reduction at the 90th percentile. FCP and LCP improved by between 2% and 6%. Those numbers need careful interpretation: streaming does not remove server work, nor does it guarantee that all of the head start becomes an earlier first paint. The benefit depends on whether critical resources have actually arrived before the split point.

For now, the feature mainly applies to pages rendered from JSON templates. `.liquid` templates are not covered by the general case because they can change the layout during rendering or assign variables that the layout reads later. In addition, `{{ content_for_header }}` must appear as a direct output inside `<head>`; wrapping it in a condition, capture, or snippet makes it unsafe to identify a reliable split point.

The comparison between themes demonstrates the principle. Dawn places important resources below `content_for_header`, while Horizon defines almost everything it needs above it. Both receive a similar TTFB improvement, but Horizon converts more of that head start into FCP and LCP gains because stylesheets and other render-blocking resources are already arriving while the template renders. Theme maintainers should review the ordering of critical dependencies, while remembering that moving a stylesheet can change specificity and that a script depending on `Shopify.*` can fail if it runs too early.

The change also exposes an observability limit. TTFB no longer describes all rendering work cleanly when the first part of the document arrives before the rest. Shopify suggests using the interval between `responseEnd` and `finalResponseHeadersStart` as a proxy and complementing it with Theme Inspector. The broader lesson is useful beyond Shopify: optimizing initial delivery requires measuring what users see while preserving a separate view of the server work that remains afterward.
