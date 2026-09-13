---
translationId: aws-deception-benchmark-20260909
lang: en
slug: aws-publica-un-benchmark-para-medir-las-falsas-alarmas-de-la-ia-en-seguridad
title: "AWS releases a benchmark for measuring AI security false alarms"
description: "Deception Benchmark evaluates whether models can distinguish real vulnerabilities from safe code that merely looks vulnerable."
publishedAt: 2026-09-09
sourceName: "AWS Security Blog"
sourceTitle: "The state of AI for security: Measuring what matters most for building trust"
sourceUrl: "https://aws.amazon.com/blogs/security/the-state-of-ai-for-security-measuring-what-matters-most-for-building-trust/"
author: "Anshumali Shrivastava and Neha Rungta"
tags: ["security", "applied-ai", "evaluation", "software-engineering"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

AWS has introduced Deception Benchmark, an evaluation suite designed to measure a less visible problem in AI-assisted security: whether a model can distinguish an exploitable vulnerability from code that looks dangerous but is correctly mitigated. The release comes as models are increasingly used for vulnerability triage, code review, threat modeling, and incident response.

The benchmark contains 14,822 samples across 16 languages and more than 70 CWE categories. Its safe cases are built to fool shallow classifiers. In one type of challenge, two snippets share the same suspicious pattern and only a subtle fix closes the exploitation path. In another, the code is identical but the deployment context changes the outcome: a Kubernetes NetworkPolicy can block an SSRF path, or an IAM boundary can prevent privilege escalation.

The design requires two kinds of error to be separated because aggregate accuracy hides the trade-off. The false-positive rate measures how often safe code is flagged as vulnerable, representing the noise an engineer must investigate. The false-negative rate measures how often a real vulnerability is classified as safe. AWS suggests that keeping both below 10% is a minimum production bar, although none of the general-purpose models tested reaches that target on this evaluation.

With direct prompts, the models detected a large share of real vulnerabilities but also flagged between 41% and 99% of safe cases, depending on the configuration. Prompts that asked for proof of exploitation reduced false positives by 17 to 74 percentage points, but missed between 7% and 44% of real vulnerabilities. The result shows why recognizing a pattern is not the same as understanding whether a mitigation actually works.

The labeling process is also significant. Every case went through multiple independent, blind reviews. Disagreements were escalated for adjudication, and unresolved cases were moved out of the scored set rather than being forcibly relabeled. The final scored set contains 9,695 samples, while another 5,127 are held out to make optimization through memorization more difficult. According to AWS, human review of 100 randomly selected scored cases found no labeling errors.

The practical value is not turning the benchmark into an automatic certificate. It is requiring security tools to report the cost of being wrong. A system that flags almost everything can appear sensitive while overwhelming the team until important alerts lose credibility. Deception Benchmark is released with its data and evaluation workflow, but without the labels, providing a reproducible way to compare systems. For high-risk code, human review and verification of the deployment environment remain necessary.
