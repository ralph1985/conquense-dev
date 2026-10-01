---
translationId: cloudflare-cryptolabe-post-quantum-migration-20260929
lang: en
slug: cryptolabe-ai-post-quantum-migration-20260929
title: "Cloudflare uses AI to locate classical cryptography before its post-quantum migration"
description: "CryptoLabe combines repository, configuration and dependency analysis to turn a large-scale cryptographic migration into a verifiable inventory."
publishedAt: 2026-09-29
sourceName: "Cloudflare Blog"
sourceTitle: "Using AI to chart a course for our post-quantum migration"
sourceUrl: "https://blog.cloudflare.com/ai-driven-cryptography-discovery/"
author: "Sharon Goldberg and Tiago Silva"
tags: ["security", "cryptography", "post-quantum", "artificial-intelligence", "maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Cloudflare has explained how it is using AI to prepare a post-quantum migration across a platform made up of many products, repositories and dependencies. The company sets 2029 as a target for full post-quantum readiness, but the technical value of the post lies in its inventory and analysis method rather than in a simple adoption date.

The problem starts with a familiar difficulty: cryptography is not always visible in the code that uses it. It may arrive through a shared library, a TLS default, a configuration file stored in another repository or an external dependency. Searching for names such as RSA or X25519 with plain text produces both false positives and false negatives. The same algorithm may also be used in TLS, JWTs, SSH or an internal protocol, and each case requires a different migration path.

To handle that complexity, Cloudflare is developing an internal tool called CryptoLabe. Its process has two stages. The first maps repositories and searches source code, manifests, lockfiles, scripts, tests, documentation and configuration for relevant signals. The result is a set of unclassified observations. The second stage re-examines each observation, follows its runtime behaviour, checks related repositories and looks for contradictions, test-only code or configuration that changes the original meaning.

The tool assigns categories such as classical cryptography, external dependency or insufficient evidence. The last category is essential: when the system cannot justify a classification, it should state that more information is needed instead of filling the gap with an assumption. Reports are prepared for two audiences: product managers, who need to understand scope, and engineers, who need to know what must change and which dependencies may block the work.

The most instructive case involves prerequisites. An application may be ready to change its own code while still depending on a library, token issuer, browser, certificate authority or protocol that does not yet support the post-quantum alternative. Size limits can also appear: post-quantum signatures and certificates are larger, so a certificate carried in an HTTP header may exceed old assumptions in intermediaries or applications.

Cloudflare acknowledges that it does not yet have a ground-truth dataset for measuring prompt coverage reproducibly. It therefore presents CryptoLabe as an iterative process requiring review by the teams that own the systems. The lesson for other organisations is deliberately practical: AI can accelerate the discovery of cryptographic debt, but migration still needs inventory, metrics, dependency traceability and human validation. Grep is a useful starting point; it is not a completion criterion.
