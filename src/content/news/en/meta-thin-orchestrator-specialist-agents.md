---
translationId: meta-thin-orchestrator-20261019
lang: en
slug: meta-thin-orchestrator-specialist-agents
title: "Meta makes its data agents more reliable by shrinking the orchestrator"
description: "A Meta system separates deterministic routing from domain reasoning and uses specialized agents with isolated context to reduce errors in data pipelines."
publishedAt: 2026-10-19
sourceName: "Engineering at Meta"
sourceTitle: "The Thin Orchestrator: How We Made Our AI Agents More Reliable by Giving the Router Less to Do"
sourceUrl: "https://engineering.fb.com/2026/10/19/ml-applications/thin-orchestrator-ai-agent-architecture/"
author: "Meta Engineering"
tags: ["applied-ai", "systems", "software-architecture", "reliability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Meta has described a production-agent architecture whose central component deliberately does very little. Its orchestrator is about 1,300 lines long, coordinates more than 20 workflows, and routes requests to 14 specialized agents. It does not generate configurations, reason about domain code, or directly touch the repository. It classifies, gathers information, applies checks, and delegates.

The problem emerged while automating column onboarding in Meta’s recommendation systems. The process spans three repositories, three programming languages, and as many as six stages that must remain synchronized. The first design used one agent loaded with every schema, generation rule, validation requirement, and pattern from more than ten data sources. It worked in demonstrations, but in production it mixed conventions from one subsystem with those of another.

Meta found that increasing the context did not solve the problem. With manually tailored instructions, the single agent reached a 70% to 80% success rate; without that preparation, success dropped to 10% to 20%. The company’s interpretation is that this was not primarily a prompting failure, but an architectural limit: too many responsibilities and too many incompatible patterns inside one context.

The solution separates two layers. The first is a deterministic orchestrator that classifies intent, checks whether the target already exists, gathers required fields, discovers available information, applies reliability gates, and handles errors. The second contains domain specialists with isolated context: one understands schema registries, another generates code for data sources, and another handles validation. Only delegation uses intensive language-model reasoning.

The system follows a fixed seven-step protocol and organizes phases through workflow templates. Column onboarding can follow schema, validation, population, and testing; a migration can reuse the same agents in a different order. For Meta, this allows new capabilities to be added through templates rather than by creating an agent from scratch. Knowledge is loaded at runtime from domain-organized files, so an update does not require changing the orchestrator.

According to the company, preparing a new column went from three or four days manually, and about a day with the previous configuration-driven system, to less than an hour. Roughly two-thirds of changes land without significant human edits. These are internal results and should be treated as evidence from one concrete system, not as a guarantee for every multi-agent design.

The idea is nevertheless transferable. Routing, duplicate detection, permissions, and quality gates are often deterministic decisions and should remain outside the model. Domain reasoning can live in smaller agents with explicit inputs, bounded knowledge sources, repeatable steps, and error handling. This boundary limits failure propagation: one specialist can fail without contaminating the system’s entire state.

The architecture also improves maintainability. A new agent should follow the same structure as the existing ones, and a new use case should first attempt to reuse current specialists through a template. In applied AI systems, more context does not always mean more intelligence. Sometimes it simply creates more opportunities to mix rules that should never have shared the same space.
