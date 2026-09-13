---
translationId: google-toolgrad-tool-use-data-20260910
lang: en
slug: google-toolgrad-genera-primero-las-cadenas-de-herramientas-para-entrenar-agentes
title: "Google generates tool-use chains first to train better agents"
description: "ToolGrad reverses the usual synthetic-data workflow by building a valid API sequence before writing the user request that it should satisfy."
publishedAt: 2026-09-10
sourceName: "Google Research"
sourceTitle: "ToolGrad: Efficient tool-use dataset generation with textual gradients"
sourceUrl: "https://www.research.google/blog/toolgrad-efficient-tool-use-dataset-generation-with-textual-gradients/"
author: "Zhongyi Zhou and Ruofei Du"
tags: ["applied-ai", "agents", "tool-use", "machine-learning"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google Research has introduced ToolGrad, a method for generating training data for tool-using agents. Its central idea reverses the usual order: instead of first inventing a user request and asking another agent to discover how to solve it through trial and error, ToolGrad first constructs a valid chain of API calls and then writes the user request that the chain should satisfy.

The change targets a familiar bottleneck. Tool-use datasets need examples that connect an intention to an executable sequence of calls. A query-first approach can waste substantial effort: a generated instruction may be ambiguous or impossible, forcing a search agent to explore alternatives before finding a solution. ToolGrad starts with an explicit solution, making intent annotation more direct and requiring one model step to connect the query and the answer.

The system organizes the process into four modules. The API Proposer selects candidates to extend the current workflow. API Executors test the selected calls in parallel and produce execution reports. The API Selector reviews those reports, keeps the best-performing call, and appends it to the chain. Finally, the LLM Updater rewrites the query and answer to match the accumulated API set. The cycle repeats until it produces a sample containing a request, a verified workflow, and a final response.

ToolGrad borrows the idea of textual gradients from TextGrad: a critic describes in natural language what should improve, and that signal guides the next iteration. Here, the system is not optimizing only a static prompt but a sequence of operations that can become longer and more complex. In its experiments, Google used ToolBench, a database containing more than 16,000 APIs, and reported a 99.8% pass rate for generation compared with an earlier search-based approach.

The team also generated ToolGrad-500 and fine-tuned Gemma 3 models with 1 billion, 4 billion, and 12 billion parameters. On the Berkeley Function Calling Leaderboard, the 12-billion-parameter model scored 83.1, close to Gemini 2.5 Pro at 83.2 and Claude 4.5 Opus at 82.8, and above the published GPT-5 score of 74.4. These are results reported by Google and depend on the dataset, fine-tuning process, and evaluation configuration.

The technical lesson is that data quality can matter as much as model size. A workflow that executes successfully provides a more verifiable signal than a vague intent followed by expensive exploration. The method does not remove production problems, however: APIs change, tools have permissions and side effects, and a synthetic workflow does not guarantee that an agent will handle errors, limits, or ambiguous decisions well. ToolGrad improves the manufacture of training material; operational reliability still requires contracts, tests, and observability.
