---
translationId: agentes-ia-privacidad-seguridad-contextual-20261005
lang: en
slug: agentes-ia-privacidad-seguridad-contextual-20261005
title: "Google proposes a contextual layer for controlling AI-agent security"
description: "A CAPS workshop report identifies three structural difficulties of autonomous agents and proposes combining contextual policies, sandboxing, user controls, and dynamic evaluation"
publishedAt: 2026-10-05
sourceName: "Google Research"
sourceTitle: "Open and Emergent Problems in Agentic Privacy and Security: A Contextual Angle"
sourceUrl: "https://research.google/blog/open-and-emergent-problems-in-agentic-privacy-and-security-a-contextual-angle/"
author: "Eugene Bagdasarian and Marco Gruteser"
tags: ["artificial-intelligence", "agents", "privacy", "security", "software"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google Research has published a workshop report on the open privacy and security problems raised by AI agents. The document brings together work from more than fifty researchers and practitioners connected to the Contextual Agent Privacy and Security workshop, and advances a useful engineering idea: controlling an agent is not only about giving it fewer permissions, but about evaluating whether each action is appropriate to its specific context.

The report identifies three differences from traditional deterministic software. The first is input ambiguity: an agent interprets natural language, images, and documents that may contain malicious or unclear instructions. The second is probabilistic control flow: the system may choose different plans and routes for similar requests, making its behavior harder to secure with conventional testing. The third is autonomy, including delegation between agents. When a task continues over time and is divided into subtasks, asking the user for confirmation at every step stops being practical and can create approval fatigue.

The conceptual proposal draws on the theory of contextual integrity. Rather than treating privacy as absolute secrecy or as a fixed permission list, a system should reason about who is communicating what information, to whom, and under which rules. An assistant may need personal data to book a trip, but that does not mean it should share the data with every tool discovered during the process.

To bring the idea into architecture, the report describes a supervisory layer with a contextual policy engine. Before a tool call is executed, the agent would propose an action and the engine would evaluate the data flow, the agent’s identity, the request context, and the applicable rules. The policy could be generated or adjusted dynamically as available tools or task goals change. In practice, this looks less like binary authorization and more like capability decisions with expiry, traceability, and revocation.

The report does not present a ready-to-install product or a standardized protocol. Its value is in organizing a research and design agenda. The proposed defense is deliberately multilayered: system sandboxing, model reasoning, understandable user controls, limits on agent collaboration, and governance mechanisms across organizations. It also calls for multi-agent evaluation environments, similar to an `Agent Gym`, that can measure long-running interactions and cascading failures.

For software teams, the consequence is concrete. An agent that can read data and execute actions needs its own identity, least-privilege permissions, decision logs, tool simulations, and prolonged abuse testing. Prompt reviews or checks of the final result cannot cover emergent behavior on their own. Security for these systems will need to observe the complete path: intent, plan, tools, transferred data, result, and side effects.
