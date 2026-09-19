---
translationId: netflix-conductor-4-workflow-scale-20260821
lang: en
slug: netflix-conductor-4-escala-orquestacion-workflows
title: "Netflix redesigns Conductor for workflows ten times larger"
description: "The new architecture separates metadata and tasks, removes costly locking, and lowers p99 latency while scaling distributed workflow orchestration."
publishedAt: 2026-08-21
sourceName: "Netflix Technology Blog"
sourceTitle: "Netflix Conductor: The Next Chapter"
sourceUrl: "https://netflixtechblog.medium.com/netflix-conductor-the-next-chapter-41ad21067649"
author: "Aravindan Ramkumar, on behalf of the Conductor team"
tags: ["distributed-systems", "workflow-orchestration", "scalability", "java"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Netflix has described the internal evolution of Conductor, its workflow orchestration engine for coordinating microservices and long-running business processes. The platform supports roughly 200,000 workflow definitions owned by around 150 applications and executes about 420 million workflows per month. It is used across content production, advertising, games, and data processes.

That scale forced a review of nearly every layer. The first generation relied on Dynomite and DynoQueues, with Elasticsearch for indexing. As usage grew, Netflix moved execution data to Cassandra, offloaded large task inputs and outputs to Amazon S3, and replaced the earlier queue with Timestone, an internal high-throughput system. Indexing was decoupled from the critical path through Kafka, allowing the indexer to scale independently while writing to Elasticsearch.

The remaining bottleneck was the evaluator. Earlier versions loaded the complete state of a workflow into memory to decide which task should run next. Workflow metadata, task data, and user data also shared the same Cassandra partition. That design increased memory pressure, created very wide rows, and complicated concurrent updates.

Conductor 4.0 separates workflow metadata from each task’s data and gives every task its own record. The evaluator uses a lightweight workflow blueprint and loads only the information required for the next decision. According to Netflix, the practical limit grew from roughly 2,500 to 30,000 tasks per workflow, while production p99 workflow-evaluation latency fell by about 40%.

The redesign also changes state coordination. Instead of relying on locks to serialize every write, pending tasks and terminal tasks are stored in separate partitions. During reads, the application reconciles both states using a simple rule: a terminal state, such as COMPLETED or FAILED, always takes precedence over a non-terminal one. This means that a late update marking a task as active cannot undo a completion that has already been recorded.

Evaluation was also moved out of the synchronous request path and is processed through exclusive queues that advance workflows sequentially. Netflix reports that failed lock-acquisition attempts, which had reached roughly 2,700 per interval during contention, dropped to essentially zero. The platform adds native concurrency controls, dynamic worker allocation, and a type-safe Java SDK for defining workflows.

The value of this case is not that teams should copy Netflix’s architecture, but that it illustrates a useful evolution pattern. As a distributed system grows, local optimization is no longer enough: the critical path must be separated, each decision must require less state, and consistency guarantees should become explicit rules. Teams should also measure real workflow limits rather than average speed alone. p99 latency, contention, and maximum workflow size are design signals, not merely operational metrics.
