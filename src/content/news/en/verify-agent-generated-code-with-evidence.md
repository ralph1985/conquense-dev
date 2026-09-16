---
translationId: software-factory-verification-evidence-20260914
lang: en
slug: verify-agent-generated-code-with-evidence
title: "Verifying agent-generated code requires an evidence packet"
description: "Vercel proposes a review workflow that connects each requirement to reproducible observations and keeps unresolved checks visible before a change is accepted."
publishedAt: 2026-09-14
sourceName: "Vercel"
sourceTitle: "How do you verify code from a software factory?"
sourceUrl: "https://vercel.com/i/verify-software-factory-code"
author: "Ben Sabic"
tags: ["software engineering", "coding agents", "testing", "maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

As coding agents produce larger changes with less direct intervention, technical review needs more than a statement such as “the tests pass.” Vercel has published a guide to verifying software-factory code that recommends collecting a compact evidence packet for every change: acceptance criteria, the before-change result, the after-change result, repository checks, diff review, and any uncertainty that remains unresolved.

The distinction matters because each item answers a different question. Acceptance criteria describe the expected behavior, but do not prove that it was implemented. The before-change result confirms that a failure reproduces under specific conditions, while the after-change result shows what the proposed revision changed. Builds and tests report which automated checks passed, but they cannot cover requirements that were never encoded in them. Diff review helps assess scope and design, but cannot replace a runtime behavior check.

The guide recommends marking every check as passed, failed, blocked, or not run. Blocked and not-run checks are not the same as failures: they indicate missing evidence. This prevents an incomplete execution from being presented either as a negative conclusion or, worse, as an implicit confirmation.

For a regression, the stronger procedure is to run the test against both the original revision and the proposed change, then inspect why it fails initially. A test that only checks whether a file exists can pass while its contents remain truncated. An independent fixture, with known identifiers and expected results, provides more confidence than an expected value calculated with the same faulty logic as the implementation under test. Existing test changes also deserve review: weakening an assertion until the failure disappears is not the same as correctly updating the expected behavior.

Independent review adds another barrier. The reviewer should begin with the requirements and the diff rather than relying only on the implementer agent’s explanation. A second model can introduce variation into the process, but agreement between two models does not establish correctness. Merge authority should remain separate from any automated judgment.

When acceptance depends on a real interaction, the guide recommends using a browser and recording the relevant conditions, account state, and exact deployed revision. A verified preview demonstrates only what was exercised in that environment; it does not prove that production, with different data or configuration, is equivalent.

The central idea applies even when agents are not involved: useful review connects claims to observations and makes the limits of the evidence visible. Automating implementation may reduce elapsed time, but it increases the value of reproducible records, well-designed fixtures, and human ownership of the final decision.
