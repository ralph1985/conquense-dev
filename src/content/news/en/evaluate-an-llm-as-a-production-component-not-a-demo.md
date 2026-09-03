---
translationId: llm-production-evaluation-2026
lang: en
slug: evaluate-an-llm-as-a-production-component-not-a-demo
title: "Evaluate an LLM as a production component, not a demo"
description: "GitHub describes an evaluation lifecycle for LLM-based systems that separates product goals, safety constraints, error analysis, and online experiments."
publishedAt: 2026-08-25
sourceName: "GitHub"
sourceTitle: "How to evaluate LLMs before production"
sourceUrl: "https://github.blog/ai-and-ml/llms/how-to-evaluate-llms-before-production/"
author: "Mariko Wakabayashi and Zixiao Chen"
tags: ["applied-ai", "llm", "evaluation", "devsecops"]
readingTime: 3
aiDisclosure: "AI-generated text reviewed before publication."
---

GitHub has shared lessons from evaluating a language-model-based system designed to reduce false positives in secret scanning. The post is useful because it treats evaluation as a product-engineering task rather than a benchmark competition. A model can perform well on clean data and still fail when it receives the incomplete, ambiguous, or noisy context it will encounter in production.

GitHub’s first proposed step is to define the decision the evaluation must support. In this case, the goal was to reduce unnecessary alerts without losing too many real secrets. False-positive reduction and precision were the primary outcome; recall acted as a safety constraint; and latency, cost, reliability, and compatibility served as operational guardrails. This separation prevents a change from being declared an improvement when it increases precision but pushes recall below an acceptable threshold.

The second principle is to treat offline evaluation as a repeatable integration test. Every meaningful change to the prompt, model, context construction, or surrounding logic should be compared with a known baseline. To make results attributable, GitHub recommends changing one major variable at a time and versioning prompts, configurations, models, and datasets. Without that record, an improvement may be attributed to the model when it actually came from an input change or a pipeline rule.

Data representativeness matters just as much. In a secret-scanning workflow, the model does not always analyze an isolated string. It may receive nearby code, test values, misleading names, and partial context. An overly clean dataset can hide cases where the system reasons about the wrong candidate. The evaluation should therefore preserve the real shape of inputs and add synthetic cases for rare situations, such as placeholders, indirect references, or missing information.

The post also warns about production labels. A developer dismissing or closing an alert does not, by itself, prove that it was a false positive. The credential may have been rotated, the risk accepted, or the alert cleared to unblock a workflow. Labels should be reviewed in ambiguous subsets and connected to the exact question the evaluation is intended to answer.

Error analysis turns an aggregate metric into concrete work. GitHub classifies failures according to whether they came from the model, prompt, input, pipeline, dataset, or label. It also uses another LLM as a judge to prioritize reviews, but treats that judge as an additional prediction: low-confidence, disagreement, and high-impact cases still require human review.

Across its evaluated dataset, GitHub reports a 95% reduction in false positives while keeping recall within its defined guardrail. The result does not prove behavior across every repository, but it illustrates a transferable practice: before trusting an AI system, measure the decision that matters, record how the result was obtained, and carry uncertainty into a controlled rollout.
