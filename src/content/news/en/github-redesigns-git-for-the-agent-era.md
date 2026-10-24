---
translationId: github-git-infrastructure-agent-scale-20261021
lang: en
slug: github-redesigns-git-for-the-agent-era
title: "GitHub redesigns Git for the agent era: less coordination, more concurrency"
description: "GitHub is separating durability, compute, and read scaling so repositories under concurrent workloads can grow without turning every write into a queue."
publishedAt: 2026-10-21
sourceName: "GitHub Engineering"
sourceTitle: "The bridge to agent-scale Git infrastructure"
sourceUrl: "https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/"
author: "Eleanor White and Victoria Dye"
tags: ["git", "distributed systems", "infrastructure", "AI agents"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has explained how it is moving the last fraction of its repositories to an architecture designed to handle traffic generated concurrently by developers, CI, and software agents. The challenge is not simply storing more Git objects. It is preventing every write from waiting behind every other write as latency between data centers increases.

The approach follows a familiar distributed-systems rule: coordinate only what actually requires global ordering. In the current architecture, the write quorum operates at repository scope. Although the quorum needs only a majority to confirm an operation, the system waits for every healthy replica to respond, up to a timeout. Each update also holds a repository-wide lock during the process. When a replica is roughly 1,000 miles away and each round trip adds about 25 milliseconds, the slowest replica becomes the limit for every write.

GitHub is reducing the serialization scope from the whole repository to each reference. A branch, tag, or specific reference must preserve monotonic consistency: once a value has been accepted, clients should not later observe an older one. But two different branches usually do not depend on each other. Allowing their updates to proceed in parallel removes an artificial queue. In internal tests with realistic traffic, writes to different references achieved three to four times higher throughput at lower latency.

The second step is separating storage from compute. Durable objects are written to Azure Blob Storage through a virtual replica that participates in the quorum but does not serve reads. Ephemeral read replicas can then warm their caches from object storage and absorb demand spikes without becoming additional durable copies. Read capacity can therefore grow for clones, CI, or automated queries without increasing the cost of every push in proportion.

The lesson applies far beyond GitHub. When durability, caching, compaction, and read serving share the same nodes, losing capacity affects several properties at once. Separating responsibilities makes a compute failure closer to a cache miss, allows reads to scale with demand, and reserves coordination for metadata that genuinely needs ordering. It does not remove consensus, repair, or garbage-collection problems, but it places them behind more manageable boundaries.

For teams designing internal platforms, the post offers a useful criterion: measure which data needs joint consistency and which data merely shares a historical container. In an agent-driven environment, frequent commits and repeated CI executions amplify the cost of overly broad coordination. An architecture that works for a small human team may need a different granularity once concurrent work stops being exceptional.
