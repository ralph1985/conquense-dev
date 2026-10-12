---
translationId: reviewbench-open-benchmark-code-review-agents-20261005
lang: en
slug: reviewbench-measures-ai-code-review-agents-more-realistically
title: "ReviewBench proposes a more realistic way to measure AI code review"
description: "GitHub has published an open benchmark combining real pull requests, human review, static analysis, and production-oriented metrics."
publishedAt: 2026-10-05
sourceName: "GitHub Blog"
sourceTitle: "ReviewBench: An open benchmark for AI code review"
sourceUrl: "https://github.blog/ai-and-ml/reviewbench-an-open-benchmark-for-ai-code-review/"
author: "Michelle Zhou and Alejandro Carderera de Diego"
tags: ["artificial intelligence", "code review", "testing", "maintainability", "software engineering"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Agents that review pull requests need something more demanding than a collection of examples prepared for a demonstration. GitHub has introduced ReviewBench, an open benchmark designed to measure whether a system finds relevant problems in real software changes and whether it does so with an acceptable level of noise for an engineering team.

The methodology starts with an analysis of 103.9 million pull requests to describe the usual distribution of languages, repository sizes, and change shapes. The evaluation set contains 219 pull requests from 187 public, openly licensed repositories and covers 19 languages. It does not claim to represent every aspect of professional development, but it avoids making results depend entirely on small artificial exercises. The corpus gives more weight to medium and large changes, where an automated reviewer must follow relationships across several files.

The most interesting element is how the reference set is built. ReviewBench gathers candidate findings from human reviews, author follow-up changes, static analysis, and multiple language models. It then semantically groups overlapping findings and validates them with a shared rubric. A finding counts as correct only when it is true, relevant, and non-trivial. An independent audit by senior engineers agreed with the benchmark labels in 96.6% of cases.

The benchmark also separates two problems that are often mixed together. Grounded precision and recall measure how closely an agent matches defects already included in the reference set. Augmented metrics also evaluate new findings that were not present in that set. This prevents a system from being automatically penalized for discovering a legitimate issue that no previous label captured. At the same time, grounded recall remains the primary cross-system comparison because the denominator of augmented metrics changes according to what each system discovers.

The connection to production is another important feature. In a GitHub code-review experiment, changes that ReviewBench predicted as improvements moved in the same direction in the online experiment: precision increased by 8% and recall by 13.6%, while cost per review fell by 8%. Comment volume increased by 61%, but severity breakdowns made it possible to distinguish more critical findings from minor observations.

The technical lesson is not that a benchmark replaces human reviewers. It is that AI-assisted review needs evaluation that is reproducible, versioned, and connected to observed production outcomes. ReviewBench can help compare configurations, detect regressions, and choose between broader coverage and lower noise. Its limitations matter as well: 219 pull requests are still a small sample, and the design reflects GitHub’s practices. Results should therefore complement, rather than replace, testing on a team’s own repositories and workflows.
