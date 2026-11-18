---
translationId: agent-host-protocol-session-continuity-20261117
lang: en
slug: agent-host-protocol-cross-device-agent-sessions
title: "Agent Host Protocol: continuing a session requires explicit state design"
description: "GitHub explains its protocol for sharing agent sessions across applications. The technical lesson concerns reconnections, actions, and permissions."
publishedAt: 2026-11-17
sourceName: "GitHub Blog"
sourceTitle: "Building the Agent Host Protocol for sessions that continue across devices"
sourceUrl: "https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/"
author: "Conquense Dev Editorial"
tags: ["architecture", "applied-ai", "distributed-systems", "typescript"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 17, GitHub published an explanation of Agent Host Protocol, initially developed in VS Code to share agent sessions across clients. Its architecture uses URI-identified channels and reducer-based state, with the server acting as the authority. The authors describe TypeScript and Rust implementations and interoperability problems discovered when connecting them. The proposal addresses a concrete need: continuing work when switching applications or devices. [Source: GitHub Blog](https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/).

That design invites examination of a question that also affects collaborative tools and operations dashboards: what does recovering a session actually mean? Displaying message history is insufficient if the user cannot tell whether an operation is still running, awaiting authorization, or finished. An interface needs to represent the state of the work and how certain it is about that state. During a disconnection, that certainty may be limited.

As a hypothetical example, imagine a task that modifies a file and runs tests. The laptop loses its connection immediately after sending the instruction. When the user opens their phone, automatically resending the operation could duplicate its effects. A careful design would distinguish an instruction awaiting transmission from one received, started, or completed. It should also define how to identify repeated attempts and retrieve their results. These are evaluation criteria for any implementation; having a shared protocol does not, by itself, demonstrate that they have been addressed.

For frontend teams, this suggests separating confirmed state from state presented optimistically. A button can respond immediately without claiming that the server accepted the action. An approval submitted from two devices also requires an explicit resolution rule: accept the first, reject the outdated one, or request a new decision. Hiding that distinction behind a generic loading indicator makes both user understanding and diagnosis harder.

Validation should reproduce those situations. One useful test would disconnect the client after transmission but before acknowledgment. Another would open two clients holding different versions of the same state. It would also be useful to check what happens when a permission changes while an action is pending. These tests target observable properties: no duplicate effects, recovery of the result, and understandable messages when an action becomes invalid.

Security deserves the same explicit treatment. Being able to inspect a session should not automatically imply permission to execute commands in its environment. When evaluating an integration, identity, authorization, and tool scope deserve separate examination. Continuity across devices adds value when it preserves those boundaries and makes it possible to understand who authorized each operation. For a team exploring this architecture, a good first experiment would be to implement an action with a verifiable effect, interrupt the connection, and demonstrate that its result can be recovered without repeating it.
