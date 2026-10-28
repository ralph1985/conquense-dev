---
translationId: infinity-runtime-agent-concurrency-20261023
lang: en
slug: infinity-runtime-agent-concurrency-20261023-en
title: "Infinity proposes treating AI agents as suspendable tasks rather than always-on processes"
description: "AWS and UC Berkeley have released Infinity, an experimental runtime that stores conversational state during waits and resumes agents when events or results arrive."
publishedAt: 2026-10-23
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing Infinity: a runtime for extreme agent concurrency"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-infinity-a-runtime-for-extreme-agent-concurrency/"
author: "Shadaj Laddad"
tags: ["artificial-intelligence", "agent-runtime", "rust", "serverless", "concurrency"]
readingTime: 6
aiDisclosure: "AI-generated content."
---

AWS and UC Berkeley have released Infinity as an experimental open-source project under the Apache 2.0 license. Its central idea is simple: an agent waiting for a tool result should not keep a process, a serverless function, or a large amount of memory occupied. Instead of blocking the execution loop, Infinity stores the conversation history and ends the active slice. When a result, message, or timer arrives, the runtime loads the state and continues from the appropriate point.

The design is inspired by coroutines and the async/await model. Each execution is divided into bounded slices. A slice loads the history, makes one model call, persists the output, and can dispatch at most one tool. It never waits for an external operation of unbounded duration. A build that takes twenty minutes or an approval that arrives three days later therefore does not require a function to remain alive throughout the wait.

The runtime organizes agents as logical threads with input queues. Messages for the same thread are processed in order so that two executions cannot overwrite the same history, while different threads can run in parallel. The reference serverless mode uses an SQS FIFO queue, Lambda to execute each step, Aurora DSQL for conversations, and DynamoDB for deduplication state. This design assumes at-least-once delivery, stable identifiers, and idempotent processing.

AWS reports that a synthetic benchmark reached roughly 100 KB of memory per idle agent and that this figure would extrapolate to about 75,000 agents in 8 GB. The result needs to be read carefully: the test ran on one thread of an AMD EPYC with a simulated model. It was not a demonstration running on a Raspberry Pi, nor a measurement of production traffic. The number illustrates the cost of resident state; it should not be used to size a real system automatically.

Another interesting problem appears when tools produce successive events. Model APIs generally expect one result per tool call, so Infinity introduces synthetic tool calls to represent later events without falsely attributing them to the user. It can also process each event in a child thread, preventing a subscription with hundreds of events from bloating the main agent’s context.

The project’s value lies in separating waiting, state, and computation. That separation may reduce costs for agents that spend much of their lives waiting for builds, reviews, or approvals. Infinity remains an early research release, however. Event authenticity, priority-based scheduling, compaction of branched histories, and how models reason about interleaved events still need validation. It is a promising architecture to study, not a production guarantee.
