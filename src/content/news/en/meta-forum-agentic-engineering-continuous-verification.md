---
translationId: meta-forum-agentic-engineering-20261015
lang: en
slug: meta-forum-agentic-engineering-continuous-verification
title: "Meta built Forum around continuous verification, not code generation"
description: "Meta’s experience with Forum shows how AI agents can participate in software engineering when precise specifications, automated tests, and recorded evidence surround their work."
publishedAt: 2026-10-15
sourceName: "Engineering at Meta"
sourceTitle: "How Meta Built Forum With AI-Native Engineering"
sourceUrl: "https://engineering.fb.com/2026/10/15/ml-applications/how-meta-built-forum-ai-native-engineering/"
author: "Shengbo Guo, Bohou Luo, Shubhojeet Sarkar, Vivian Qu, Max (Xiangjun) Fan, Prerna Jain, Mike Plumpe, Chinmay Abhyankar, R"
tags: ["applied-ai", "software-engineering", "testing", "maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Meta has published how it built Forum, a standalone application for going deeper into Facebook Groups conversations, using an AI agent as a participant in the engineering process. The story matters because it does not present the model as another autocomplete tool. Instead, it places the agent inside a loop that plans, implements, builds, tests, corrects, and verifies the work again.

The central difference is the success criterion. For Meta, a task is not complete when the code compiles. It must pass automated tests, visual checks, and human review supported by evidence. Each change arrives with build results, test outcomes, and recorded verification sessions. The agent can work asynchronously, but responsibility for the result remains with an engineer.

That model requires turning planning into a precise technical specification. Meta describes machine-readable context, rigorous decomposition, and pass/fail signals integrated directly into the workflow. It also uses navigation agents that interact with the application as a person would: they read the interface, execute paths, and detect regressions. They do not replace every test, but they increase how often selected critical paths can be exercised.

The project’s architecture was part of the experiment as well. The team prioritized straightforward, modular code because agents learn patterns from the repository. When a weak abstraction remains in place, it tends to reappear in later sessions. To reduce context errors, agents received tools for checking the simulator’s actual state, view hierarchy, and available routes instead of relying on textual descriptions or approximate screen coordinates.

Meta also separated experimentation from production through an independent build flavor. The prototype environment shares code, frameworks, and the design system, but physically excludes experimental code from the production binary. Designers and other collaborators can therefore test changes with AI tools without placing those changes inside the application used by customers.

The team further automated stress tests involving aggressive scrolling, rapid navigation, random group browsing, and repeated media loading. Meta says one of these runs exposed a memory issue that the agent helped reproduce, isolate, and fix before launch; the company reports that the change roughly halved memory use and page faults across repeated sessions. Forum reached core feature parity with Facebook Groups in eight weeks, although that figure comes from Meta itself and is not an independent comparison.

The technical lesson is more restrained than the phrase “coding with AI.” The bottleneck moves from writing code to verifying that the result matches the intended outcome. Teams that want to use agents safely need checkable specifications, tools that expose real system state, repeatable tests, isolated prototypes, and human review that is fast because it receives structured evidence. Speed by itself merely accelerates mistakes as well.
