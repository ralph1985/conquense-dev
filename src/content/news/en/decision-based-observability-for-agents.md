---
translationId: agent-observability-decisions-2026-08-25
lang: en
slug: decision-based-observability-for-agents
title: "Agent observability should follow decisions, not only requests"
description: "MongoDB argues for instrumenting an agent’s decision path to detect loops, irrelevant context, and costs that traditional APM does not reveal."
publishedAt: 2026-08-25
sourceName: "MongoDB Developer Blog"
sourceTitle: "Agent Observability: Monitoring Decisions, Not Requests"
sourceUrl: "https://www.mongodb.com/company/blog/technical/agent-observability-monitoring-decisions-not-requests"
author: "Mikiko Bazeley, Ashish Kumar, Massimiliano Marcon, Charlie Xu, Ahmed Sulaiman, and Nandini Kapa"
tags: ["observability", "agents", "opentelemetry", "distributed-systems", "aiops"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

## When a successful request produces a wrong result

In a conventional web service, a request, its latency, and its response code provide a reasonable unit of observation. In an AI agent, every individual step can complete successfully while the overall task still fails. The agent may retrieve irrelevant context, choose a tool with invented parameters, lose information during delegation, or enter a re-planning loop.

A technical article from MongoDB argues that this behavior requires observing decisions, not only requests. The distinction is practical: the system should show what context the agent read, what action it chose, which tool it invoked, what result it received, and why it proceeded to the next step. A model-call log can confirm that the call completed; it cannot explain why the process never converged.

## Three different jobs

The article separates monitoring, observability, and evaluation. Monitoring answers whether the system is healthy: availability, errors, latency, and resource consumption. Observability reconstructs what happened and identifies the responsible component. Evaluation determines whether the behavior was good according to a defined criterion. Combining these jobs often produces dashboards full of signals but no useful explanation of failure.

The proposed central artifact is a hierarchical trace. The top-level agent invocation is the parent span, with child spans for model calls, tool execution, and memory reads or writes. This structure connects the steps and helps distinguish a model failure from one caused by the orchestrator, persistent state, context retrieval, or an external tool.

The article notes that OpenTelemetry’s GenAI semantic conventions are converging, although they remain in development and changed during 2026. Adopting a common format can reduce the cost of integrating frameworks and platforms, but it does not remove the need to decide what data to retain, who may read it, and for how long. Traces can contain sensitive information, internal instructions, or user-retrieved data.

## Metrics that describe the real work

For production, MongoDB highlights three signals: decision quality, retrieved-context relevance, and fully loaded cost per task. The last concept includes infrastructure, tokens, and human oversight, because an autonomous action does not have a fixed cost comparable to an HTTP request. Useful alerts include task-completion failures, falling retrieval relevance, and cost-per-task regression.

These metrics do not replace traces. A trace can record a sequence perfectly and still say nothing about whether the decision was correct. An independent evaluation is needed, using examples, expected outcomes, or human review. Likewise, observing a memory read does not mean automatically turning it into persistent memory.

The recommendation is to separate execution state from durable memory. The first describes one task; the second contains knowledge reused across sessions and requires its own retention, access, and deletion policies. For teams moving from prototypes to production, this separation prevents the diagnostic system from accidentally becoming another store of sensitive data.

The architectural consequence is clear: operating agents requires decision-level telemetry, not only request-level APM. That telemetry exposes loops and deviations before they appear as simple latency complaints or incorrect answers.
