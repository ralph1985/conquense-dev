---
translationId: ci-cd-supply-chain-defense-20260924
lang: en
slug: supply-chain-defense-developer-workstation-ci-cd
title: "Supply-chain defense starts at the developer workstation"
description: "Mandiant proposes a defense-in-depth strategy connecting developer endpoints, repositories, dependencies, CI/CD runners, and production deployments."
publishedAt: 2026-09-24
sourceName: "Google Cloud Blog"
sourceTitle: "Proactive Defense: Hardening Code Pipelines and CI/CD Infrastructure"
sourceUrl: "https://cloud.google.com/blog/topics/threat-intelligence/hardening-code-pipelines-and-ci-cd-infrastructure"
author: "Mandiant"
tags: ["security", "software-supply-chain", "ci-cd", "developer-tools", "zero-trust"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Mandiant argues that software supply-chain security can no longer be treated as an isolated check at the end of a build. Its guide, published by Google Cloud, describes attacks that combine developer workstations, IDE extensions, dependencies, repositories, and CI/CD automation. The practical consequence is that the security perimeter begins before the first commit.

The techniques highlighted include GitHub Actions cache poisoning, OIDC token extraction, and the replacement of mutable tags to publish packages that still appear to have legitimate provenance. The guide also mentions malicious extensions, lookalike dependencies, and AI tools with elevated privileges inside pipelines. The issue is not only that a package may contain malicious code; it may enter through a path the system already considers trusted.

The first proposed layer is the developer endpoint. Mandiant recommends local secret scanning through pre-commit hooks and IDE-integrated tools, together with approved and pinned versions for editors, extensions, and integrations. Tokens should have minimal permissions and short lifetimes. Where possible, development environments should run in hardened containers or virtual machines, with limited access to the host filesystem and network.

For repositories, the guide recommends phishing-resistant authentication, branch protection, and a policy against direct writes to the main branch. Long-lived credentials should be replaced with temporary identities tied to a specific task. For dependencies, it proposes exact versions, verified lockfiles, software composition analysis, and SBOM generation. Third-party images and actions should be referenced through cryptographic digests or commit hashes rather than tags that can change without notice.

The article also focuses on artifacts. It suggests imposing a delay before a newly published version becomes available to builds, routing components through internal proxies with quarantine, and verifying signed provenance before promoting a package. These controls add friction, but they turn dependency installation into a controlled and traceable decision.

In CI/CD, the central recommendation is to reduce persistent state. Ephemeral runners, network boundaries, trust-separated caches, and manual approval for code from forks reduce opportunities for persistence. Permissions should default to none or read-only, and each workflow should request only what it needs.

The technical lesson is that a signature or scanner is not sufficient on its own. Effective defense links identity, isolation, provenance, policy, and monitoring from the workstation to production. Designing that chain also improves maintainability: controls become verifiable configuration rather than informal knowledge held by one person on the team.

AI-generated content.
