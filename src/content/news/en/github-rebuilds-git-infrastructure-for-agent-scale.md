---
translationId: github-git-infrastructure-agent-scale-20261006
lang: en
slug: github-rebuilds-git-infrastructure-for-agent-scale
title: "GitHub is redesigning Git infrastructure for agent-scale workloads"
description: "GitHub explains how it is separating storage, read capacity, and write coordination to support repositories with much higher levels of concurrent agent and CI activity."
publishedAt: 2026-10-06
sourceName: "GitHub Engineering"
sourceTitle: "Building Git infrastructure for agent-scale development"
sourceUrl: "https://github.blog/engineering/architecture-optimization/building-git-infrastructure-for-agent-scale-development/"
author: "Brian Celenza"
tags: ["git", "infrastructure", "distributed-systems", "ai-agents"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub is rebuilding the infrastructure behind its repositories to address a change in scale: coding agents generate more branches, commits, pushes, and CI runs, and they do so concurrently. In his technical analysis, Brian Celenza describes an architecture that must keep serving users while the underlying system is replaced, without requiring changes to familiar branch, review, and merge workflows.

The published figures illustrate the problem. Between September 2025 and August 2026, total Git activity on GitHub grew from 218.2 billion to 473.3 billion events per month. In September alone, developers and agents made 7.38 billion commits, while GitHub Actions ran 3.26 billion times. In this environment, an operation that feels nearly instantaneous to a human can become the bottleneck for an agent that commits or checkpoints after almost every action.

The current architecture stores complete repository copies on the local disks of several servers. That provides low-latency reads and redundancy, but it creates an awkward relationship: adding replicas to absorb more reads also adds participants to every write path. A push must become durable and consistently visible, so its latency is bounded by the slowest replica. Repository compaction and garbage collection also compete for resources with interactive Git operations.

GitHub’s proposal applies three principles. The first is minimizing coordination: updating a reference is the part that truly needs agreement, while storing objects, checking connectivity, and running tasks such as secret scanning can proceed in parallel. The second is moving maintenance off the serving path, with separate workers handling compaction and garbage collection. The third is decoupling storage from compute.

In the new design, Azure Blob Storage holds the authoritative durable repository copy, while lightweight workers serve reads and maintain caches. A burst of clones, builds, or agents therefore does not require another complete durable replica. Failure recovery also changes: losing a compute worker is closer to a cache miss than to rebuilding an entire repository copy.

GitHub says internal benchmarks have reached up to 35 times higher write throughput, while read capacity can scale independently. The technical lesson is not that every team should copy this architecture. It is that extreme concurrency requires identifying which state actually needs coordination and which work can happen later. For development platforms, that separation can matter more than optimizing clone speed alone.
