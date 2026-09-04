---
translationId: meta-zgateway-zippydb-20260903
lang: en
slug: meta-puts-zgateway-in-front-of-zippydb-to-control-scale
title: "Meta puts a proxy in front of ZippyDB to control connections, load, and failures"
description: "ZGateway turns a client-to-server connection mesh around ZippyDB into two bounded hops while centralizing batching, caching, admission control, and observability."
publishedAt: 2026-09-03
sourceName: "Engineering at Meta"
sourceTitle: "ZGateway: Learnings from Putting a Proxy in Front of ZippyDB"
sourceUrl: "https://engineering.fb.com/2026/09/03/core-infra/zgateway-proxy-zippydb-meta/"
author: "Engineering at Meta"
tags: ["distributed systems", "databases", "reliability", "proxy", "performance"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Meta explains how ZGateway, a stateless proxy in front of ZippyDB, is addressing a growth problem that could not be fixed easily in every client. ZippyDB is Meta’s most widely used internal key-value store, serving metadata, counters, and configuration across a distributed fleet capable of processing billions of operations per second.

In the original model, every client connected directly to the hosts containing the shards it needed. A client could touch tens of thousands of shards spread across hundreds of thousands of hosts, while each database server accepted connections from many clients. The result was a many-to-many TLS mesh: connections consumed memory, CPU, and file descriptors even when idle. A change in pooling behavior or a coordinated restart could create a reconnection storm. Meta describes an incident in which a routing error caused one connection per shard, exhausted file descriptors, and sent the fleet into a reboot loop.

ZGateway turns that mesh into two controlled hops. Clients keep a sticky pool to regional gateways, while ZippyDB servers receive connections only from the proxy fleet, whose size and behavior the platform team can control. The layer terminates TLS, applies ACLs, validation, per-tenant admission control, and shaping, resolves shard placement, and records metrics, traces, and quotas by use case. It does not try to reimplement the entire database client: key mapping, replica selection, and hedging remain in other components.

The central position also allows requests from different clients to be combined. A batcher groups operations headed to the same shard and sends them in one RPC. Coalescing turns simultaneous reads for the same key into a single backend read. This reduces QPS, CPU usage, and the risk of a hot-key stampede. The implementation bounds memory with linger windows, request and payload limits, eviction of idle entries, and a cap on in-flight work when the backend slows down.

Meta says ZGateway already carries about 40% of ZippyDB traffic, with growth expected beyond 60%, and adds roughly 6% computational overhead in an average use case. A model using rounded figures estimates a 97–98% reduction in connections per host and about 19 times fewer persistent connections end to end; these are model-based estimates, not universal measurements. In an overload test, only six of roughly 1,350 tenant buckets were shed, while the others maintained 99.9% execution and overall goodput stayed near 97–98%.

The decision is not free: it adds an operational tier and a network hop. Its value comes from changing the scaling behavior. Backend fan-in no longer grows directly with the client population and instead depends on a regional fleet that Meta can observe, protect, and tune. The lesson applies to other shared systems: when clients are numerous, heterogeneous, and difficult to update, a central layer can become the right place to control risk, provided its limits, isolation, and reversibility are designed from the start.
