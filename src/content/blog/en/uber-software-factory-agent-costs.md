---
translationId: uber-software-factory-2026-08-27
lang: en
slug: uber-software-factory-agent-costs
title: "Uber turns AI-assisted development into a cost and operations discipline"
description: "Uber explains how it measures and optimizes a fleet of agents involved in code review, CI, incident response, and maintenance. The technical value lies in its metrics, feedback loo"
publishedAt: 2026-08-27
sourceName: "Uber Engineering"
sourceTitle: "Running a Software Factory Efficiently at Uber Scale"
sourceUrl: "https://www.uber.com/us/en/blog/efficient-software-factory/"
author: "Uday Kiran Medisetty"
tags: ["applied-ai", "software-engineering", "developer-tools", "mcp", "observability"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

## AI development also needs cost engineering

Uber has published a detailed account of how it operates AI tools across the software development lifecycle. The company says that more than 70% of its pull requests are attributed to local or cloud agents, that it maintains more than 3,600 agent skills, and that those skills are executed more than 30,000 times per day. These are internal figures, but the value of the post is not only its scale. It shows which metrics and controls become necessary when agents stop being occasional tools and become part of daily operations.

Uber’s cost model breaks each session into six multiplying factors: users, sessions per user, turns per session, requests per turn, tokens per request, and price per token. This separation makes it possible to distinguish usage growth from operational waste. A larger bill, for example, may come from higher adoption, oversized contexts, or excessive reasoning turns. Each cause requires a different intervention.

The company also tries to measure delivered value rather than consumption alone. For managed agents, it tracks cost per merged pull request, review, alert, or cleanup task, together with quality signals such as revert rate, F1, and mean time to recovery. This approach matters because a cheap response is not necessarily successful if it creates more manual review or later failures.

The optimizations described include model selection through benchmarks built from real work. Uber compares precision, recall, F1, cost, latency, timeouts, and noise to choose configurations that occupy a reasonable quality-price frontier. It also tunes prompt caching: interactive sessions receive a longer window because engineers often leave them idle for several minutes, while subagents keep a shorter cache because their tasks are brief.

Another issue is the context size introduced by MCP tools. Loading many schemas directly can add tens of thousands of tokens before a task starts. Uber addresses this with a common gateway, CLI-based tool resolution, and on-demand search. It also uses code mode to batch calls and keep polling loops outside the model’s active context. In its tests, this pattern reduced token use by more than 50% for small queries and by more than 90% in batched workflows.

The practical lesson for other teams is specific: scaling agents requires cost observability, evaluation on real tasks, and carefully bounded permissions and context. Uber’s percentages are not automatically reproducible elsewhere, but its equation and methodology provide a useful basis for measuring whether automation delivers value or merely creates more activity.
