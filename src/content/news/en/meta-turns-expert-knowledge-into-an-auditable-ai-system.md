---
translationId: meta-organizational-second-brain-2026-09-02
lang: en
slug: meta-turns-expert-knowledge-into-an-auditable-ai-system
title: "Meta turns expert knowledge into an auditable AI system"
description: "Meta describes an architecture that separates knowledge, procedures, and evaluation so specialised agents can improve without retraining the underlying model."
publishedAt: 2026-09-02
sourceName: "Engineering at Meta"
sourceTitle: "An Organizational Second Brain: Building an AI That Learns From Experts"
sourceUrl: "https://engineering.fb.com/2026/09/02/ml-applications/organizational-second-brain-ai-learns-from-experts/"
author: "Shaurya Sengar, Jason Nawrocki, Jay Shah and Prashant Kommireddi"
tags: ["artificial intelligence", "architecture", "testing", "maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Meta has described an architecture for building specialised agents that accumulate institutional knowledge without requiring a new model-training run whenever an expert corrects an answer. The proposal is useful because it treats agent maintenance as a software-engineering problem: changes should be small, traceable, verifiable, and reversible.

The system separates four responsibilities. The first is a structured knowledge base organised as files containing positions, vocabulary, routing indexes, and applicability conditions. Each file declares dependencies and consumers through YAML metadata, creating a bidirectional graph that helps engineers trace the impact of a change. The second responsibility is a procedural layer, called recipes, that describes how to reason step by step without mixing domain rules with the analysis method.

This separation makes failures easier to classify. If the correct information was available but the agent failed to use it, the problem belongs to the procedure. If the necessary information was missing, it is a knowledge gap. When experts disagree, the system should flag ambiguity and escalate it instead of inventing a single answer. It is a practical application of a familiar maintainability principle: separating data, logic, and validation makes each layer easier to debug.

Meta also divides context by density and usage frequency. Stable knowledge that is consulted often lives in a curated wiki-like layer, while more specific documentation is left to semantic or lexical retrieval. According to the company, restructuring the agent around composable procedures reduced tokens consumed per turn by about 80 percent, because each query loads only the relevant instructions and sources.

The most important part is the improvement loop. An expert correction is diagnosed, translated into minimal edits, reviewed by an independent agent, and checked with deterministic structural validation. The system then runs a replay of the original case and a regression suite. Every accepted correction adds the failing scenario to the test suite, so the system does not merely fix one error; it preserves that learning against future changes.

The design retains human checkpoints and escalation paths for ambiguous cases. Meta says that after three development sprints over six weeks, experts reduced individual assessments from days to minutes and saw no regressions across improvement cycles. These are internal results, not a universal guarantee, but the engineering lesson is transferable: dependable agents need a legible architecture, tests that grow with the product, and a clear boundary between automation and human authority.
