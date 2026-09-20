---
translationId: apache-ai-security-scanning-threat-models-20260903
lang: en
slug: apache-ai-security-scanning-threat-models-20260903
title: "Apache tests AI-assisted security scanning at foundation scale"
description: "The Apache Software Foundation combined specialized models, architectural context, and reviewed threat models to scan 230 repositories without turning every finding into maintainer"
publishedAt: 2026-09-03
sourceName: "The ASF Blog"
sourceTitle: "Security scanning at Foundation scale"
sourceUrl: "https://news.apache.org/foundation/entry/security-scanning-at-foundation-scale"
author: "ASF Tooling and ASF Security"
tags: ["security", "open source", "ai", "threat modeling", "software maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

## The problem is not only finding vulnerabilities

The Apache Software Foundation has described how it ran full security scans across 230 repositories during a three-day window in August. The work combined ASF Tooling infrastructure with ASF Security expertise and research capacity donated through Project Glasswing. The technical interest lies less in any particular model than in the process built around the models.

The foundation was facing two opposing problems. Security teams are receiving more AI-generated vulnerability reports, but many contain false positives or ignore architectural decisions that a project already considers valid. Reviewing them consumes the same limited maintainer time needed to fix real problems. At the same time, running manual audits project by project does not scale when an organization maintains hundreds of repositories.

ASF built a pipeline with three tiers. A light tier performs high-volume filtering, a medium tier inventories what the code contains, and a heavy tier performs analysis that requires deeper reasoning. Models and parameters can be changed at runtime without modifying the pipeline. That separation makes it possible to balance quality, speed, and cost, while comparing different model combinations without redesigning the whole system.

## Context reduces noise

Before scanning, 75 project management committees representing more than 180 repositories prepared threat models. These documents described important components, trust boundaries, deployment decisions, accepted assumptions, and areas outside the scope of the review. ASF Security reviewed each model before it entered the analysis.

The practical result was twofold. The system could focus investigation on the surfaces the project considered important, and maintainers received fewer reports about behavior that was allowed by design. According to ASF, scanning with a reviewed threat model cost roughly one-fifth less than scanning without that context. This is not a magical property of AI; it is the result of avoiding the rediscovery of decisions that were already documented.

Findings were routed through Apache’s official disclosure process. Each project decides what a report means and when to remediate it. Results are also ordered by operational risk, not just by a severity label. An apparently serious vulnerability in a path nobody can reach may wait behind a less dramatic defect affecting a service’s main flow.

## The reusable part for other teams

ASF plans to make scans incremental, preserve result history, and connect changes with fixes and published CVEs. It is also exploring a self-service function with token budgets managed by the foundation.

The lesson for other teams is straightforward: a security assistant needs boundaries, system memory, and a governed disclosure path. A model may suggest a finding, but final quality depends on the threat being modeled, the context it receives, human review, and the ability to turn an observation into a verifiable fix. In open-source security, the bottleneck is not producing more alerts; it is producing alerts that someone can understand and act on.
