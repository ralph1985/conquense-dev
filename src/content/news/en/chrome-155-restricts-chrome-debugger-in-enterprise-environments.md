---
translationId: chrome-debugger-enterprise-policy-20260908
lang: en
slug: chrome-155-restricts-chrome-debugger-in-enterprise-environments
title: "Chrome 155 will tighten chrome.debugger use in enterprise environments"
description: "Chrome 155 will turn certain enterprise restrictions into explicit connection failures for extensions using Chrome’s debugging protocol. The change requires extensions to review"
publishedAt: 2026-09-08
sourceName: "Chrome for Developers"
sourceTitle: "Stricter enterprise policy enforcement for chrome.debugger in Chrome 155"
sourceUrl: "https://developer.chrome.com/blog/debugger-enterprise-policy-restrictions?hl=en"
author: "Chrome for Developers"
tags: ["browser-security", "chrome-extensions", "enterprise", "web-platform"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

Chrome has announced a security change affecting extensions that use the `chrome.debugger` API in managed browsers. The change will arrive with Chrome 155: the beta is scheduled for September 16, 2026, and the stable rollout will begin on October 6. It does not change behavior for personal profiles or unmanaged browsers, but it may break internal extensions used by organizations with host-blocking, screenshot, or data-loss-prevention policies.

The technical reason lies in the API’s reach. `chrome.debugger` provides direct access to the Chrome DevTools Protocol, allowing extensions to evaluate scripts, intercept traffic, and perform operations below the web platform’s normal origin model. Chrome therefore considers partial filtering through allowed and blocked host lists insufficient. In affected cases, `chrome.debugger.attach()` will use an all-or-nothing decision and reject the connection before the extension can operate.

The important detail for development teams is that a non-empty `runtime_blocked_hosts` list can prevent attachment on every target, even when some of those targets also appear in `runtime_allowed_hosts`. Likewise, if an organization disables screenshots or applies equivalent DLP rules, the connection will fail with a specific error. Extensions should treat these rejections as an expected configuration state, not as a temporary outage that can be fixed by retrying.

Chrome recommends handling the failure explicitly and giving enterprise users useful feedback. Teams should also reassess whether an extension truly needs CDP. For executing scripts or inserting styles, `chrome.scripting` provides a higher-level abstraction and fits better with host-based permissions. For inspecting or modifying requests, `declarativeNetRequest` may cover part of the use case without granting full debugger access. `chrome.cookies` follows the standard extension permission model as well.

The change offers a lesson that applies beyond Chrome. Powerful APIs often collide with centrally managed security policies. Testing an extension only in a developer profile will not expose those failures: test suites should include real enterprise policies, DLP restrictions, and representative host lists. Teams maintaining browser automation, QA tools, or support extensions should first inventory their permissions, reproduce the failures in Chrome 155, and define a clear fallback path. Compatibility depends not only on the API itself, but also on the governance context in which it runs.
