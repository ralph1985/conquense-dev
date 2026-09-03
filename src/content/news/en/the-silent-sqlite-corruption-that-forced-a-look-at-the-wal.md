---
translationId: sqlite-wal-reset-2026
lang: en
slug: the-silent-sqlite-corruption-that-forced-a-look-at-the-wal
title: "The silent SQLite corruption that forced a look at the WAL"
description: "Tailscale’s investigation into a 16-year-old SQLite race condition shows how telemetry, verified backups, and staged rollouts can turn intermittent corruption into a provable fix."
publishedAt: 2026-08-12
sourceName: "Tailscale"
sourceTitle: "How we tracked down a 16-year-old SQLite bug"
sourceUrl: "https://tailscale.com/blog/sqlite-wal-reset-bug"
author: "Alex Chan"
tags: ["systems", "sqlite", "reliability", "databases"]
readingTime: 3
aiDisclosure: "AI-generated text reviewed before publication."
---

Tailscale has published an investigation into a SQLite bug that caused 19 database-corruption incidents in six months inside its control plane. The important part is not only the defect’s age — SQLite developers estimate that it had existed for at least 16 years — but also how a valid, unusual configuration can move a stable system into a risk area that normal testing does not cover.

Tailscale’s control plane is divided into shards. Each shard has a SQLite database and a Go process that uses it as a single writer. The choice is reasonable: SQLite provides serializable transactions and a simple model for storing network and device metadata. The problem appeared in the operational strategy. Tailscale manually controlled checkpoints for the WAL file and ran them very frequently, a configuration supported by SQLite but different from the most common usage pattern.

The corruption was difficult to reproduce. It was not tied to a specific client, shard, time window, or obvious load level. Instead of waiting for a synthetic pattern to emerge, the team added forensic telemetry to production, monitored backups with PRAGMA integrity_check, and created a separate log of SQL transactions. Because SQLite has one writer and linear transactions, that log made it possible to reconstruct changes between backups and reduce the cost of recovery.

The decisive clue came from a debugging tool developed with SQLite maintainers. The defect was a race between a checkpoint and a write transaction: under a very specific timing sequence, the checkpoint could believe it had copied pages from the WAL into the main database file when it had not. Indexes referring to those pages could then be written, leaving the file inconsistent.

The fix added a check to the checkpoint process. The rollout produced another lesson: the first version containing the correction also generated false corruption warnings related to expression indexes and numeric conversions. Tailscale and SQLite withdrew that version, published another with the change isolated, and changed their timestamps to avoid ambiguity in text-to-floating-point conversions.

For engineering teams, the case offers a practical pattern. A backup does not prove that restoration works; it must be checked and rehearsed. A temporary absence of incidents does not prove that a defect has disappeared either. The strongest evidence arrived months after the fix, when an alert confirmed that the race condition still occurred in production but no longer caused corruption.

The conclusion is not that SQLite is unsuitable for large systems. It is more precise: a familiar technology can behave unexpectedly when used outside its most heavily tested operational paths. Specific instrumentation, collaboration with maintainers, canary deployments, and recovery exercises turned an elusive failure into a testable hypothesis and, eventually, a demonstrated fix.
