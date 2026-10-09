---
translationId: uber-redlining-agent-feedback-rules-20261008
lang: en
slug: uber-agente-revision-contratos-memoria-reglas
title: "Uber turns contract review into a laboratory for agents with memory and rules"
description: "Uber’s Legal Redlining Agent shows how deterministic rules, semantic retrieval, and expert supervision can automate sensitive work without removing human judgment."
publishedAt: 2026-10-08
sourceName: "Uber Engineering"
sourceTitle: "Scaling AI in Legal: Building Uber's Redlining Agent"
sourceUrl: "https://www.uber.com/au/en/blog/building-ubers-redlining-agent/"
author: "Austin Greco, Meghana Somasundara, Frank Tenente, Sean Po, and Rush Tehrani"
tags: ["applied AI", "agents", "architecture", "TypeScript", "React"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Uber has explained how it built its Legal Redlining Agent, a Microsoft Word add-in that helps legal teams review proposed contract changes. The technical value of the case is not presenting a model as a replacement for lawyers, but showing an architecture that limits the scope of automation, preserves human review, and learns from real decisions.

The system identifies modifications, attempts to infer the other party’s intent, consults internal policies, and recommends accepting, rejecting, or modifying a clause. It also generates comments and flags a risk level. Uber says that, after deployment, average review time fell by more than 20 percent and AI-generated decisions reached 91 percent accuracy. These are internal metrics, but they show why quality should be measured against concrete tasks rather than against a general impression of model capability.

The first version used RAG with playbooks and negotiation examples. The team encountered three familiar problems: semantic similarity did not always retrieve the right precedent, the tone could be inappropriate, and situations absent from the playbooks produced unreliable answers. The response was to record more detail about human intervention: the decision made, the original text, the proposed change, the comments, and the final wording accepted by the lawyer.

That feedback store is queried with metadata filters and a second model-based evaluation layer. A time-decay algorithm gives more weight to recent decisions, reducing the risk of applying outdated policies. This is a significant design choice. The system does not need to continually fine-tune model weights to reflect changing practice; it can change the context supplied at runtime while preserving traceability over the examples used.

The architecture also separates what must be rigid from what can remain interpretive. Non-negotiable policies pass through a deterministic rules engine. Tone, strategy, and other nuances rely on the probabilistic feedback loop. For complex modifications, an agentic workflow uses rules and precedents before drafting a counterproposal, reducing the risk of inventing terms or drifting away from contract definitions.

The add-in is built with React and TypeScript and runs as a Word task pane. The Office API requires caching, minimal round trips, and application-owned state because it has limitations and difficult edge cases around tracked changes. A Python backend coordinates a task graph that runs intent detection, risk assessment, and policy lookup in parallel.

The broader lesson is deliberately practical: a useful agent starts with a constrained workflow, sufficiently rich feedback data, explicit rules, and an interface embedded in the existing tool. Model sophistication comes later. Without those controls, it merely accelerates the production of responses that are difficult to audit.
