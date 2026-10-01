---
translationId: cloudflare-agentic-web-second-audience-20260930
lang: en
slug: the-webs-second-audience-ai-agents-20260930
title: "The web is starting to serve a second audience: AI agents"
description: "Cloudflare data shows how automated traffic is changing and why sites need to distinguish search, training and transactional agents."
publishedAt: 2026-09-30
sourceName: "Cloudflare Blog"
sourceTitle: "The Internet has a second audience"
sourceUrl: "https://blog.cloudflare.com/agentic-web/"
author: "Matthew Conroy"
tags: ["web", "agents", "artificial-intelligence", "architecture", "performance"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Cloudflare argues that the Internet is moving beyond a single audience. Alongside people and traditional crawlers, more software agents are visiting pages to complete tasks requested by users. The claim is based on Cloudflare network data, so it should not be treated as a universal measurement of the whole web. It does, however, describe a technical problem that affects any public site: automated traffic does not all have the same intent.

According to the company, its network grew from an average of 63 million HTTP requests per second at the end of 2024 to about 115 million in 2026. It also says daily requests from AI agents increased by more than 1,700% over the past year and that, on its network, more than half of traffic no longer comes directly from people. These figures depend on one provider’s visibility and classification, but they point to growing pressure on caches, origins, rate limits and transfer costs.

The distinction Cloudflare proposes is more useful than the generic label “bot”. A training crawler collects content to build models; a search crawler helps discover pages; an agent returns when a person wants to compare, book, buy or ask about something. Blocking all of them may reduce costs, but it can also prevent a service from being found or used by the person behind the agent.

This classification changes several architecture decisions. Teams need observability into who requests each resource, how often, which responses are consumed and whether the request leads to a conversion or merely creates load. User-Agent headers and IP addresses are weak signals because they can be spoofed. Cloudflare describes Web Bot Auth, a mechanism in which some operators cryptographically sign requests, as a way to distinguish authenticated agents from impersonators.

The company also proposes separate policies for search, agents and training. That separation could allow a site to remain discoverable in search, refuse the use of its content for training and apply different limits to advertising, documentation and transaction pages. The detail matters because a single blocking policy cannot express the economic value or operational risk of every access pattern.

For developers, the story does not mean that every product must immediately build a second interface for machines. It does suggest reviewing the web as a system consumed by different clients: humans, crawlers and agents. Semantic HTML, clear APIs, well-designed caching, verifiable authentication, rate limiting and cost metrics are parts of the same architecture. The next generation of web performance will not only be about making a page faster for a person; it will also be about deciding which work is worth executing when the caller is software.
