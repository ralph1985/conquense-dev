---
translationId: tolap-object-level-access-control-20260922
lang: en
slug: tolap-object-level-access-control-ai-agents
title: "TOLAP moves access control to the point where AI agents retrieve data"
description: "AWS has released TOLAP, an open-source specification and set of SDKs for applying permissions to rows, columns, fields, and results before data enters an agent’s context."
publishedAt: 2026-09-22
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing TOLAP: object-level access control for AI agent tools"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-tolap-object-level-access-control-for-ai-agent-tools/"
author: "Phillip Spies"
tags: ["applied-ai", "security", "agents", "typescript", "access-control"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Authorization for an AI agent does not end when a user is allowed to invoke a tool. The more difficult question comes next: which rows, columns, or documents may that tool return in a particular call? AWS has released TOLAP (Tool-Object Level Access Protocol), an open-source specification that places this control at the boundary between the tool and the data source.

The proposal starts with an important distinction. Role-based access control usually answers whether an identity can reach a resource, but it does not describe precisely enough which fields that identity may see. Attribute-based policies work well when every request passes through a centralized engine; however, an agent may build a query through a tool that holds a direct database connection. Output guardrails do not solve the problem either. By the time a system tries to hide a value in the response, that value may already have entered the model’s context and become available for reasoning, summarization, or extraction through prompt injection.

TOLAP applies policy before information crosses that boundary. Its model can restrict columns, filter rows, cap result sets, hide fields, transform values, or limit endpoints and storage prefixes. The effective policy is resolved for a particular user, organization, and source, then signed to prevent modification and enforced on every call. When several policies apply, the most restrictive combination wins: allowed sets intersect, denials accumulate, and numeric limits become stricter.

The release includes a versioned schema, SDKs for .NET, Python, and TypeScript, a policy server, an authoring console, and fourteen integrations with agent tools and frameworks. Shared fixtures test the common behavior, which matters because three independent implementations could otherwise interpret the same security rule differently. The core packages have no external dependencies, making them easier to embed in functions, edge workers, or plugins.

The architecture also adds signed, expiring contexts, purpose validation, and delegation chains. Deterministic checks should validate the source, action, and scope first; an optional large-language-model judge remains an additional layer rather than a replacement for those rules. TOLAP also states its limitations: it protects only paths where the wrapper is installed, and signed contexts remain reusable until expiry unless replay protection is enabled.

The technical lesson applies beyond AWS. In agent-based systems, data security should be enforced before information reaches the context and on the same path that delivers it. Prompt instructions and post-processing can complement the design, but they should not be the primary authorization boundary.
