---
translationId: github-secret-detection-classifier-20261013
lang: en
slug: github-contextual-secret-detection-classifier
title: "GitHub combines regexes and a compact classifier to reduce secret-detection noise"
description: "GitHub’s new pipeline uses high-recall candidates and a context-aware ModernBERT model to improve precision and accelerate scanning."
publishedAt: 2026-10-13
sourceName: "GitHub Blog"
sourceTitle: "GitHub’s model for secret detection: Finding more secrets with less noise"
sourceUrl: "https://github.blog/ai-and-ml/githubs-model-for-secret-detection-finding-more-secrets-with-less-noise/"
author: "Batu Ozturkler and Shengyu Fu"
tags: ["security", "secrets", "machine learning", "supply chain"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has described the architecture of its new context-aware classifier for detecting secrets in repositories. The problem is not simply finding strings that look like credentials: a real key can have the same shape as a test value, a documentation placeholder, a checksum, or a public key. If a system raises too many alerts, teams stop trusting it. If it raises too few, a credential may remain exposed.

The published solution keeps discovery and decision-making separate. First, high-recall regular expressions scan content and produce potential candidates. A ModernBERT-based classifier then evaluates each candidate together with its value, file path, variable names, secret type, and a bounded amount of surrounding code. Only candidates with a sufficiently high probability of being real secrets become alerts.

The pipeline operates at two different moments. Push protection can block a change before it reaches a repository. Post-push scanning reviews content that has already been committed and creates alerts for investigation and remediation. According to measurements reported by GitHub, the new model increased owner-weighted precision by 11.5%, reduced median post-push scan execution time by 86%, and lowered serving cost by 98% compared with calls to broader remote models.

The most instructive part concerns the data. Training combines product-derived examples validated by people, regex-generated candidates, weak labels, and synthetic examples designed to represent difficult false positives. GitHub also groups rows that share a repository, candidate value, or example before splitting training and evaluation data. This prevents near-duplicates from appearing in both sets and making the model look better than it really is.

Choosing a small, specialized classifier also contains an architectural lesson. A narrow task with a measurable decision boundary and strict latency requirements does not necessarily need a large generative model. Regular expressions provide inexpensive recall; the classifier contributes context; calibration determines when interrupting a developer is justified. Each component has an understandable responsibility and can be evaluated with different metrics.

For other teams, the pattern applies beyond secrets. A detector for risky dependencies, insecure configuration, or personal data can follow the same sequence: generate broad candidates, classify them with bounded context, and validate against representative traffic. Initial precision is not enough. False positives and missed cases must feed a continuous improvement loop, with evaluation sets protected against leakage.

The practical conclusion is that automated security works best when it is integrated into development and respects the team’s time. Detecting more does not mean protecting better if every new alert becomes noise.
