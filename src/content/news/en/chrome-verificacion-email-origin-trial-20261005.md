---
translationId: chrome-verificacion-email-origin-trial-20261005
lang: en
slug: chrome-verificacion-email-origin-trial-20261005
title: "Chrome’s email verification trial enters a critical phase for integrators"
description: "Chrome’s October origin-trial update adds Android support, third-party tokens, and cryptographic changes that require verifiers and providers to prepare for migration"
publishedAt: 2026-10-05
sourceName: "Chrome for Developers"
sourceTitle: "Email verification updates, October 2026"
sourceUrl: "https://developer.chrome.com/blog/email-verification-october-2026"
author: "Rowan Merewood"
tags: ["chrome", "web-apis", "identity", "authentication", "javascript"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Chrome’s Email Verification proposal is moving closer to a possible stable release, but the October update makes clear that the protocol is still evolving. The origin trial, which began in Chrome 150 for desktop, lets a site confirm ownership of an address through a token issued by an email provider. This reduces the need to send users to another tab to open a link or copy a code.

The most visible change is Chrome support for Android starting with version 154. According to Chrome, verifiers and providers do not need to change their integration interface for this reason: the same protocol remains in place, as do the requirements, including that the user must be signed in to the provider in the browser. The change broadens the testing environment, but it does not make the feature a universal solution for every mobile application.

The update also enables third-party origin trials. This is useful for an identity SDK or script embedded across multiple sites: the provider can register a trial token so that the sites embedding it do not each have to manage a separate token. The security constraint is important: the trial registrant and the issuer must be same-site. A subdomain or a different domain is not automatically valid.

There are also validation details that can break integrations that otherwise appear correct. When checking an Email Verification Token, the server retrieves the provider’s public key set and verifies the signature. The optional `kid` field identifies the key used, but not every token includes it. Chrome’s guidance asks verifiers to try the available keys when the identifier is missing, rather than assuming it will always be present.

Starting in Chrome 156, the email included in the token is returned exactly as it was entered in the form. Verifiers should compare the address case-insensitively, while providers must check that their response matches the signed value they received. The goal is to limit information exposure: Chrome should not reveal a canonical account form that differs from the address supplied by the user.

The `Sec-Fetch-Dest` value in issuance requests also changes. Chrome 154 uses `email-verification`, with a hyphen, instead of `emailverification` in Chrome 153. Endpoints that validate this header—a recommended practice for reducing out-of-context requests and certain CSRF risks—should accept both values during the transition.

The lesson for teams is not to enable the trial and forget about the protocol. Treat every origin trial as an experimental API: read compatibility notes, test tokens with different keys, maintain a migration window, and verify headers in production. Web authentication depends on cryptography as well as interoperability details. A one-word header change may be small inside the browser and material to a distributed system.
