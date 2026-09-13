---
translationId: vercel-cdn-metadata-shards-20260910
lang: en
slug: vercel-reduce-un-91-por-ciento-la-latencia-de-metadatos-de-su-cdn
title: "Vercel cuts CDN metadata latency by 91%"
description: "Vercel describes how it replaced per-path metadata lookups with indexed shards to reduce P99 latency and speed up deployments."
publishedAt: 2026-09-10
sourceName: "Vercel"
sourceTitle: "How we cut CDN metadata lookup latency by 91%"
sourceUrl: "https://vercel.com/blog/how-we-cut-cdn-metadata-lookup-latency-by-91-percent"
author: "Tim Caswell, Steven Salat, and Luba Kravchenko"
tags: ["web-performance", "cdn", "caching", "routing"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Vercel has described an internal CDN optimization that reduces P99 route-metadata lookup latency by 91%. The change does not alter the contract frameworks use to describe an application. Instead, it changes how the infrastructure stores and retrieves that information when a request arrives.

The problem was most visible in large deployments. The CDN used to resolve a route by fetching and caching metadata for each target separately. A project could contain hundreds of thousands of paths, and every deployment created fresh cache keys, so the first requests repeatedly encountered cache misses. A visible URL also does not always match the resource that serves it: a page such as /blog/hello may resolve to a dynamic route, while its React Server Components payload may require another target.

The solution combines two familiar ideas with practical limits. First, a Bloom filter rules out paths that definitely do not exist. Then, instead of storing each record as an independent object, Vercel groups many metadata records into bounded shards. Each shard uses sorted JSONL records and an inline index that can locate an entry without decompressing or parsing the rest of the file. The lookup uses pointer reads and string comparisons in O(log n), and parses only the JSON value belonging to the matched path.

Shard size proved important. Multi-megabyte shards improved the regional cache, but were expensive when they missed the smaller per-process LRU cache. Very small shards caused more regional cache misses. Production traffic experiments led to a balance of approximately 200 KB. Between August 5 and 12, 2026, P99 latency fell from 215.8 to 19.1 milliseconds, while average latency dropped from 8.59 to 1.81 milliseconds.

The migration also improved deployment work. By removing metadata uploads that were no longer necessary, Vercel saved about 16.6 seconds across several stages and observed deployments becoming roughly 10% faster, with an estimated improvement closer to 25% for metadata-heavy projects.

The most useful lesson for other teams is the verification process. Before enabling the new format, Vercel compared both lookup paths with an offline harness. It then ran both versions in shadow mode on a random sample of production requests while continuing to serve the old result. This uncovered differences, including an edge case involving emojis and an older encoding scheme. The technical takeaway is deliberately modest: batching can reduce round trips and cache misses, but it works only when shard size, indexing, and validation are measured against real traffic.
