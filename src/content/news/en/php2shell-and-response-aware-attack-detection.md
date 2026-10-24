---
translationId: cloudflare-php2shell-transaction-detection-20261021
lang: en
slug: php2shell-and-response-aware-attack-detection
title: "php2shell and response-aware attack detection"
description: "The php2shell vulnerabilities show why web defenses may need to analyze both the request and response from the same HTTP transaction."
publishedAt: 2026-10-21
sourceName: "Cloudflare Blog"
sourceTitle: "Cloudflare deploys protections against php2shell vulnerability"
sourceUrl: "https://blog.cloudflare.com/php-vulnerabilities-waf-protection/"
author: "Daniele Molteni, Dan Jones, and Kuber Nandwani"
tags: ["security", "php", "web-security", "waf", "vulnerabilities"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

On October 21, two PHP runtime vulnerabilities known as php2shell became public under CVE-2026-109618 and CVE-2026-109619. According to Cloudflare, they affect servers running PHP 5.4 or later and can enable denial of service, data exposure, or remote code execution when specially crafted HTTP requests are processed. The issue is not confined to a particular plugin: it lies in how the runtime handles memory when request processing fails.

The two variants share a memory-safety failure class but are triggered at different points. In one case, PHP runs out of memory before some internal data is properly initialized and later attempts to use it during cleanup. In the other, a fatal error leaves references to memory that has already been released, allowing a later process operation to access stale data. The potential result is more serious than a crashed process: an attacker may try to read memory or influence process execution.

Cloudflare’s announced defense is interesting because it does not simply add another rule based on request contents. The company deployed protections before public disclosure and observed attack traffic mutating its payloads. To reduce false positives, it developed a capability called full transaction detection, which combines signals from the request and the origin response within the same HTTP transaction. If the response contains evidence that exploitation succeeded, a rule can block it before it is delivered to the client.

The change reflects a common limitation of web application firewalls. The attacker controls part of the input, but the server reveals additional information in its response: status codes, error patterns, unexpected content, or signs of abnormal execution. Inspecting both sides does not turn a WAF into a runtime patch, but it provides more context for distinguishing a legitimate request from an exploit that has passed the input defenses.

The protection also does not replace updating. Cloudflare recommends applying the PHP project’s fix and keeping the WAF as defense in depth. The page added an October 23 warning about CVE-2026-115560, a related vulnerability in the session upload progress feature that, according to the PHP project’s informational advisory, affects even fully patched PHP versions.

For teams maintaining web applications, the case suggests several concrete actions. Identify which servers run PHP and which versions they use, coordinate updates with the provider when infrastructure is managed, and review WAF logs for triggered rules. It is also reasonable to restrict unnecessary request sizes and file uploads, although those measures only reduce exposure and do not fix the defect. The broader architectural lesson is that detection improves when it correlates input, processing, and output, but perimeter mitigation must accompany—not replace—the patch for the vulnerable component.
