---
translationId: uclm-social-debt-ontology-software-teams-20260826
lang: en
slug: uclm-social-debt-ontology-software-engineering-teams
title: "UCLM-linked research turns software teams’ social debt into an analyzable model"
description: "The study published in Software and Systems Modeling proposes a formal ontology for representing coordination, knowledge, and communication problems that are often left outside"
publishedAt: 2026-08-26
sourceName: "Springer Nature"
sourceTitle: "An ontology-based metamodel for the analysis and management of social debt in software development teams"
sourceUrl: "https://link.springer.com/article/10.1007/s10270-026-01413-6"
author: "Eydy del Carmen Suárez Brieva, César Jesús Pardo Calvache, and Ricardo Pérez-Castillo"
tags: ["software engineering", "maintainability", "ontologies", "quality", "castilla-la-mancha"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

A study published in Software and Systems Modeling proposes a formal way to analyze what software-development teams call social debt. One of its authors is Ricardo Pérez-Castillo, from the Alarcos group at the University of Castilla-La Mancha, whose affiliation is listed with the university’s Talavera de la Reina campus. The work matters because it moves into a computable domain problems that often appear in retrospectives or private conversations but are rarely represented in engineering tools.

Social debt describes costs arising from failures in communication, coordination, and collaboration, as well as from unclear organizational structures or decisions. It can appear as role ambiguity, knowledge concentrated in a few people, coordination bottlenecks, or ineffective collaboration patterns. The result is not only team discomfort: it can also lead to rework, defects, delays, and knowledge loss when someone becomes unavailable.

The paper introduces the Social Debt Ontology, an ontology-based metamodel that provides a structured vocabulary for representing causes, effects, community smells, mitigation strategies, indicators, metrics, risks, and processes. The model contains 46 classes, 74 object properties, and 286 individuals. It was implemented in OWL 2 DL with Protégé, following an adaptation of the REFSENO methodology. This makes the relationships explicit and processable by reasoning tools.

Validation combines competency questions expressed through SPARQL queries, logical-consistency checks using the HermiT reasoner, and two case studies. The ontology’s quality was assessed with the FOCA methodology, considering completeness, clarity, consistency, adaptability, and computational efficiency. That combination matters: a taxonomy that is useful for a presentation is not necessarily a model capable of supporting traceability or automated recommendations.

The contribution should not be mistaken for an automatic detector of dysfunctional teams. It provides a reusable framework for making explicit relationships that normally remain scattered across chats, tickets, reviews, and organizational memory. In a future application, the vocabulary could help connect process signals with improvement decisions, provided that metrics are interpreted in context rather than treated as an absolute score for individuals.

The software-engineering lesson is modest but useful: maintainability also depends on how responsibilities and knowledge are distributed. Formalizing these risks does not replace team conversation, but it can improve cause traceability and make some hypotheses testable. For organizations already managing technical debt with data, the ontology offers a route to include the social dimension without reducing it to an informal opinion or a single isolated metric.
