---
translationId: project-zero-fixed-disclosure-deadlines-20261113
lang: en
slug: project-zero-security-disclosure-deadlines
title: "Project Zero shortens its deadlines: patches must reach users"
description: "Project Zero’s new disclosure policy prompts a review of how security flaws are received, fixed and delivered to users."
publishedAt: 2026-11-13
sourceName: "Google Project Zero"
sourceTitle: "Policy and Disclosure: 2026 Edition"
sourceUrl: "https://projectzero.google/2026/11/disclosure-policy.html"
author: "Conquense Dev"
tags: ["security", "maintainability", "software-engineering"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

Google Project Zero has announced a transition to fixed vulnerability disclosure deadlines: 90 days after notifying the vendor, 60 days starting February 2, 2027, and 30 days starting January 3, 2028. Publishing details will no longer depend on whether a fix exists. The team links the change to AI accelerating vulnerability discovery and exploitation. [Source: Project Zero](https://projectzero.google/2026/11/disclosure-policy.html).

The practical interpretation for engineering teams is that vulnerability response should be treated as a measurable operational process. An incoming report needs an owner, a reproducible demonstration and an exposure assessment. If those tasks begin only when someone finds time between deliveries, some of the available window disappears before anyone examines the code. An actively monitored reporting channel and a short procedure may be more useful than an extensive document without an owner.

It also helps to distinguish three outcomes: identifying the cause, producing a fix and checking that the protected version is actually in use. These are separate milestones. In a web application, updating a dependency in the repository does not demonstrate that every deployment includes it. For a library, publishing a package likewise does not guarantee that consumers have updated their applications. This distinction helps locate where the response gets stuck and which team can unblock it.

One suggested workflow is to accompany each fix with a regression test that fails against the vulnerable behavior. Related paths and the assumptions that enabled the flaw should then be reviewed. For example, if the problem originates in a missing authorization check, changing a single call may leave equivalent operations exposed. The depth of that review should reflect the defect’s impact and scope, without turning every incident into a general rewrite.

To shorten the path to production, teams should consider preparing an urgent update process in advance: automated validation, gradual deployment, error monitoring and an available rollback. These are editorial recommendations, rather than additional requirements announced by Google. Their value lies in preventing urgency from forcing teams to improvise how they deliver a fix or detect a regression.

The disclosure calendar should not replace risk-based prioritization either. A team needs to assess which functions are exposed, what permissions an attack requires and which users could be affected. The publication date adds a time constraint; it does not answer those questions. For technical leaders, a concrete action is to rehearse the entire process with a fictional vulnerability and measure the waiting periods. That exercise can reveal coordination and distribution problems that measuring programming time alone would leave out.
