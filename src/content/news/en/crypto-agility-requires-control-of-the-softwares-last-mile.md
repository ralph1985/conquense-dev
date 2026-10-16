---
translationId: crypto-agility-open-source-last-mile-20261014
lang: en
slug: crypto-agility-requires-control-of-the-softwares-last-mile
title: "Crypto agility requires control of software’s last mile"
description: "Cisco connects post-quantum migration and faster vulnerability discovery with a less visible problem: the ability to update dependencies and deploy fixes."
publishedAt: 2026-10-14
sourceName: "Cisco Blogs"
sourceTitle: "Cryptography Rarely Fails Because of the Math"
sourceUrl: "https://blogs.cisco.com/security/last-mile-of-trust-post-quantum-cryptography-open-source"
author: "Jonathan Felten"
tags: ["security", "cryptography", "pqc", "open-source", "supply-chain"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

A Cisco article argues that many cryptographic failures do not begin with broken mathematics, but with the inability to deliver a fix to every system that needs it. The point becomes more important under two simultaneous pressures: AI tools are accelerating vulnerability discovery, while the transition to post-quantum cryptography requires libraries, protocols, and configurations to change across infrastructure that cannot all be updated at the same pace.

Cisco defines crypto agility as the ability to change algorithms, protocols, libraries, and implementations with minimal disruption and without unnecessarily replacing the underlying infrastructure. In practice, the model depends on four elements: abstraction, inventory, pipeline velocity, and the capacity of upstream projects.

The first two are familiar. Cryptographic choices should be configurable rather than hardcoded into every service, and an organization should know which systems use each primitive. That inventory is not enough, however. Teams must also be able to move a change from the project maintaining a library to the entire fleet, and they must verify that the external project has the resources to produce updates, fixes, and interoperability support.

That final point is the article’s central thesis. An SBOM can list open-source dependencies, but it cannot answer an operational question by itself: who has the capacity to fix them, and how long will the organization take to adopt the change? Cisco describes upstream capacity as a risk that often has no owner, budget, or control objective. For critical dependencies, assuming that a small team will maintain an essential part of the internet indefinitely is not a resilience strategy.

The connection to AI is concrete. The article says models reduce the cost of finding defects, but remediation still requires triage, patch design, review, release, and deployment. The number of findings can grow with computing capacity; remediation remains constrained by people, processes, and release windows. If the update pipeline does not improve, automated discovery can enlarge the queue of problems without reducing exposure time.

As an example, Cisco describes its three-year sponsorship of the OpenSSL Foundation, funding one foundation engineer and a Cisco engineer seconded to work on the library, QUIC, post-quantum cryptography, and DTLS 1.3. The example does not prove that a migration is secure by itself, but it shows how upstream maintenance can be treated as supply-chain risk reduction.

The technical recommendation is to measure the final mile: how many days pass between an upstream fix and its actual deployment. From there, teams can remove private patches where possible, maintain actionable inventories, and contribute sustainably through code, review, interoperability testing, or CI capacity. Crypto agility is not only about choosing new algorithms; it is about having a system capable of changing them.
