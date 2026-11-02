---
translationId: cloudflare-origin-range-cache-20261023
lang: en
slug: cloudflare-http-range-cache-large-files
title: "Serving a few bytes can move too much data: lessons from Cloudflare's new range cache"
description: "Partial file delivery requires measuring internal work as well as the size of the response reaching the browser."
publishedAt: 2026-10-23
sourceName: "Cloudflare Blog"
sourceTitle: "Origin Range Requests: Serving large files without range-request tuning"
sourceUrl: "https://blog.cloudflare.com/origin-range-requests/"
author: "Conquense Dev Editorial"
tags: ["web-performance", "http", "architecture", "frontend"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On October 23, Cloudflare explained how it redesigned its cache for partial requests. The new implementation uses storage chunks and coordinates available data with transfers already in progress. According to its R2 measurements, time to first byte at the 99th percentile fell by approximately half. That result belongs to that infrastructure and workload; it is not a promise for every application. [Cloudflare analysis](https://blog.cloudflare.com/origin-range-requests/).

The documentation allows Origin Range Requests to be enabled through a cache rule. It also identifies a relevant operational requirement: the origin must support range requests and correctly respond with partial content. Configuring the intermediary therefore needs to be accompanied by a check of the server holding the file. [Official configuration documentation](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/).

For a frontend team, the interesting question is how to investigate video playback that takes too long to resume or a download that responds slowly. The size received by the browser describes only part of the journey. As a diagnostic approach, it is worth correlating that request with bytes read at the origin, intermediate transfers, and time spent waiting for shared work. A small response may depend on a much larger internal operation.

A useful testing strategy should combine sequential access, seeks to distant positions, and simultaneous requests with partially overlapping ranges. Comparing cold and warm caches is also valuable. These scenarios represent different needs: progressing continuously, finding a scene, or serving several users requesting nearby fragments. Measuring them separately prevents a favorable average from hiding a long wait during a specific interaction.

Correctness deserves as much attention as speed. In a custom implementation, tests should check that the body contains exactly the requested bytes and that its headers describe that same interval. It is also worth verifying what happens when the file changes between requests. These are general validation criteria, not claims about defects found in the announced service. A cache optimization is useful only if it preserves the resource's identity and consistency.

The architectural lesson is to evaluate where each decision belongs. Exposing a tuning parameter to customers may look flexible, but it adds a responsibility those customers may lack sufficient information to resolve. Before offering another configuration option, it is worth checking whether the system can derive it from its own storage units and pending operations. For web application maintainers, a reasonable next step is to measure a real partial-access journey and locate where work is amplified.
