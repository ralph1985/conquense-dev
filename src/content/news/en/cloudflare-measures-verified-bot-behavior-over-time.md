---
translationId: cloudflare-verified-bots-accountability-20261016
lang: en
slug: cloudflare-measures-verified-bot-behavior-over-time
title: "Cloudflare wants bots to earn trust through sustained behavior"
description: "Cloudflare’s new system evaluates whether verified bots respect robots.txt, respond to HTTP 429, and maintain responsible traffic patterns over time."
publishedAt: 2026-10-16
sourceName: "Cloudflare Blog"
sourceTitle: "Continuous accountability for Verified bots"
sourceUrl: "https://blog.cloudflare.com/verified-bots-accountability/"
author: "Chris Tsoukaladelis"
tags: ["security", "bots", "web", "ai-agents"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

A bot’s identity answers one question, but not all of them. Knowing who operates an automated agent does not prove that it respects a site’s preferences, slows down when asked, or stops trying after receiving a blocking response. Cloudflare proposes measuring the difference between identity and trust through continuous observation.

The company already uses Web Bot Auth so bots can sign their requests, and BotBase to catalogue that identity in an open format. The next step is to record what bots do after they have been identified. Cloudflare describes a system that builds an explainable trust band from observed patterns rather than issuing a permanent judgment about an operator.

The first signal is robots.txt. The system compares observed traffic with the rules published by a site and looks for repeated patterns of non-compliance rather than a single isolated incident. The technical reference is RFC 9309, which defines the Robots Exclusion Protocol. Cloudflare emphasizes that robots.txt sets minimum restrictions: the absence of an explicit prohibition does not mean every possible behavior is acceptable.

The second signal is the response to HTTP 429, “Too Many Requests.” A site can use it to ask a client to reduce its rate, stop, or wait for a specified period. The system observes whether the bot adapts its traffic after receiving that signal. Slowing down or pausing contributes to a higher trust assessment; continuing at the same rate lowers it when the pattern repeats.

This approach introduces a useful distinction for automated-system design. Risk can change from request to request: one specific request may be harmless while the next may overload an origin. Trust, by contrast, is built from a history of decisions and responses. The proposal therefore does not classify a bot only by its name or certificate, but combines identity with behavioral evidence.

The mechanism connects with other Cloudflare components. Bot Preference Sync lets site owners publish preferences and align them with configured policies; Bot Management determines how the traffic is handled; and continuous observation adds context about whether a bot is respecting those decisions. The company says it is already using the system internally and plans to make it available to customers, who will be able to choose the trust threshold applied.

For teams building crawlers, agents, or public APIs, the practical consequence is that network courtesy should be verifiable behavior, not merely a statement in documentation. Automated clients should interpret robots.txt, handle 429 responses with backoff, and record their decisions. Site owners may find sustained patterns more useful than allowing or blocking traffic based solely on a declared identity. The proposal remains an evaluation mechanism, not a universal guarantee, but it puts operational responsibility inside the technical design.
