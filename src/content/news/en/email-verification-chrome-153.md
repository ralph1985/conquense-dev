---
translationId: verificacion-email-chrome-153
lang: en
slug: email-verification-chrome-153
title: "Chrome email verification changes its protocol ahead of Chrome 153"
description: "The Email Verification API trial changes its issuance request: providers need to prepare for JSON and HTTP Message Signatures."
publishedAt: 2026-08-13
sourceName: "Chrome for Developers"
sourceTitle: "Email verification updates, August 2026"
sourceUrl: "https://developer.chrome.com/blog/email-verification-august-2026"
author: "Rowan Merewood"
tags: ["web security", "authentication", "standards"]
readingTime: 3
aiDisclosure: "This text was generated with AI and reviewed before publication."
---

Providers taking part in Chrome's Email Verification trial have a protocol change to review before Chrome 153. The proposal lets a browser check directly with an email provider that an address belongs to the user, so a site can validate a token and, in certain flows, avoid sending a magic link or one-time code. The August update changes how issuance of that token is requested.

Up to Chrome 152, the issuance endpoint receives a `POST` formatted as `application/x-www-form-urlencoded`, with a `request_token` in the body. From Chrome 153 onward, the request becomes `application/json`, contains the `email` key, and uses HTTP Message Signatures in headers such as `Signature`, `Signature-Input`, and `Signature-Key`. The provider must validate that signature and the associated content before returning the issuance response.

The detail matters because authentication format changes often fail quietly. A server that only accepts the old body will not understand the new request. One that adopts only the new path may exclude people still using an earlier browser version during the transition. Chrome describes two options: support both formats and choose by content type, or switch directly once observed traffic permits retiring the legacy flow. For an identity system, the first option usually enables a more controlled migration, provided both paths receive equivalent testing.

The recommendation for parsing the returned token also changes. The token uses the SD-JWT format, with an issuer-signed JWT, potential disclosures, and a key-binding JWT. Although the current form includes no disclosures, splitting the value into two fragments is fragile: a valid evolution of the format would break that assumption. Chrome recommends using an SD-JWT-aware library and correctly validating the audience, nonce, binding hash, and the issuer and browser signatures.

This is a useful time to review the flow's trust boundaries. The backend must verify the token; the client must not decide on its own that an email is confirmed. Teams should log errors without storing whole tokens, rate-limit attempts, bind the nonce to a short-lived transaction, and keep an alternative for browsers or providers that do not participate. The API is described as progressive enhancement, not as a universal replacement for every verification mechanism.

The update also adds product details with technical impact: typing or pasting an address can trigger verification when the field loses focus, a progress indicator is being tested, and support is desktop-only through Chrome 152. Integrations should treat those conditions as negotiated capability. Measuring success rate, abandonment, and version-specific failures will help determine whether the new path improves access without creating a fragile point in account recovery.
