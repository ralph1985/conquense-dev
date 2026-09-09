---
translationId: cloudflare-cache-transcoding-zstd-2026
lang: en
slug: cloudflare-tests-zstandard-and-pingora-cache-transcoding
title: "Cloudflare tests cache transcoding with Zstandard and Pingora"
description: "A Cloudflare prototype stores HTML, JSON, CSS, and JavaScript in compressed form inside the cache. The approach illustrates how a small CPU cost can trade for greater storage and"
publishedAt: 2026-09-01
sourceName: "Cloudflare Blog"
sourceTitle: "How we could save petabytes of cache storage with Zstandard and Pingora"
sourceUrl: "https://blog.cloudflare.com/cache-transcoding/"
author: "Aashi Patel"
tags: ["web-performance", "systems", "compression", "infrastructure"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare is testing an architectural change that moves compression inside the cache. The prototype, built around Pingora and Zstandard, keeps selected objects compressed on disk and between cache tiers, while returning the original representation expected by the client. The idea is easy to describe and difficult to operate at scale: spend some CPU on each read in exchange for storage and bandwidth savings throughout the object’s lifetime.

The starting point is that a distributed cache does more than serve responses. It stores them, replicates them, and moves them between data centers. If content remains uncompressed during those stages, every copy takes more space and every internal transfer moves more bytes than necessary. In Cloudflare’s initial tests, eligible assets occupied roughly one third of their original on-disk size. The benefit compounds when an object is reused many times or passes through several cache tiers.

Zstandard reflects a familiar infrastructure trade-off: achieving the highest possible reduction is not enough; compression and decompression also need predictable speed. Cloudflare cites earlier tests in which zstd compressed faster than Brotli at nearly the same file size and produced files smaller than gzip at a comparable speed. The prototype uses level 3, aiming for a practical balance between savings and CPU cost.

Eligibility rules matter as much as the algorithm. Images, video, and fonts are usually compressed already, so processing them again would consume CPU without producing a useful reduction. In the analyzed sample, that media accounted for 63.3 percent of bytes while representing only 21.4 percent of requests. HTML, JSON, CSS, and JavaScript represented 22.3 percent of bytes, and a substantial share arrived without Content-Encoding. The opportunity is therefore concentrated in text that still lacks an efficient representation inside the infrastructure.

The published measurements put encoding at 4.31 nanoseconds per byte and decoding at 1.56 nanoseconds per byte under the prototype’s conditions. The tested policy compresses eligible text from 4 KiB upward instead of limiting the feature to only the most popular objects. The reasoning is that decoding happens on every delivery: focusing solely on hot objects did not remove enough work to offset the lost storage savings.

The lesson for smaller teams is not to copy Cloudflare’s design, but to separate costs by stage. Compressing at the origin can improve public-network delivery; compressing inside a cache can improve storage and internal links. Before adopting a similar technique, teams should measure size, reuse frequency, CPU, latency, and content-header compatibility. The optimization only works when the savings remain larger than the additional work on each path.
