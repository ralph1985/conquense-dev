---
translationId: gtig-adversarial-ai-agentic-workflows-20260908
lang: en
slug: gtig-adversarial-ai-agentic-workflows-20260908
title: "Google observes attackers moving from prompting to agentic workflows and targeting the software supply chain"
description: "A new Google Threat Intelligence Group report describes operations in which AI reduces human intervention, accelerates credential theft, and expands risk across developer tooling."
publishedAt: 2026-09-08
sourceName: "Google Cloud Blog"
sourceTitle: "GTIG AI Threat Tracker: From Prompting to Autonomy – The Evolution of Adversarial AI"
sourceUrl: "https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai"
author: "Google Threat Intelligence Group"
tags: ["security", "applied-ai", "software-supply-chain", "cloud", "developer-tools"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google Threat Intelligence Group has published a new tracking report on offensive uses of artificial intelligence. Its central conclusion is not that attackers have found a magical tool, but that they are connecting models, agents, and automation into operational chains with fewer human pauses. That reduction in latency changes defense: an organization may have less time to detect an intrusion, understand it, and revoke the access being used.

The report says that during the second quarter of 2026 GTIG observed a campaign in which attackers compromised a cloud resource and, in under six hours, planned, built, and executed an automated mass credential-harvesting operation. The document also describes activity attributed to UNC6780, a group that allegedly used several tactics against AI-based coding assistants, language-model security scanners, and open-source software repositories.

The point most relevant to engineering is the convergence between developer tools and the software supply chain. GTIG says that the use of AI assistants is increasing both the quantity of open-source resources and the variety of components aimed at AI use cases, including MCP servers, model formats, inference engines, and vector databases. Faster adoption can reduce scrutiny of packages and dependencies, precisely while maintainers are receiving more model-generated vulnerability reports and must separate useful signals from noise.

The UNC6780 case illustrates the risk in more detail. According to the report, the group has targeted ecosystems such as PyPI, npm, and Docker Hub, compromised legitimate developer accounts, and published Trojanized forks of MCP servers. The report also describes malware able to detect CI/CD environments, extract OIDC tokens from GitHub Actions runners, and use them to publish compromised packages with valid cryptographic attestations. A valid signature or attestation proves who authorized a publication, but it does not prove that the authorized process was benign.

The practical consequence is that securing coding assistants cannot be limited to the prompt or the model. Teams should treat the execution environment, workspace hooks, short-lived credentials, OIDC tokens, repositories, and dependencies as one operational attack surface. Human review remains important, but it needs context: package provenance, maintainer history, unexpected changes, requested permissions, and installation behavior.

The report does not argue that all AI automation is unsafe. It provides evidence that adversaries are already exploiting the same acceleration that attracts development teams. A reasonable response is to design controls that keep pace with it: least privilege, reproducible publishing, independent artifact verification, runner segmentation, credential rotation, and telemetry able to connect agent actions with actual repository changes.
