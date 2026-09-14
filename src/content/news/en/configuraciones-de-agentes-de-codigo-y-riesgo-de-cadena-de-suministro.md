---
translationId: ai-agent-harness-supply-chain-defects-20260907
lang: en
slug: configuraciones-de-agentes-de-codigo-y-riesgo-de-cadena-de-suministro
title: "Coding-agent configuration is becoming a supply-chain security dependency"
description: "A study of 3,171 repositories finds confirmed defects in configurations for coding agents, MCP servers and shared skills."
publishedAt: 2026-09-07
sourceName: "arXiv"
sourceTitle: "Scanning the Harness: An Empirical Study of Supply-Chain Defects in AI Coding-Agent Configurations"
sourceUrl: "https://arxiv.org/abs/2609.07360"
author: "Benjamin Kapner, Carmel Soceanu, Alicia Petrunin, and Hofni Gartner"
tags: ["security", "artificial-intelligence", "coding-agents", "supply-chain", "mcp"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

A study published on arXiv raises an issue that many organisations still treat as local configuration: the files that direct a coding agent form a new layer of the software supply chain. Instructions, skills, hooks, subagents and MCP server declarations may come from public repositories or marketplaces and run with the developer's privileges. In practice, they look more like installable packages than ordinary documentation.

The authors analysed 3,171 public GitHub repositories: 2,660 setups combining at least two component types and 511 published skill collections. The study design tries to avoid a common source of exaggeration in security research: it does not count every scanner match as a vulnerability. Rules had to be decidable from files or the filesystem, and each finding was checked through an independent second implementation and separate validation sessions.

The main result is that 16% of the analysed setups contained at least one confirmed security defect. In 9.8% of setups, an MCP server was declared without a pinned version; 3.1% granted permissions that allowed arbitrary execution behind an apparently limited scope; and 3.8% included a skill that pre-approved shell access. Including non-functional defects, 16.7% contained at least one confirmed defect. The study did not confirm credential-exfiltration paths, an important qualification because it defines what the evidence actually demonstrates.

The unpinned-version problem is familiar to any team that has managed npm, PyPI or container images. A declaration such as npx -y followed by a server name can download a different version whenever the agent starts. Without a lockfile, digest or change review, execution depends on whatever was published at that moment. The difference is that the process may have access to source code, local files, the network and credentials available to the session.

The technical response is not to ban every agent, but to apply engineering controls that are currently missing. Teams should pin MCP server versions and hashes, review permissions using genuinely restrictive semantics, separate read and write operations, and statically analyse skills and hooks before adoption. It is also useful to record which components load in each project and run CI checks for overly broad permissions or unexpected changes.

The paper has limitations: it studies public repositories, measures file-decidable rules and acknowledges that its prevalence figures are lower bounds. Even so, it offers a useful and testable conclusion: an agent's harness should receive the same inventory, review and update discipline as any other privileged dependency.
