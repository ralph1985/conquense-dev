---
translationId: secure-enterprise-agents-2026
lang: en
slug: microsoft-tests-an-enterprise-security-architecture-for-agents
title: "Microsoft tests an enterprise security architecture for agents"
description: "An internal Microsoft pilot combines agent identities, runtime protection, data-loss prevention, and device controls in a real enterprise environment."
publishedAt: 2026-08-27
sourceName: "Microsoft Inside Track"
sourceTitle: "Securing AI agents in the enterprise: Learnings from our journey at Microsoft"
sourceUrl: "https://www.microsoft.com/insidetrack/blog/securing-ai-agents-in-the-enterprise-learnings-from-our-journey-at-microsoft/"
author: "Mark Armstrong"
tags: ["security", "ai-agents", "identity", "enterprise"]
readingTime: 3
aiDisclosure: "AI-generated text reviewed before publication."
---

Microsoft has described an internal pilot designed to test whether AI agents can operate inside an enterprise without bypassing its existing controls. The project brought together teams from Microsoft Digital, Windows, Entra, Intune, Defender, Purview, and Microsoft Security. Rather than announcing an isolated capability, the case illustrates the architectural problem that appears when an agent needs an identity, resource access, network connectivity, and the ability to take action.

The pilot ran inside Microsoft’s corporate tenant, using a dedicated Windows 365 Cloud PC environment for roughly 100 internal users. More than 70 stakeholders from different product and business groups were involved. Scenarios included Windows images with Copilot CLI and OpenClaw, Cloud PC provisioning, Entra agent identifiers, Defender runtime protection, Purview data-loss prevention policies, Intune configuration for devices and agents, and Global Secure Access network controls during execution.

The most important technical decision is to treat agents as distinct actors rather than invisible extensions of a human account. Agent IDs make it possible to distinguish an action performed by a person from one initiated by an agent. That separation creates a foundation for applying permissions, recording activity, and investigating incidents. It does not solve the risk by itself, but it prevents audits from having to infer who acted from a shared identity.

The rest of the design works as a layered defense. Windows 365 provides the working environment; Intune applies configuration to devices and agents; Entra manages identity; Global Secure Access adds network controls at runtime; Defender monitors behavior; and Purview limits sensitive data movement. The value of this combination is that controls follow the agent while it uses tools and data, instead of relying only on filters around the model.

This approach also changes where security must be tested. An agent may appear safe in a demonstration and behave differently when it can access repositories, email, corporate files, or internal services. Microsoft therefore focused the pilot on real work scenarios and on keeping corporate policies enabled. The integration makes it possible to observe whether restrictions survive ordinary use and whether teams can investigate generated actions.

The result should be read within its proper scope. The post is a provider’s own experience report, not an independent evaluation or a guarantee that every organization can reproduce the same level of control. It also does not demonstrate that all agents are safe. It does provide a useful reference for implementation: inventory non-human identities, limit the execution environment, record actions, apply data controls, and test the integration in a representative tenant.

The technical lesson is that agent security does not belong to one product or one model layer. It depends on identity, device, network, data, and monitoring sharing enough signals to govern an action from start to finish. That work is less visible than the conversational interface, but it determines whether automation can genuinely enter daily operations.
