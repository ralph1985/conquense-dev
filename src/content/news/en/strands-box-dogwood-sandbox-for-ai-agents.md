---
translationId: strands-box-dogwood-sandbox-20261007
lang: en
slug: strands-box-dogwood-sandbox-for-ai-agents
title: "Strands Box adds history-dependent policies to agent sandboxes"
description: "AWS introduces an open-source sandbox that combines operating-system isolation with contextual rules for controlling files, networks, interpreters, and MCP tools."
publishedAt: 2026-10-07
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing Strands Box: AI agent sandboxes powered by Dogwood"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-strands-box-ai-agent-sandboxes-powered-by-dogwood/"
author: "Fernando Dingler"
tags: ["security", "AI agents", "sandboxing", "open source"]
readingTime: 6
aiDisclosure: "AI-generated content."
---

AWS has introduced Strands Box, an open-source sandbox licensed under Apache 2.0 and initially available as a developer preview. Its purpose is to control agents that read files, execute commands, generate code, and call APIs. The proposal starts with an important distinction: isolating a process limits where it can enter, but does not determine which actions it may legitimately perform inside that space.

Box combines two layers. The first uses operating-system isolation mechanisms such as macOS Seatbelt to establish hard boundaries around the file system and network. The second integrates Dogwood, a policy language whose local engine decides whether an action may proceed. Policies can depend on context and history rather than only on a static permission list. For example, an agent could post progress updates to an incident channel while being limited to three messages every ten minutes.

Decisions are applied at several interception points: network egress, a shell interpreter, a Python interpreter, and a broker for MCP servers. Each operation is recorded using a common representation. Reading a file through shell or Python produces the same type of event, and an HTTP request is evaluated consistently even when it originates from different tools. This normalization makes it possible to write policies around observable effects instead of relying on the agent to describe its actions correctly.

The egress gateway also addresses a common problem: real credentials do not need to enter the agent’s environment. The agent receives a placeholder token, and the gateway attaches the secret when forwarding an authorized request. The system supports bearer tokens, custom headers, basic authentication, query parameters, and AWS SigV4 signing. This reduces direct secret exposure, although the gateway and policy-enforcement components become part of the trusted computing boundary.

AWS acknowledges several design limits. The interpreter that enforces policies runs outside the sandbox, which expands the trusted computing base. Direct access configured in the Box file may be protected by containment without appearing in policy history. The first implementation focuses on macOS, while support for additional operating systems remains future work.

The proposal is relevant to teams using agents in development, operations, or incident response. A confirmation prompt inside the agent does not provide the same guarantee as a policy enforced outside its process: the former observes a declared intention; the latter can inspect files, destinations, HTTP methods, and accumulated effects. Before production use, teams would still need to review the code, test escape paths, define least-privilege policies, and observe failure behavior.

The lesson extends beyond AWS: safe autonomy requires isolation, contextual authorization, and traceability together. An agent should not have to remember its limits; the environment should enforce them.
