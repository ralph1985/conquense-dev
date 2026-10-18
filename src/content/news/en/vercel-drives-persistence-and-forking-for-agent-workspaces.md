---
translationId: vercel-drives-agent-workspaces-20261015
lang: en
slug: vercel-drives-persistence-and-forking-for-agent-workspaces
title: "Vercel separates persistent agent workspaces from execution environments"
description: "Vercel Drives preserves files across sandboxes, shares datasets, and creates isolated workspaces for agents running tasks in parallel."
publishedAt: 2026-10-15
sourceName: "Vercel Engineering"
sourceTitle: "Introducing Vercel Drives: persistent storage for agents"
sourceUrl: "https://vercel.com/blog/introducing-vercel-drives-persistent-storage-for-agents"
author: "Kevin Sundstrom, Harpreet Arora, Elisabeth Rülke"
tags: ["ai-agents", "architecture", "sandbox", "storage"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Agents that work across multiple sessions need to preserve more than conversation history. They also need files, dependencies, intermediate results, datasets, and working memory when the environment running their code changes. Vercel has made Drives generally available for Sandbox with that goal: separating persistent state from the ephemeral sandbox that uses it.

A Drive is created once and mounted as a directory when a sandbox starts. If the environment terminates, the files remain available for a later run. An agent can change runtime or compute capacity without rebuilding its entire workspace. The interface uses the Vercel Sandbox SDK and lets an application retrieve a Drive by name before mounting it in the new environment.

The separation addresses a common problem in agent architectures. The execution environment should be replaceable to support isolation, scaling, and dependency control; working state, however, needs continuity. Mixing the two concepts forces every run to rebuild files or turns a temporary container into an improvised database. Drives provide a clearer boundary: the sandbox executes, while the Drive persists.

The feature also supports collaboration between workers. One agent can prepare a dataset on a Drive, while other sandboxes mount it read-only to analyze it or produce reports. When several strategies need to modify the same starting data, a Drive can be forked. Each fork inherits the source content, region, and maximum size, but receives its own writable workspace. Workers can experiment in parallel without changing the original copy.

Forks do not merge changes automatically. That choice matters: the system provides isolation and a common starting point, not a version-control system for incompatible results. If two agents modify the same file, the application must decide how to compare, validate, or integrate their outputs. Persistence solves state availability; it does not replace data contracts or result review.

Vercel says Drives are generally available for Sandbox, with a default size of 1 TiB—or 1 GiB on Hobby—and up to 16 TiB depending on configuration. Those figures describe capacity, not a guarantee that every dataset fits the operating model. Teams still need to define lifecycles, permissions, regions, fork cleanup, and the handling of sensitive information.

The announcement matters because it shows agent architecture moving from isolated sessions toward durable, reproducible workspaces. For an application, the question is no longer only which tools an agent can call. It must also ask which state the agent may retain, who can read it, how it branches, and how it is recovered. That separation can simplify complex systems, provided persistence is treated as an explicit, governed resource rather than a convenient folder without boundaries.
