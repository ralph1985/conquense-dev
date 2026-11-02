---
translationId: uclm-physio-galenus-explainable-ai-20261015
lang: en
slug: uclm-physiotherapy-explainable-ai-physio-galenus
title: "UCLM researches physiotherapy AI whose recommendations can be reviewed"
description: "Research from Castilla-La Mancha suggests a useful separation between measurement, decision rules, and professional oversight."
publishedAt: 2026-10-15
sourceName: "UCLM School of Computer Science"
sourceTitle: "Sergio Martínez Cid defiende su tesis doctoral sobre inteligencia artificial para la fisioterapia neurológica"
sourceUrl: "https://esi.uclm.es/index.php/2026/10/15/sergio-martinez-cid-defiende-su-tesis-doctoral-sobre-inteligencia-artificial-para-la-fisioterapia-neurologica/"
author: "Conquense Dev Editorial"
tags: ["castilla-la-mancha", "ai", "architecture", "research"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On October 15, UCLM presented Sergio Martínez Cid's doctoral research into AI support for neurological physiotherapy. Its system combines fuzzy rules, measurements using an inexpensive camera, and recommendations with explanations for the therapist. The work includes Physio Galenus, a modular open-source platform. The university identifies clinical validation and expansion of the language-model prototype as future tasks. [UCLM announcement](https://esi.uclm.es/index.php/2026/10/15/sergio-martinez-cid-defiende-su-tesis-doctoral-sobre-inteligencia-artificial-para-la-fisioterapia-neurologica/).

Its relevance to software engineering lies in the possibility of distinguishing what was observed, what was inferred, and what was recommended. As an architectural interpretation, that separation supports verifiable questions at every stage: which signal entered, how it was transformed, and which criterion produced a suggestion. Explaining a decision can therefore become part of the system's contract, alongside the result presented by the interface.

This distinction also helps frame testing. A team building a similar tool could evaluate data capture, indicator calculation, and recommendation logic separately. It would then need to check how they work together. An incorrect measurement can feed a perfectly implemented rule and produce an inappropriate suggestion; passing a module's tests therefore does not, by itself, demonstrate that the complete workflow behaves correctly.

From a maintainability perspective, retaining versions of the criteria used and the transformations applied to signals would be reasonable. This is a general recommendation, not an additional feature attributed to this platform. If an update changes behavior, synthetic inputs and expected outputs make the difference easier to detect and explain. They also help distinguish an intentional change from a regression, particularly when participating professionals have expertise different from that of the development team.

Oversight also creates product requirements. A support interface should let users understand a recommendation, inspect its relevant data, and express disagreement without losing context. Displaying a lengthy explanation does not guarantee usefulness: evaluation should examine whether a person can identify why a suggestion was made and act on that understanding. Human review needs a concrete workflow within the software, with understandable actions and visible consequences.

The regional value of this research lies in applying engineering and AI to a defined problem with identifiable professional responsibility. Its presentation does not establish general clinical effectiveness or availability in routine care. For technical readers, it offers a case against which to review their own designs: separating measurement from decisions, making recommendations testable, and defining what still requires validation. Those criteria can transfer to other support tools, provided that testing and limitations are adapted to the actual context of use.
