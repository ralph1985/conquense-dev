---
translationId: microsoft-agentic-delivery-primitives-20261027
lang: en
slug: microsoft-agentic-software-delivery-primitives
title: "Microsoft proposes building agentic software delivery around artifacts and evidence"
description: "Microsoft argues that agents do not remove the software lifecycle; they shift human attention toward goals, validation, operations, and interpreting real-world outcomes."
publishedAt: 2026-10-27
sourceName: "Command Line, Microsoft"
sourceTitle: "The new primitives of agentic software delivery"
sourceUrl: "https://commandline.microsoft.com/new-agentic-software-delivery-primitives/"
author: "Tim Bozarth"
tags: ["applied-ai", "software-engineering", "maintainability", "developer-tools"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Microsoft has published a proposal for structuring AI-assisted software delivery around observable lifecycle components rather than only around tools that generate code. The thesis is straightforward: even if an agent can execute more steps autonomously, a dependable system still needs goals, implementation, validation, deployment, and observation.

The publication summarizes the lifecycle in four stages: Plan, Build, Verify, and Observe. Each keeps a human responsibility and produces an artifact that carries the work forward. Plan should leave goals and acceptance criteria. Build produces a candidate implementation, usually a pull request, together with the context behind its decisions. Verify produces auditable evidence about correctness, performance, and security. Observe returns production signals that feed the next planning cycle.

This matters because it avoids treating autonomy as a black box. When an agent creates a change, a team needs to know what the change was intended to achieve, which constraints applied, which tests ran, under what conditions it was released, and what happened afterward. Without those links, generation speed can increase while the ability to review, debug, and maintain the system declines.

Microsoft places a knowledge layer at the center of the flow. It connects goals, design decisions, implementation context, validation evidence, release history, operational signals, and records of agent behavior. The proposal also distinguishes observations from interpretations and preserves the source and version of each item. In practical terms, storing conversations or large volumes of traces is not enough. Knowledge must answer concrete questions and have a verifiable use.

The company compares useful memory with a database index or materialized view. An organization should be able to test whether an agent works better, faster, or with fewer errors when it receives synthesized knowledge. That comparison turns memory from a metaphor into an evaluable hypothesis. It also helps avoid a common problem: accumulating documentation without improving any later decision.

Microsoft points to several implementations related to its products. Copilot can take an issue, create a secure GitHub Actions environment, analyze the repository, change code, run validation, and produce a draft pull request for human review. Code Review supports agent skills and MCP so teams can add repository-specific rules or context from external systems. Instructions, scripts, and resources can also be packaged as reusable skills, ensuring that an effective procedure does not remain trapped in one session.

The proposal is not an independent productivity measurement and comes from a vendor with commercial interests. Its value is closer to a design framework than to a performance promise. For a team adopting agents, the practical recommendation is to define contracts between stages: inputs, outputs, acceptance criteria, evidence, and operational signals. Each agent should be evaluated with the same rigor as the software it produces.

Autonomy does not remove engineering work. It redistributes it. Planning, validation, and observability become more important because they keep the system’s intended behavior connected to what it actually does in production.
