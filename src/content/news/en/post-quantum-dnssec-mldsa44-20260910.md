---
translationId: post-quantum-dnssec-mldsa44-20260910
lang: en
slug: post-quantum-dnssec-mldsa44-20260910
title: "1.1.1.1 begins validating post-quantum DNSSEC, turning signature size into an operational problem"
description: "Cloudflare has added ML-DSA-44 validation to its public resolver, showing why DNSSEC migration requires solving transport, compatibility, and downgrade risks together."
publishedAt: 2026-09-10
sourceName: "Cloudflare Blog"
sourceTitle: "1.1.1.1 now supports post-quantum DNSSEC, all 2,420 bytes of it"
sourceUrl: "https://blog.cloudflare.com/post-quantum-dnssec-1111/"
author: "Sebastiaan Neuteboom and Bas Westerbaan"
tags: ["security", "dns", "dnssec", "cryptography", "quantum-computing"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has enabled 1.1.1.1 to validate DNSSEC signatures generated with ML-DSA-44, a post-quantum algorithm standardized by NIST. This does not mean that all DNSSEC has migrated, nor that a quantum threat is immediate. It is a large-scale deployment test intended to show what happens when signatures become much larger and systems must preserve compatibility for years.

DNSSEC provides authenticity for DNS responses. A validating resolver follows a chain of signatures from the root to the requested domain and can reject responses that have been modified or forged. Common algorithms such as RSA and ECDSA are considered vulnerable to a sufficiently capable quantum computer. Migration is slow because it requires coordination among authoritative operators, registries, registrars, and resolvers.

Size is the first practical obstacle. An ML-DSA-44 signature occupies 2,420 bytes, compared with 64 bytes for an ECDSA P-256 signature. The signature alone exceeds conservative limits commonly used for DNS responses over UDP, before keys, names, and other records are added. When a response does not fit, the server must mark it as truncated so the resolver can retry over TCP or another transport. Cloudflare’s test demonstrates that behavior: the query begins over UDP and finishes over TCP.

This matters for distributed systems because a cryptographic migration can change network patterns, latency, and load. Cloudflare reports that roughly 85% of queries arriving at 1.1.1.1 use UDP, although that figure describes traffic reaching the resolver and does not necessarily describe every connection to authoritative servers. Larger responses may increase TCP retries, so they need to be measured on real networks rather than only in a lab.

The second problem is downgrade. During the transition, a zone may publish conventional and post-quantum signatures so that older resolvers continue to work. But if a modern resolver accepts any valid path, an attacker could try to force it onto the weaker conventional signature. To prevent that, 1.1.1.1 applies a stricter local policy when the parent’s DS record advertises post-quantum support: it requires at least one valid ML-DSA-44 chain and does not treat the conventional path as sufficient.

The distinction matters: validating post-quantum signatures at a resolver does not create a complete chain of trust by itself. Authoritative servers must sign zones, registrars must accept the corresponding DS records, and parent registries must publish them all the way up the delegation chain to the root.

Users of 1.1.1.1 do not need to change their configuration. For operators and infrastructure developers, the announcement is a useful reminder that applied cryptography is also a transport, compatibility, and observability problem. Measuring message sizes, truncation, retries, and fallback policies will be as important as selecting the algorithm.
