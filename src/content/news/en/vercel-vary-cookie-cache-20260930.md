---
translationId: vercel-vary-cookie-cache-20260930
lang: en
slug: vercel-vary-cookie-cache-20260930
title: "Vercel stops caching responses that vary by Cookie"
description: "Vercel’s change turns an apparently small HTTP decision into a practical lesson about cardinality, personalization, and CDN diagnosis."
publishedAt: 2026-09-30
sourceName: "Vercel Changelog"
sourceTitle: "Vercel CDN no longer caches responses with Vary: Cookie"
sourceUrl: "https://vercel.com/changelog/vary-cookie-responses-no-longer-cached"
author: "Shina Patel and Kelly Davis"
tags: ["web performance", "caching", "cdn"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Vercel has announced that its CDN will no longer store origin responses when the `Vary` header includes `Cookie`. The response will still be delivered to the user, but it will not be retained for future requests. In practice, a route that previously reused content from the edge may behave like a non-cacheable route unless the application’s configuration changes.

The technical reason is straightforward. `Vary` tells a cache which request headers can change a response. When a response varies by `Cookie`, the possible variant space can become enormous: each user, session, experiment, or preference combination may produce a different key. The result is a cache with little reuse and a storage and validation cost that may not be worthwhile. In a CDN, the issue is not merely consuming more space; an apparently valid policy can turn a route into a sequence of cache misses.

Vercel identifies this case through the `x-vercel-cache` header, which will show `MISS`, and through the `vary_key_denied:cookie` reason in runtime logs. That information matters because it helps distinguish an application that is slow because of server-side logic from one that is returning correct responses that cannot be reused. Diagnosis should start with the actual response from the origin, not with what the team intended when configuring the framework.

The right recommendation depends on the content’s semantics. If a page is identical regardless of cookies, the application should remove `Cookie` from `Vary`. This is not about hiding a signal to improve the hit rate; it is about accurately declaring that the input does not change the result. If the response contains personalized information, keeping the variation is correct, and Vercel recommends pairing it with `Cache-Control: private` so that an individualized response is not stored in a shared cache.

The case also shows why personalization should not automatically spread across an entire page. A site may have a fully cacheable public shell while reserving only the small session-dependent fragment for the client or for a private request. Separating those layers often works better than marking the whole document as cookie-dependent.

The broader lesson applies even when Vercel is not involved. Cache headers are part of an application’s functional contract: they affect performance, privacy, and consistency. Teams should review which middleware adds `Vary`, which cookies are genuinely relevant, whether content can be split into public and private parts, and what production logs actually show. A single `MISS` is not an incident; a policy that prevents reuse of responses that were never personalized is measurable technical debt.
