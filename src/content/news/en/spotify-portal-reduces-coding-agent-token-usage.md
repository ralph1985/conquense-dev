---
translationId: spotify-portal-model-routing-20260903
lang: en
slug: spotify-portal-reduces-coding-agent-token-usage
title: "Spotify uses model routing to keep repetitive work out of its coding agent’s context"
description: "An integration between Backstage Portal and Claude Code delegates bulk reads and predictable generation to cheaper models, saving about 90% of primary-model tokens in a monorepo"
publishedAt: 2026-09-03
sourceName: "Spotify Engineering"
sourceTitle: "Spotify’s Backstage Portal cut my Claude Code token usage by 90%"
sourceUrl: "https://www.engineering.atspotify.com/2026/9/spotifys-backstage-portal-cut-my-claude-code-token-usage-by-90"
author: "Dimitri Mazmanov"
tags: ["coding agents", "developer experience", "model routing", "Backstage", "costs"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Spotify describes a practical way to reduce a coding agent’s token usage: separate repetitive input and output from work that genuinely requires reasoning. The solution combines Backstage Portal, its AiKA Modes, and a Claude Code plugin called shunt. In a test on a Java monorepo, bulk reads used approximately 90% fewer tokens from the primary model.

The starting point is that an agent can spend much of its context reading several files, finding patterns, or generating repetitive code. Those tasks are necessary, but they do not always justify using the most expensive model or keeping all the material inside the session context. Spotify treats the shape of the work as a routing signal: the primary model keeps complex decisions while delegating I/O and predictable generation.

An AiKA Mode is a declarative agent running in an ephemeral runtime. It defines instructions, a model, parameters, and MCP tools without requiring the team to operate permanent infrastructure, keys, or long-running servers. A mode can be private or shared across the organization. For the experiment, Spotify created two modes: bulk-reader, which reads multiple files and returns a structured summary, and code-writer, which generates a file from a specification and a reference file.

The shunt plugin adds controls at several layers. Two PreToolUse hooks intercept large reads and commands such as cat or head when they exceed a configurable threshold, with a default of 350 lines. Scripts with named arguments build requests and call the Portal CLI. Two skill files tell the agent when to use those scripts. Targeted reads with an offset and limit remain allowed because the primary model still needs to inspect a specific section in order to edit or reason about it.

The design has clear limits. The worker is not used for editing, debugging, or architectural decisions. The author found that a secondary model could detect surface patterns but miss a subtle security or thread-safety problem. Each delegation adds a network round trip of 10 to 30 seconds, and calls have a 30-second limit; for small tasks, that latency can outweigh token savings. The code-writer also requires a reference file so it does not produce code disconnected from the project’s conventions.

The technical lesson is that optimizing agents is not only about choosing a better model. It also requires designing context boundaries, delegation routes, and mechanisms that prevent the agent from ignoring those rules. Spotify’s result is a localized measurement, not a universal guarantee, but it offers a reusable pattern: reserve the reasoning model for understanding and decisions, and move predictable work to cheaper, bounded, observable components.
