---
translationId: agentic-ide-extension-traceability-20260911
lang: en
slug: ai-editors-and-extension-supply-chain-traceability
title: "AI-assisted editors can break extension traceability"
description: "SafeDep reports that importing extensions from Visual Studio Code into Cursor may install the newest version from another registry rather than the version previously reviewed by a"
publishedAt: 2026-09-11
sourceName: "SafeDep"
sourceTitle: "The Agentic IDE Extension Blind Spot"
sourceUrl: "https://safedep.io/cursor-extension-import-versions/"
author: "Vignesh Naikoti"
tags: ["cybersecurity", "software supply chain", "IDE", "JavaScript"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Teams moving from Visual Studio Code to AI-assisted editors may preserve the appearance of their environment while losing an important part of its traceability. SafeDep reports that Cursor’s configuration-import feature copies each extension identifier but not its installed version. It then looks up that name in the registry used by Cursor and installs whichever version is listed there as the latest.

The issue is not that every update is malicious. The issue is that the result is no longer determined by the original environment or by a version the team has reviewed. Cursor cannot use Microsoft’s Marketplace for Visual Studio Code forks and obtains many extensions through Open VSX, usually through its own proxy. The two registries can contain different versions, different publishers, or no equivalent extension. An identifier in the form `publisher.extension` does not, by itself, prove that the code comes from the same owner in both registries.

SafeDep deliberately kept three extensions at older versions in Visual Studio Code and repeated the import in Cursor. According to its results, all three ended up on the newest versions available through Open VSX. The investigation also documents cases where Microsoft extensions are unavailable in Open VSX and are replaced by Anysphere extensions. That behavior may be intentional and legitimate, but it demonstrates that the requested name is not enough to identify the code that will run.

Editor extensions have capabilities that deserve treatment similar to application dependencies: they can read files, start processes, and reach source code, cloud keys, or SSH keys available on the machine. Automatic updates create a genuine trade-off. Keeping them enabled delivers security fixes quickly, but also allows new code to execute before the team can review it. Disabling them reduces that immediate exposure, while leaving vulnerable versions installed for longer.

The practical response is to restore familiar supply-chain controls. After importing a configuration, compare the extension lists and versions from both editors. For reproducible installations, Cursor supports specifying a version with `publisher.extension@version`. Record those versions alongside the project or in team documentation. It can also be reasonable to introduce a waiting period before accepting updates, inspect the editor and registry that actually serve the package, and restrict installations to an approved list of publishers or extensions.

The conclusion is not that teams should abandon AI-assisted IDEs. It is that their extension ecosystem should be treated as executable software rather than as a visual preference that can be copied without scrutiny. A migration flow that preserves names but loses versions can introduce operational changes without appearing in the repository diff. Identity, provenance, and version therefore belong in the review.
