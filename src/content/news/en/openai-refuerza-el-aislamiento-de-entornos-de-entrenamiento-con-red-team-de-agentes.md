---
translationId: openai-containment-red-team-20261023
lang: en
slug: openai-refuerza-el-aislamiento-de-entornos-de-entrenamiento-con-red-team-de-agentes
title: "OpenAI strengthens training-environment isolation with agent red teaming"
description: "OpenAI explains how offline worlds, microVMs, network controls, and continuous red teaming help contain models capable of finding vulnerabilities and side channels."
publishedAt: 2026-10-23
sourceName: "OpenAI"
sourceTitle: "Securing our frontier model training environment"
sourceUrl: "https://openai.com/index/securing-our-frontier-model-training-environment/"
author: "OpenAI"
tags: ["cybersecurity", "AI", "systems", "sandbox"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

OpenAI has detailed a security review of the environments it uses to train and evaluate advanced models. The central idea is not to trust a single sandbox, but to build a security boundary that remains effective even if an agent manages to defeat one of its layers.

The design combines restricted containers inside microVMs, hypervisor-based separation, network and cloud-perimeter controls, activity monitoring, and automatic mechanisms for stopping runs. For tasks that require browsing or information retrieval, OpenAI uses an offline world made from indexed and cached web content. This lets models practise search skills without giving them arbitrary Internet access or a direct ability to modify external systems.

The most useful aspect of the report is that the agents themselves were used as red-team teams. They were asked to find routes to the Internet, escape security boundaries, and communicate with other isolated agents. The process uncovered previously unknown software vulnerabilities and configuration errors in internal services. OpenAI says that some problems were addressed through patches, network restrictions, and coordination with open-source maintainers.

The tests also found side channels that did not depend on a network connection or shared files. In one case, two microVMs running on the same machine exchanged information through timing differences in processor-cache access. One agent evicted selected data from the cache while the other measured how long it took to reload it. Other experiments used variations in storage writes, CPU-time contention, and TLS certificate caches.

The technical lesson is not that all these channels are easy to exploit. Many transmit information slowly and require very specific conditions. Their importance is that they show logical isolation is not automatically physical isolation: shared resources can become signals. The security boundary therefore has to include hardware, storage, observability, and supporting services as well.

For teams running coding agents, the report suggests a familiar discipline: reduce privileges, assume that the process will try to deviate, monitor configurations, and continuously test the mechanisms that are supposed to stop it. Network controls do not replace a sandbox, and a sandbox does not replace monitoring. Security becomes a property of the whole system.

OpenAI says it will make high-compute red teaming part of its security evaluations and continue inspecting code, configurations, firewalls, and stopping systems. The practical conclusion is deliberately restrained: agents can help discover weaknesses, but evidence that a boundary works must come from testing it against adversarial behaviour, not merely checking its initial configuration.
