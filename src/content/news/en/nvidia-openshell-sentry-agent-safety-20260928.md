---
translationId: nvidia-agent-safety-openshell-sentry-20260928
lang: en
slug: nvidia-openshell-sentry-agent-safety-20260928
title: "NVIDIA moves agent security outside the model with OpenShell and Sentry"
description: "The proposal combines an isolated runtime with independent hardware monitoring to control permissions, observe drift, and stop unauthorized actions."
publishedAt: 2026-09-28
sourceName: "NVIDIA Technical Blog"
sourceTitle: "NVIDIA Open Agent Safety Platform: A Reference for Continuous In-Silicon Agent Monitoring"
sourceUrl: "https://developer.nvidia.com/blog/nvidia-open-agent-safety-platform-a-reference-for-continuous-in-silicon-agent-monitoring"
author: "John Myers, Alex Watson, Ali Golshan and Ofir Arkin"
tags: ["security", "ai agents", "sandboxing"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

NVIDIA has presented a reference architecture for protecting artificial intelligence agents through controls that live outside the model and the agent’s main process. Its proposal combines OpenShell, an open and isolated runtime, with Sentry, a supervisor that can run independently on BlueField-4 data processing units.

The design decision addresses a familiar problem: a model may receive security instructions, but it should not be the only entity responsible for obeying them. An agent that writes code, uses tools, accesses files, or makes network requests can drift from its goal because of an ambiguous instruction, a bug, an unexpected dependency, or a sequence of actions nobody anticipated. If the policy lives inside the same process being controlled, the boundary may be too close to the surface it is meant to protect.

OpenShell places the agent in a sandbox with kernel-level isolation. Operators can define which files, networks, tools, processes, and credentials it may access. The policy is checked before execution begins and enforced while the agent works. The architecture includes a gateway for managing identities, lifecycles, and policies, along with a supervisor that inspects network requests and supplies credentials only when policy allows them. Allow and deny decisions are recorded for auditing.

Sentry adds a second, out-of-band layer. According to NVIDIA, the component uses BlueField-4 and DOCA software to observe agent interactions, policy decisions, and access to tools and data. Because it sits in a domain separate from the host, it can detect drift and enforce a policy without relying on the agent’s cooperation. In the described design, it can also act as an interruption or quarantine mechanism when activity attempts to leave its boundaries.

The article summarizes the architecture in five principles: policies should be verifiable; enforcement should be independent of the agent; the path to the model can serve as a control point; granted authority should grow alongside the ability to inspect behavior; and responsibility should be shared by labs, enterprises, and infrastructure providers. These are not substitutes for code review, well-managed identity, or abuse testing, but they help place each control in a specific layer.

The practical importance lies in shifting security’s center of gravity. A prompt saying “do not access this file” is an instruction; a policy enforced by an isolated runtime is a technical boundary. The first may help guide the model, but the second is what should protect a real system.

The proposal is optimized for NVIDIA platforms, although the company says OpenShell can extend to other systems. As with any reference architecture, integration work remains: test policies against real tasks, review false positives, define least-privilege access, protect the administration channel, and verify that telemetry is sufficient to reconstruct an action. The strongest message is not that hardware solves agent security, but that agents need independent, observable controls that are difficult to bypass.
