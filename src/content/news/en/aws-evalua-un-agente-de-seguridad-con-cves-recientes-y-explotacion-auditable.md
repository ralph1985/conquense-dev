---
translationId: aws-security-agent-cve-benchmark-20261015
lang: en
slug: aws-evalua-un-agente-de-seguridad-con-cves-recientes-y-explotacion-auditable
title: "AWS evaluates a security agent with recent CVEs and auditable exploitation"
description: "AWS presented a benchmark for autonomous penetration testing that measures complete exploitation of recent vulnerabilities and audits whether the agent followed the intended path."
publishedAt: 2026-10-15
sourceName: "AWS Security Blog"
sourceTitle: "AWS Security Agent (now part of AWS Continuum) exploited 33 of 37 new real-world CVEs"
sourceUrl: "https://aws.amazon.com/blogs/security/aws-security-agent-now-part-of-aws-continuum-exploited-33-of-37-new-real-world-cves/"
author: "Dazhi Zhang and Hamed Soleimani"
tags: ["security", "applied-ai", "penetration-testing", "vulnerabilities", "evaluation"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

AWS has published an evaluation of its autonomous penetration-testing agent against 37 recent CVEs deployed as containerized targets. The experiment did not give the agent an exploit or proof of concept. It started with an endpoint URL, a short hint and, where applicable, low-privilege seed credentials. To score a capture, the agent had to discover the attack surface, construct the exploit, chain primitives when necessary and extract a flag placed behind the vulnerability.

The reported result was 35 captured flags, but the integrity audit reduced the number of valid end-to-end exploits to 33 of 37, or 89.2 percent. Two captures reached the flag through unintended paths and were reclassified as benchmark faults. In two other cases, the agent found and exploited the bug but took the service offline before it could read the flag. The difference between those numbers matters more than the headline: a security evaluation must verify what happened, not merely whether a correct-looking response appeared.

The targets covered eight vulnerability classes and several types of software, including web frameworks, machine-learning platforms, a container registry, a tRPC API, and commerce and media platforms. The pipeline had seven stages: starting the target in an isolated environment, reconnaissance, specialist agents, finding validation, exploitation using a shell, Python, a real browser and out-of-band callbacks, flag checking, and integrity auditing.

AWS designed the dataset to reduce two forms of contamination. The vulnerabilities were selected from disclosures recent enough to make memorized solutions less likely, and the agent could not query CVE records or public proof-of-concept material during execution. The publication acknowledges that neither control removes contamination completely, since a recent vulnerability may still appear partially in advisories or public discussions.

The validation layer is equally important. The run produced 475 findings: 234 were classified as high-confidence exploitable issues, 82 fell into lower-confidence categories, and 159 were labeled false positives. More than 1,200 additional findings were deduplicated. Separating discovery, confirmation and exploitation is a practical requirement for making a security agent useful in CI/CD; a scanner that produces more alerts does not necessarily reduce human work.

The experiment also leaves an operational warning. An agent capable of chaining file upload, remote code execution or SSRF can cause damage during a test. AWS identifies non-destructive exploitation, target recovery and strict scope enforcement as ongoing work. The lesson for engineering teams is therefore not to replace conventional penetration testing with a striking percentage, but to demand fresh benchmarks, per-case audits, isolation and guardrails before moving that autonomy into authorized but real systems.
