---
translationId: react-19-3-ui-security-ssr-20260909
lang: en
slug: react-19-3-transitions-refs-security-ssr
title: "React 19.3 stabilizes View Transitions and clarifies the server–browser boundary"
description: "The new version stabilizes several experimental capabilities and adds more explicit tools for animation, DOM references, hybrid rendering, and Trusted Types"
publishedAt: 2026-09-09
sourceName: "React"
sourceTitle: "React 19.3"
sourceUrl: "https://react.dev/blog/2026/09/09/react-19-3"
author: "The React Team"
tags: ["react", "frontend", "server-components", "view-transitions", "web-security"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

React 19.3 stabilizes several capabilities that had been experimental and reinforces an important direction in modern frontend development: the framework is increasingly coordinating with native browser capabilities instead of reproducing them from scratch. The release brings stable support for View Transitions and Fragment Refs, along with new tools for applications that use server rendering and Trusted Types-based security policies.

The <ViewTransition> component connects React’s tree to the browser’s View Transition API. It can animate elements as they enter, leave, update, or move when the change is marked as a transition. React also lets developers classify the reason for a change with transition types, which is useful for distinguishing, for example, forward navigation from backward navigation even when both update the same state. The integration includes Suspense: an interface can show a loading state immediately and animate only the transition to final content once data, images, or fonts have finished loading.

The most useful technical recommendation is also the easiest to overlook. React advises against animating cached content indiscriminately when it can appear immediately. A fallback should be shown without delay; animation is valuable when it is replaced by the final result. This connects user experience and performance: a transition that looks polished during the first load can feel slow on later loads if it is applied to content that is already available.

Fragment Refs address another common problem. A traditional ref needs one DOM node, but many components return several siblings or do not expose their ref. Passing a ref to a Fragment gives React developers a FragmentInstance that can manage events, focus, intersection or resize observers, measurements, and scrolling across its children without adding an artificial wrapper. This makes it possible to build behavior components, such as visibility detectors, without forcing markup changes on the components they contain.

For server-rendered applications, the new browser() API makes it explicit when a component cannot produce useful output outside the browser. Instead of scattered window checks or effects that change content after hydration, a component can suspend on the server and show a Suspense fallback until the correct environment exists. That reduces hydration ambiguity and documents the boundary between universal code and client-specific code more clearly.

React 19.3 also preserves Trusted Types objects when passing values to DOM sinks. This allows React to work with a Content-Security-Policy that requires trusted values and prevents an internal string conversion from breaking browser validation. The change does not remove the need to sanitize input, but it improves compatibility between the framework and an important defense against DOM-based XSS. Teams adopting the release should test hydration, Suspense, and transitions on their target browsers, measure the real cost of animation, and use the new APIs to make architectural boundaries explicit.
