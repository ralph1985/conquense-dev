---
translationId: github-modernbert-secret-push-protection-20261007
lang: en
slug: github-proteccion-secretos-modernbert-push
title: "GitHub brings a contextual secret classifier into the critical path of a push"
description: "The new ModernBERT-based detector aims to expand preventive protection without turning every false positive into a costly interruption for developers."
publishedAt: 2026-10-07
sourceName: "The GitHub Blog"
sourceTitle: "Secret protection must scale with software"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/secret-protection-must-scale-with-software/"
author: "Erin Havens"
tags: ["security", "secrets", "applied AI", "supply chain", "developer tooling"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has presented a new part of its secret-protection strategy: a ModernBERT-based classifier that analyzes suspicious values together with the code around them. The proposal matters because it treats credential detection as development infrastructure, rather than as a manual review process that can scale at the same rate as the number of changes.

The company says that one in three pull requests now involves an AI agent, compared with fewer than one in ten a year earlier. At the same time, the volume of public pushes grew sharply, while the share of pushes containing credentials showed no statistically detectable trend. The technical reading should be cautious: even if developers do not appear to be more careless, producing more code at higher speed increases the absolute number of opportunities to expose secrets.

The detector attempts to distinguish between a string that merely resembles a password and a credential that is genuinely dangerous. It uses context for that purpose: a value inside a database URL, Kubernetes manifest, or Dockerfile may be suspicious even when it does not match a recognizable provider format. The same context can allow a marker such as changeme when it appears in an example.

According to GitHub, the classifier evaluates batches of candidates in under two milliseconds. That latency is essential. A scanner that runs after a push can spend more time, but a control in the critical path must remain almost immediate. Precision, latency, throughput, and cost form a coupled tradeoff. Repeated false positives erode trust and encourage people to ignore future alerts; a detector that is too expensive or slow cannot run often enough.

Preventive protection does not solve everything. GitHub says that, when additional secret types are included, push protection blocks roughly 30 percent of newly detected secrets, while the remainder is found after entering repository history. From that point, revocation, rotation, reference cleanup, and investigation still require human work. Operationally, blocking cheaply before publication and automating response afterward are separate problems.

The model is in private preview for push protection and is also being added to surfaces such as the /security-review command in Copilot CLI and the Copilot application. GitHub Enterprise Server 3.23 will receive a preview for isolated environments. These integrations are useful because they place the check close to where code is written, including agent-assisted workflows.

For other teams, the lesson is not to adopt one particular model, but to design controls in layers. Pre-commit and push protection should prioritize speed and precision; post-push scanners can use more context; and the response should include automatic revocation when the provider supports it. In an AI-accelerated development cycle, sustainable security depends on prevention and remediation becoming system capabilities, not reminders aimed only at people.
