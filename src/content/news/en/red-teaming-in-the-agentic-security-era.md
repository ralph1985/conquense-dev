---
translationId: agentic-red-teaming-security-2026-08-13
lang: en
slug: red-teaming-in-the-agentic-security-era
title: "Red teaming for attacks carried out by agents"
description: "Google outlines how to adapt offensive exercises and detection when AI automation shortens defenders’ reaction time."
publishedAt: 2026-08-13
sourceName: "Google Security Blog"
sourceTitle: "The Evolving Role of the Red Team in the Era of Agentic Security"
sourceUrl: "https://blog.google/security/the-evolving-role-of-the-red-team-in-the-era-of-agentic-security/"
author: "Daniel Fabian"
tags: ["cybersecurity", "applied ai", "red teaming", "architecture"]
readingTime: 3
aiDisclosure: "This text was AI-generated and reviewed before publication."
---

Security teams have used red-team exercises for years to test whether an organisation can detect, contain, and recover from a plausible attack. A recent post from Google’s Red Teams does not change that goal, but it does change the scenario worth rehearsing: adversaries using AI agents to automate parts of an intrusion.

The technical difference is not that a model fully replaces an expert attacker. The relevant shift is that some repetitive tasks—reconnaissance, classifying discovered information, prioritising compromised systems, or looking for exposed credentials—can run with less human intervention and in parallel. For actors that value volume, this automation can shrink the time between initial access and lateral movement. An alert may therefore reach an analyst after several actions have already been chained together.

The article also distinguishes highly targeted campaigns from indiscriminate operations. In the former, delegating critical decisions to an agent may add noise and endanger valuable tools or access. In the latter, lower precision may be acceptable if it is offset by greater speed and reach. This distinction matters because “agentic attack” should not be treated as a single prediction: risk depends on an adversary’s incentive and on which parts of the chain can be automated reliably.

For defensive teams, the practical consequence is to review response time as a system property, rather than only a SOC metric. It is useful to measure how long logs take to become available, how long a detection takes to correlate, and which controls can act without waiting for manual approval. Teams should also identify legitimate automations in the organisation, the identities they use, and their permissions. An internal agent with broad privileges, weak traceability, or accessible secrets can enlarge the attack surface even if it was created for an innocuous task.

Google recommends a gradual transition in red teaming: first automate bounded modules of a classic exercise, then connect them when they deliver verifiable results. That approach avoids assuming that full autonomy is required on day one. A reconnaissance subagent, for example, can test asset visibility or segmentation quality without being given the ability to alter production systems.

The same idea can benefit defenders. Agents can help summarise evidence, enrich alerts, or propose containment actions, but their design should retain permission boundaries, decision logs, and a clear rollback path. The value of an exercise is not proving that AI attacks quickly; it is discovering which controls stop being sufficient when operational speed increases.
