---
translationId: copilot-runtime-rust-incremental-rewrite-20260916
lang: en
slug: copilot-runtime-rust-incremental-rewrite-20260916
title: "GitHub rewrites the Copilot runtime in Rust through an incremental migration"
description: "The transformation of more than 800,000 lines shows how to separate a shared runtime, reduce process boundaries, and validate an agent-assisted rewrite without stopping delivery."
publishedAt: 2026-09-16
sourceName: "The GitHub Blog"
sourceTitle: "Migrating the GitHub Copilot runtime to Rust, using Copilot"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/migrating-the-github-copilot-runtime-to-rust-using-copilot/"
author: "Stephen Toub"
tags: ["rust", "typescript", "ai", "software architecture", "developer tools"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

## A rewrite with an unusual constraint

GitHub has described how it moved the shared agent runtime behind Copilot CLI, Copilot App, Copilot SDK, and other products to Rust. The project ended with more than 800,000 lines of production Rust and replaced a runtime that was originally written in TypeScript on Node.js and V8. The important part is not the language choice by itself, but the architectural problem that made the decision necessary.

The runtime had grown around a terminal application. When a reusable SDK was needed, the SDK eventually launched the CLI as a separate process and communicated with it through JSON-RPC. That design was quick to ship, but every consumer had to start Node and V8, accept their memory overhead, and pay a process boundary for each call. It also complicated diagnosis: a failure in the Node process could take down the entire session.

Rust matched GitHub’s specific requirements: an embeddable library exposed through a C ABI, lower startup and memory overhead, more predictable resource use, and a stronger base for integrating clients written in C#, TypeScript, Python, Go, Java, or Rust. The article also makes an important qualification: this does not make Rust the mandatory destination for every large TypeScript application. The choice depended on embedding, density, and runtime-isolation requirements.

## Changing the architecture while the product stays alive

The migration also helped separate the terminal interface from the runtime core. GitHub rejected a mass replacement and chose to replace components one at a time. Each change removed the TypeScript implementation and left a thin adapter into Rust, keeping the main branch shippable. As a result, pull requests were smaller, easier to review, and easier to associate with possible regressions.

Validation combined existing end-to-end tests with progressive releases. Across roughly fourteen weeks, the team published 135 versions, using pre-release builds first where possible. That cadence made it possible to observe failures in real consumers, identify which recent change had caused them, and fix them without waiting for a final migration. By late August, the runtime was entirely Rust, while end-to-end tests remained mostly TypeScript.

## The lesson for other teams

Agents wrote most of the ported code, but the safety mechanism was not trust in automatic generation. Component boundaries, a continuously shippable branch, existing tests, interface contracts, and gradual rollout were the decisive controls. The case presents a restrained use of AI in maintenance: accelerate an expensive transformation without turning it into an irreversible bet.

For smaller teams, the lesson transfers even if the scale does not. Before rewriting, identify the performance or integration boundary that justifies the change, isolate the core from its interfaces, and design a sequence of substitutions that can be verified in production. The technology may change; delivery discipline remains the most important component.
