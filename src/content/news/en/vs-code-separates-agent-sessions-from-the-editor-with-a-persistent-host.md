---
translationId: vscode-agent-host-2026-08-26
lang: en
slug: vs-code-separates-agent-sessions-from-the-editor-with-a-persistent-host
title: "VS Code separates agent sessions from the editor with a persistent host"
description: "Microsoft introduces Agent Host and the AHP protocol to keep agent sessions active, synchronized, and accessible from different local or remote clients."
publishedAt: 2026-09-06
sourceName: "Microsoft"
sourceTitle: "Introducing the Agent Host for persistent, portable agent sessions"
sourceUrl: "https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture/"
author: "Rob Lourens, Connor Peet, and Brigit Murtaugh"
tags: ["software-engineering", "ai-agents", "architecture", "developer-tools"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

Microsoft has introduced Agent Host, a separate process responsible for keeping VS Code agent sessions alive. The proposal, described in a post published on August 26, addresses a practical problem with coding assistants: a long-running session should not disappear because a user closes a folder, switches windows, or connects from another device.

Until now, the local agent ran inside the extension host associated with each VS Code window. That boundary isolated extensions from the editor core, but it also tied the agent lifecycle to one particular window. Closing that window stopped the runtime and reopening another required loading part of the infrastructure again. Agent Host moves session state, adapters for different agents, and baseline workspace capabilities into a dedicated process.

The architectural change is more significant than simple persistence. Multiple windows can connect to the same host and display the same session without creating copies. A user can start work in the editor, continue from the Agents window, and, when the host runs on another machine, monitor it from VS Code for the web through SSH or development tunnels. The session keeps its state while the clients observing it change.

To coordinate these clients, Microsoft has published the Agent Host Protocol, or AHP. The protocol does not try to standardize how each agent reasons. Copilot and Claude retain their own SDKs, execution loops, tools, and provider-specific capabilities. AHP standardizes the session experience exposed to clients: conversations, permissions, progress, cancellations, and workspace changes.

Its design is deliberately state-first. The host owns the authoritative version, while clients receive a snapshot followed by an ordered stream of actions. Clients can apply changes optimistically, reconcile them with sequenced responses from the host, and replay missed actions after reconnecting. This approach reduces the need for every interface to understand the internal details of each SDK.

The protocol channels are URI-addressable and include sessions, chats, terminals, and changesets. The changeset model describes code changes without requiring storage to be a Git repository: it can also represent virtual file systems. Libraries and clients already exist for Rust, TypeScript, Kotlin, Go, and Swift.

The technical lesson for teams building agent-enabled tools is straightforward: durable sessions need an execution boundary independent of the interface, authoritative state, and an explicit synchronization mechanism. AHP is still under development, but its separation between host, client, and harness provides a concrete foundation for remote and multi-agent experiences without mixing responsibilities.
