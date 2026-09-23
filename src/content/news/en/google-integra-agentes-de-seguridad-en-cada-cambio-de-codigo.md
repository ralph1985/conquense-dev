---
translationId: google-agentic-security-infrastructure-20260918
lang: en
slug: google-integra-agentes-de-seguridad-en-cada-cambio-de-codigo
title: "Google integrates security agents into every code change"
description: "Google describes a pre-submit scanning system that combines models, call graphs, structural rules, and human review to reduce vulnerabilities before they reach production."
publishedAt: 2026-09-18
sourceName: "Google Cloud Blog"
sourceTitle: "Changing the game: Using agentic AI to secure infrastructure code"
sourceUrl: "https://cloud.google.com/blog/topics/systems/using-ai-agents-to-secure-google-infrastructure/"
author: "Andrés Lagar-Cavilla and Parthasarathy Ranganathan"
tags: ["security", "ai", "software-engineering", "devops", "supply-chain"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google has published a description of its approach to using artificial-intelligence agents for infrastructure-code security. The proposal is not simply to ask a model to review a pull request. Instead, it distributes the work across fast analysis, repository-specific context, deterministic validation, and a second nightly layer. The general lesson matters to any organization increasing the speed of code generation.

The first change is temporal. Rather than relying mainly on large, periodic scans, Google runs a pre-submit scan for each change across every layer of the stack. The technical argument is that a small change needs less context than a full-system review and can return useful feedback to the developer or agent that produced it. Security therefore becomes a check close to the moment of writing, similar to a linter or static analysis integrated into the normal development flow.

To reduce false positives, the system uses localized threat models. The context comes not only from static documents, but also from live codebase metadata and a dependency and call graph spanning packages and libraries. Google reports that this strategy has reduced false-positive rates to roughly 3% in some cases. That figure is a company-reported result rather than an independent audit, but it illustrates a sound principle: security context must evolve with the code instead of remaining as forgotten documentation.

The fast response is split into two steps. A lightweight scan produces candidates, and a specialized agent validates them using abstract-syntax-tree analysis, call-graph traversal, and pre-indexed safety rules. Google says this triage achieves more than 92% precision and completes in under a minute under its internal conditions. A post-submit scan then runs during nightly integration testing to find risks that only appear when several changes interact.

The loop ends with a repair agent. Using the finding and a generated proof showing how the vulnerability can be exercised, it proposes a patch consistent with internal coding standards and returns it to the original human review. This distinction matters: automating remediation does not remove review, but it shortens the time between detection and a concrete fix proposal.

The design offers several transferable recommendations. Keep generation, analysis, and triage agents separate to limit bias; combine models with structural validation; keep threat models current; and retain human approval for sensitive changes. Google has also evolved Mantis, its open-source multi-agent review harness. The value of the approach is not handing security over to a model. It is building a system with context, evidence, and operational boundaries that can work at the actual speed of software development.
