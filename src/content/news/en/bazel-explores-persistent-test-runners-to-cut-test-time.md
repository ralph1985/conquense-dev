---
translationId: bazel-persistent-test-runners-20261027
lang: en
slug: bazel-explores-persistent-test-runners-to-cut-test-time
title: "Bazel explores persistent test runners to reduce test time"
description: "A new Bazel proposal reuses long-running test processes and cuts execution time by 46% in the project’s own Java tests."
publishedAt: 2026-10-27
sourceName: "EngFlow Blog"
sourceTitle: "Persistent Test Runners: How Persistent Workers for Tests Can Cut Test Times by 46%"
sourceUrl: "https://blog.engflow.com/2026/10/27/persistent-test-runners-how-persistent-workers-for-tests-can-cut-test-times-by-46/"
author: "John Cater"
tags: ["testing", "bazel", "continuous integration", "performance", "developer tools"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Bazel has used persistent workers to speed up compilation for years. A proposal presented by EngFlow in the context of BazelCon 2026 applies the same idea to test execution: keep a prepared process alive and reuse it across multiple cases instead of paying the startup cost every time.

That cost can include `fork` and `exec`, Java virtual-machine initialization, heavyweight fixture setup, container-image downloads, or emulator startup. In large suites, many individual tests are short, so startup can represent a significant share of total time. A persistent process can also retain JIT compilation caches and already-loaded dependencies.

The proposal addresses a problem that caused an earlier implementation to fail. Reusing a JVM is not simply a matter of leaving it open: classpath changes can leave stale classes behind, shared dependencies can mix the runner with the code under test, and global state must be isolated between executions. Correctly clearing a JVM requires complex class-loader mechanisms and strict discipline to remove residual effects.

The new API, called `PersistentTestInfo`, connects two models that Bazel previously kept separate. The test API describes how a test runs and how it communicates its result, logs, and configuration. The worker API describes actions that can run persistently, including the protocol, execution requirements, and possible multiplexing. With `PersistentTestInfo`, a rule can declare how it participates in this model without relying on the test being a native rule built into Bazel.

The prototype was evaluated with 46 Java test targets from Bazel itself, each run four times. Median total time fell from 36.5 minutes with the local strategy to 19.6 minutes with the persistent worker: a 46% reduction and an approximate 1.9x speedup. Thirty-five targets became faster. The other eleven became slower and were short tests, under 14 seconds, partly because scanning the classpath from a persistent JVM can cost more than starting an isolated process.

The result is not yet production-ready. The proposal remains under development and its APIs may change during review. Its technical value lies elsewhere: faster feedback requires control over lifecycle, invalidation, and isolation, not just process reuse. The same caution applies to JavaScript, browser, or container runners. Keeping an environment warm can reduce latency, but it is sustainable only when every test retains reproducible state and does not inherit residue from the previous one.
