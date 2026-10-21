---
translationId: rust-infrastructure-security-cdn-20261012
lang: en
slug: rust-infrastructure-security-cdn-and-ci
title: "Rust hardens the infrastructure behind crates.io and docs.rs"
description: "Rust’s infrastructure team details improvements to security, CDN delivery, observability, dependency automation, and GitHub Actions auditing."
publishedAt: 2026-10-12
sourceName: "Inside Rust Blog"
sourceTitle: "Infrastructure Team 2026 Q3 Recap and Q4 Plan"
sourceUrl: "https://blog.rust-lang.org/inside-rust/2026/10/12/infrastructure-team-q3-recap-and-q4-plan/"
author: "Marco Ieni, on behalf of the Rust Infrastructure Team"
tags: ["security", "supply chain", "cdn", "ci/cd", "rust"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Rust’s quarterly infrastructure recap provides a concrete view of how a large package ecosystem is secured and operated. It is not a language release announcement. Instead, it describes operational controls around crates.io, docs.rs, Rust repositories, and continuous-integration pipelines. For teams maintaining public services or repositories with many contributors, its value lies in the combination of small, verifiable measures.

On the security side, Rust enabled audit-log streaming from GitHub Enterprise, AWS, Heroku, Wiz, Fastly, and Datadog into Cloud SIEM. Centralizing those events does not prevent an incident by itself, but it makes it possible to correlate identity, infrastructure, and provider activity in one analysis system. The project also added Fastly WAF protection and DDoS mitigation for crates.io and docs.rs. According to the report, these measures helped mitigate DDoS attacks during the quarter and reduced the load on the docs.rs server.

The performance work is deliberately unglamorous: the team removed a regular expression from the Fastly code that processes crate downloads and made other adjustments. The result was a 10% reduction in compute time on CDN nodes. Most users will not directly notice because networking dominates download latency, but lower processing cost improves efficiency and leaves more headroom for traffic spikes.

Static crates.io resources, including README files and other assets, were also moved to the network edge. HEAD responses for non-compressible artifacts now include Content-Length, fixing issues encountered with Buck2. In addition, docs.rs sends CDN logs to Datadog, while a small share of traffic was restored on CloudFront as a fallback path. This is an important operational decision: redundant architecture is useful only if the secondary path is exercised before it is needed.

For the software supply chain, Renovate was configured to open updates for dependencies, lockfiles, and GitHub Actions in the Rust repository. Dependabot provides vulnerability alerts, while Rust prefers Renovate to manage automated updates. The project converted seven crates to trusted publishing, reducing reliance on traditional publishing credentials. For workflows, crabwatch runs 23 Zizmor audits by default, with coverage expected to expand gradually.

The report also connects security with governance: controls were added for trusted contributors, merge queues can wait for successful CI before approvals are finalized, and the project plans to deploy infrastructure from a centralized environment instead of personal laptops. The technical conclusion is not that one tool solves supply-chain security. Operational security improves when logs, credentials, updates, configuration, and recovery stop depending on scattered manual steps. The model is transferable to any organization maintaining critical software that needs to demonstrate how it is built, published, and monitored.
