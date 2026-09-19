---
translationId: ai-augmented-aadl-vscode-20260916
lang: en
slug: ia-aadl-vscode-arquitectura-verificable
title: "SEI brings AI and verifiable architecture analysis to VS Code"
description: "An AADL extension connects coding agents with semantic validation, latency analysis, and traceable results for modeling complex systems."
publishedAt: 2026-09-16
sourceName: "Software Engineering Institute"
sourceTitle: "AI-Augmented AADL in Visual Studio Code"
sourceUrl: "https://sei.cmu.edu/blog/ai-augmented-aadl-in-visual-studio-code/"
author: "Colin Dempsey and Lutz Wrage"
tags: ["software-architecture", "applied-ai", "model-based-engineering", "verification", "developer-tools"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

The Software Engineering Institute has introduced a Visual Studio Code extension that brings AADL tooling into the usual development environment and connects it with AI-assisted coding tools. AADL, an SAE International standard, describes software and hardware components, processors, memories, buses, communications, operating modes, and properties that can be analyzed automatically.

The proposal starts from a familiar limitation of generative models: producing text that looks valid does not prove that an architecture is valid. A model may contain unresolved references, incorrectly applied properties, incomplete flows, or timing assumptions that do not mean what the author intends. The extension therefore combines language services with architecture-specific instantiation and analysis.

The tool provides syntactic and semantic diagnostics, completion, navigation, contextual documentation, reusable AADL packages, and component instantiation. It can also run end-to-end latency, bus-load, and mode-reachability analyses, producing results in formats such as CSV, HTML, DOT, or SMV. The system builds on open-source components related to OSATE and can be used from VS Code or through a command-line interface.

The workflow described by SEI has six steps. The engineer defines the architectural objective, its constraints, and acceptance criteria. An agent generates or modifies AADL source. The language server returns model-specific diagnostics, which help correct references, types, and properties. The model is then instantiated and the relevant analyses are run. The resulting reports inform the next design decision and remain available for review.

To demonstrate the approach, the researchers built a flight-controller example with separate packages for data types, hardware, software, and deployment. The model includes sensors, primary and backup processors, memory, physical and virtual buses, control flows, nominal and degraded modes, and latency bounds. The agent helped generate repetitive declarations, respond to diagnostics, fill in properties, and maintain reproducible instructions. Deterministic validation remained the responsibility of the tooling and the engineers.

That distinction matters. A model producing no diagnostics means that it satisfies the rules known to the server. Successful instantiation means that the declared architecture is coherent for that step. A latency result within a bound shows that the supplied values satisfy that calculation under its assumptions. None of those conditions alone proves that the requirements are correct, that the measurements are real, or that the model fully represents the physical system.

The lesson for other teams is to treat AI as part of an evidence-producing loop, not as an architectural authority. Models need explicit requirements, domain libraries, reproducible analyses, provenance for values, and human review. Within that frame, an agent can accelerate writing and the exploration of alternatives without turning plausible output into an engineering decision. It is less spectacular than total autonomy, but considerably easier to defend.
