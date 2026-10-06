---
translationId: cloudflare-public-ca-postquantum-20260929
lang: en
slug: cloudflare-plans-public-ca-with-post-quantum-certificates
title: "Cloudflare plans a public certificate authority designed for the post-quantum transition"
description: "The company is applying to join major browser root programs while combining an established trust root, ACME, and Merkle Tree Certificates."
publishedAt: 2026-09-29
sourceName: "Cloudflare Blog"
sourceTitle: "Building a certificate authority for the whole Internet"
sourceUrl: "https://blog.cloudflare.com/cloudflare-certificate-authority/"
author: "Steve Goldsmith"
tags: ["security", "tls", "cryptography", "webpki", "post-quantum"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Cloudflare has announced its intention to become a public certificate authority, although it is not issuing certificates yet. The company says it has applied to join the root programs operated by Chrome, Apple, Microsoft, and Mozilla, and has signed an agreement to acquire an established GlobalSign trust root. The stated goal is to combine immediate compatibility with an architecture prepared for changes in the WebPKI.

The decision addresses a concrete operational problem. A new root must be accepted by trust programs and then distributed through operating systems, browsers, and devices. That process leaves out older clients that still generate traffic. Cloudflare plans to use the existing root to reach that long tail from day one while also submitting new roots aligned with the future policies of the main trust programs.

The service would use ACME as its primary issuance and renewal path. ACME is already used by many certificate automation systems, so migration could be limited to changing a directory URL instead of introducing a different toolchain. The company also plans to require support for ACME Renewal Information, an extension that lets clients query renewal windows and identify the certificate being replaced. That requirement treats automated renewal as a resilience condition, not merely a convenience.

Cloudflare presents redundancy as another reason to enter the market. According to its explanation, excessive dependence on one free certificate authority can become a systemic risk if that provider experiences an outage, a large-scale revocation, or an operational failure. A second automated issuer could provide an alternative path, although it would only be useful if it maintained broad trust-store coverage and sufficient issuance capacity.

The most relevant part of the announcement for cryptographic migration is Merkle Tree Certificates, or MTCs. Cloudflare describes them as a more compact way to represent publicly trusted certificates in a post-quantum environment, where traditional chains may grow larger and put pressure on TLS handshakes. The company plans to issue its first production MTCs during the first quarter of 2027, subject to progress in root programs and standards work.

The strategy does not require customers to choose immediately between classic and post-quantum certificates. Cloudflare intends to offer both under one authority, with shared lifecycle processes and guarantees, so customers can migrate gradually. That compatibility matters because changing WebPKI cryptography is not only about generating new keys. It also requires maintaining interoperability with older clients while browsers and operating systems adopt new mechanisms.

The announcement remains a plan rather than an available capability. Its technical value lies in treating issuance, renewal, trust distribution, operational transparency, and post-quantum migration as one system. Cloudflare also promises reproducible builds, hardware-security-module attestations for key protection, and a public issuance-health dashboard. Those measures do not replace audits, but they could provide operational evidence between one audit and the next.
