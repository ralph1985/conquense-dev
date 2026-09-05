---
translationId: 20260905-github-copilot-coste-por-tarea
lang: en
slug: github-copilot-optimizes-agent-cost-per-task
title: "GitHub shows that optimizing coding agents means measuring the complete task"
description: "GitHub explains how Copilot reduces cost by removing redundant work without cutting the context agents need to finish tasks correctly."
publishedAt: 2026-09-02
sourceName: "GitHub Blog"
sourceTitle: "How we make AI coding more cost efficient without sacrificing task quality"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/how-we-make-ai-coding-more-cost-efficient-without-sacrificing-task-quality/"
author: "Erik Kristensen and Napalys Klicius"
tags: ["applied AI", "coding agents", "software engineering", "optimization", "testing"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

GitHub has published a detailed explanation of how it is reducing Copilot’s cost without optimizing a misleading metric: the number of tokens in each individual call. The central idea is simple and applicable to any coding agent: a shorter response is not necessarily more efficient if it forces the model to repeat commands, recover information, or carry more context through additional turns.

The clearest example involves terminal output. GitHub tested a tool that shortened shell responses and found that, when useful information disappeared, the agent reopened the original output or ran the command again. The local saving became more calls and more time to complete the task. Copilot therefore classifies responses: it preserves source-like output such as `git diff` or `git show`; reorganizes search results without dropping matches; and selectively compresses repetitive noise from installation, build, and test output. The complete output remains available through an explicit recovery path.

The team also removed the line numbers that accompanied every file read. Current editing tools no longer need them, so the formatting only added repeated tokens. According to GitHub, the change reduced inference cost by roughly 5% in offline evaluations and average daily model-inference cost per user by about 3% in an online experiment, with no material regression in tracked quality.

The most instructive part concerns prompts. A compression process reduced the instructions for a tool that launches specialized agents by roughly half. However, an online test found that the new wording caused independent agents to work sequentially instead of in parallel. GitHub stopped the experiment, wrote a regression evaluation for that behavior, and corrected the instruction. The final version removed about 1,300 tokens per turn, but only after showing that it preserved the intended operational behavior.

GitHub also removed unnecessary turns from background work. When a command or sub-agent finishes, the system now delivers the result directly and batches related notifications instead of waking the model to request information it already had.

The technical lesson is not to compress everything. It is to optimize the end-to-end result, preserve information that carries semantic value, and turn important behaviors into tests. In coding agents, efficiency belongs to the execution harness as much as to the model: formats, retries, recovery, and orchestration can determine both the final cost and the final quality.
