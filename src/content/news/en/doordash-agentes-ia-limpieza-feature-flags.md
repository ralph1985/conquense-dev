---
translationId: doordash-feature-flag-agents-20260824
lang: en
slug: doordash-agentes-ia-limpieza-feature-flags
title: "DoorDash automates feature-flag cleanup with AI agents"
description: "A multi-agent system removes stale flags using live experimentation state, isolated worktrees, and deterministic validation gates."
publishedAt: 2026-08-24
sourceName: "DoorDash"
sourceTitle: "Automating Feature-Flag Cleanup at Scale with a Multi-Agent LLM System"
sourceUrl: "https://careersatdoordash.com/blog/automating-feature-flag-cleanup-at-scale-with-a-multi-agent-llm-system/"
author: "Atharv Chandratre and Jai Datar"
tags: ["software-engineering", "applied-ai", "maintainability", "feature-flags"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Feature flags are useful for gradual rollouts, experiments, and emergency controls. They also accumulate technical debt: once a feature is fully deployed, the condition that protected it often remains in the codebase alongside its branches, tests, and dependencies. DoorDash has published a system for automating that cleanup at scale.

The company’s experimentation platform manages more than 60,000 flags across roughly 623 repositories and creates about 2,300 new ones every month. The system classifies a flag as stale when it has not changed for 90 days, is still referenced in code, is not archived or retired, and is not on an exclusion list. A daily process creates a Jira ticket for each candidate.

The problem cannot always be solved with a syntactic transformation. At DoorDash, the flag definition, the client that reads it, and the business logic can be separated across several dependency-injection layers. A seemingly simple cleanup may touch between five and twenty files. The correct value also cannot be inferred from the repository alone: the system must query the live rollout state. An abandoned experiment at 0% should not be treated like an enabled feature, while a partial rollout requires human judgment.

The workflow has two phases. First, an orchestrator agent retrieves tickets, searches the repository, and obtains experimentation metadata through MCP, including rollout percentage and target value. An engineer reviews the report and confirms that value before code is changed. Then specialized agents work in isolated Git worktrees, with up to four concurrent executions per repository. Each agent finds references, applies the appropriate strategy, updates tests, and runs the build, tests, JaCoCo patch coverage, and Detekt static analysis. A pull request is opened only after the checks pass.

In an evaluation of 50 flags, 45 produced usable pull requests, averaging 13.8 minutes and $4.79 per cleanup. Thirty-one merged on the first attempt, fourteen needed a revision, and five required engineer intervention. The single-pass success rate was 100% for simple cases, 94% for medium cases, and 85% for complex ones. DoorDash reported no bugs or regressions in the sample.

The technical lesson is not that a model can delete code without supervision. It is that automation becomes more reliable when it knows the operational state missing from the repository, works in isolated environments, and operates behind verifiable limits. Here, failures mainly appeared as incomplete cleanup in deep call chains, not as incorrect changes. For teams experimenting with coding agents, that boundary—completeness versus correctness—is a more useful metric than counting generated lines.
