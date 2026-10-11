---
translationId: cloudflare-evidence-grounded-agentic-soc-20261007
lang: en
slug: cloudflare-builds-an-agentic-soc-around-reproducible-evidence
title: "Cloudflare builds an agentic SOC around reproducible evidence"
description: "Cloudflare Managed Defense’s new system separates deterministic data collection from model analysis and coordinates specialist agents to reduce hallucinations and scope drift."
publishedAt: 2026-10-07
sourceName: "Cloudflare Blog"
sourceTitle: "Building an evidence-grounded agentic security operations harness on Cloudflare"
sourceUrl: "https://blog.cloudflare.com/agentic-security-operations/"
author: "Deanna Tran, Javier Castro, Jacob Crisp and Blake Darché"
tags: ["cybersecurity", "applied-ai", "observability", "software-engineering", "systems"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Cloudflare has described an architecture for automating part of its security operations work without handing an entire investigation to a single artificial-intelligence agent. The system, integrated into Managed Defense, combines deterministic code, specialist models, and human review. Its technical value is not simply that it uses multiple agents, but that it decides which parts of the process should remain outside a generative model’s control.

Cloudflare’s first prototype used a general-purpose agent to investigate every alert. The experience exposed three predictable but important problems. Context could become authority, so a detection —which is only a hypothesis— could be treated as proof. Scope could drift toward another account, time range, or source. A timeout in a lookup could also become indistinguishable from a search that had found no results. A longer prompt did not solve any of those boundaries.

The revised architecture begins with a model-free reconnaissance phase. Fixed, versioned workflows collect the customer’s identity, detection history, traffic baseline, enforcement outcome, and network observations. Each data point is associated with its source, version, and timestamp. The result is a replayable snapshot. If two runs produce different conclusions, the difference can be attributed to interpretation rather than to each agent querying different data at different times.

Before deeper analysis begins, a lightweight triage model filters alerts that are likely false positives. It compares the event with the customer’s history, previous analyst decisions, and the appearance of the traffic. Alerts that pass the filter go to a coordinator that runs four specialist agents in parallel: traffic analysis, customer context, global telemetry, and threat intelligence.

The result is not presented as free-form prose. Each specialist produces typed findings, and a synthesis agent combines them into a structured advisory. The synthesizer cannot fetch new evidence or choose a classification outside an approved vocabulary. That constraint narrows the error space and makes it easier to audit why a recommendation exists. It also prevents the system from confusing a persuasive explanation with a complete investigation, a common risk when a model can speak more convincingly than it can prove.

For software teams, the pattern is transferable. Tasks that require boundaries, permissions, traceability, or reproducibility should first be handled with code and versioned data. Models can contribute interpretation, correlation, and prioritization after the application has fixed the scope and documented information gaps. This architecture is more work than connecting an agent to a SIEM, but it makes evaluations repeatable, changes comparable, and failed queries visible.

Cloudflare keeps human analysts responsible for final judgment. That is also a sign of operational maturity: automation focuses on assembling evidence, connecting alerts, and presenting options, while impact assessment and mitigation still have a clear owner. In security systems, the useful question is not whether an agent can produce an answer, but whether it can produce an answer whose evidence another team can review and reproduce.
