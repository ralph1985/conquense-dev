---
translationId: github-ai-android-security-taskflows-20260928
lang: en
slug: ai-agent-android-security-audits-20260928
title: "An AI agent finds 24 Android vulnerabilities, but human review remains decisive"
description: "GitHub Security Lab explains how AI-guided taskflows found vulnerabilities in Android applications and which limitations still matter."
publishedAt: 2026-09-28
sourceName: "GitHub Blog"
sourceTitle: "How we found 24 Android vulnerabilities using our open source AI security agent"
sourceUrl: "https://github.blog/security/how-we-found-24-android-vulnerabilities-using-our-open-source-ai-security-agent/"
author: "Kevin Stubbings"
tags: ["security", "artificial-intelligence", "android", "auditing", "software"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

GitHub Security Lab has published a practical account of how it uses an open-source AI agent to audit Android applications. The team says it found 24 vulnerabilities through specialised workflows, called taskflows, that divide research into smaller steps and steer the model towards specific classes of defects.

The important idea is not asking a model to review an entire repository with one generic instruction. The system first identifies entry points where attacker-controlled data might arrive. It then separates mobile components from other parts of the project and classifies each entry point according to the risks that should be investigated. For Android, the workflows include checks for intents, exported components, broadcasts, WebView and other platform-specific mechanisms.

The team combines several runs. A stricter workflow looks for known patterns, while a broader one tries to connect components and reason about behaviour that does not appear in a single function. Repetition does not make the model an authority; it improves coverage and reduces the chance that a relevant relationship is missed during one isolated review.

The published examples show why context matters. In OsmAnd, an exported activity accepted extras from an external intent that could silently change map settings and send location information to an attacker-controlled server. In the Wikipedia application, a combination of a deep-link parser and a defective domain check could open external content inside a WebView and expose cookies. These are logic and component-integration problems, not simple matches against a list of unsafe functions.

The results also show the current limits of these tools. The model detects many signals, but it often misjudges severity. A vulnerability may depend on a highly unlikely state, a mitigation the model did not notice, or which storage layer takes priority at runtime. GitHub recommends validating every finding with a knowledgeable human and, where possible, building a proof of concept that confirms the actual impact.

For software teams, the operational lesson is clear: AI can expand the reviewed surface when it is combined with an explicit threat model, reproducible tasks and verifiable evidence. It does not replace dynamic testing, manual analysis or maintainer responsibility. Its value lies in turning specialist knowledge into a repeatable process that other researchers can run, inspect and improve.
