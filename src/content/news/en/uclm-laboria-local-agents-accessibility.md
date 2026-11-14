---
translationId: uclm-laboria-local-accessible-agents-20261108
lang: en
slug: uclm-laboria-local-agents-accessibility
title: "LaborIA proposes local agents for an accessible workplace"
description: "The UCLM project addresses voice and gesture interaction and provides a case for examining autonomy, errors, and user control."
publishedAt: 2026-11-08
sourceName: "School of Computer Science · UCLM"
sourceTitle: "El proyecto LaborIA, del grupo AIR, para hacer accesible el trabajo de oficina"
sourceUrl: "https://esi.uclm.es/index.php/2026/11/08/el-proyecto-laboria-del-grupo-air-para-hacer-accesible-el-trabajo-de-oficina/"
author: "Conquense Dev Editorial"
tags: ["castilla-la-mancha", "accessibility", "applied-ai", "software-architecture"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 8, UCLM presented LaborIA, an AIR research group project led by Santiago Sánchez Sobrino. It will develop assistance using voice, gestures, and local AI for people with motor disabilities. Its design includes actions through accessibility APIs, confirmations, and reversal. An evaluation involving around twenty people and a demonstrator at Toledo's National Hospital for Paraplegics are planned. These are development and validation plans, according to the [School's report](https://esi.uclm.es/index.php/2026/11/08/el-proyecto-laboria-del-grupo-air-para-hacer-accesible-el-trabajo-de-oficina/).

The proposal provides a concrete case for examining an architectural question: how to turn a person's expressed intention into an operation they can understand, authorize, and correct. For application developers, this question invites a review of which actions their software exposes and how much those actions depend on visual details. An interface may be understandable at a glance while inadequately describing the purpose of its controls to other forms of interaction.

As an engineering criterion, it would be useful to evaluate each complete task rather than restricting measurement to command recognition. In a hypothetical email example, understanding the recipient would be only part of the job. The content and attachments would also need checking, alongside a distinction between preparing a draft and sending it. An error in any of those steps changes the outcome even when the initial transcription is correct. This example illustrates a possible evaluation; it does not describe an already validated LaborIA capability.

Recovery deserves equivalent attention. A useful test could deliberately introduce ambiguity and observe whether the person can clarify it without abandoning their usual interaction method. It would also be relevant to measure how many interventions they need to correct a step and whether they understand the final state. Such measures would help separate speed, effort, and control, three dimensions that an overall task completion figure can obscure.

Another proposed criterion is to make the scope of each permission explicit. Consulting information, modifying a document, and sharing it should be distinguishable when reviewing behavior. For a maintainable implementation, developers could define action contracts with inputs, outcomes, and predictable errors. Tests would then have something concrete to inspect, and application changes could be evaluated against that contract.

Local execution should not, by itself, become a general guarantee either. A technical review would need to consider logs, temporary storage, updates, and access to the device, alongside processing. These are suggested evaluation points, not shortcomings attributed to the project. LaborIA's relevance to Castilla-La Mancha lies in bringing together a specific accessibility problem and software decisions that can be tested. Evidence of its effectiveness will need to come from the planned validation, keeping announced objectives separate from the results eventually obtained.
