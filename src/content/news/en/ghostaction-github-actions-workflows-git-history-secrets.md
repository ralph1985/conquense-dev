---
translationId: ghostaction-github-actions-history-20261009
lang: en
slug: ghostaction-github-actions-workflows-git-history-secrets
title: "GhostAction returns with fake workflows that mine secrets from Git history"
description: "A new GhostAction wave used legitimate maintainer accounts to insert GitHub Actions workflows capable of reading secrets and historical credentials."
publishedAt: 2026-10-09
sourceName: "StepSecurity"
sourceTitle: "GhostAction Returns: Malicious “Security Audit” Workflows Now Mine Credentials from Entire Git Histories"
sourceUrl: "https://www.stepsecurity.io/blog/ghostaction-returns"
author: "Rohan Prabhu"
tags: ["security", "github-actions", "supply-chain", "ci-cd", "git"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

StepSecurity has documented a new wave of the GhostAction campaign, in which legitimate maintainer accounts were used to insert workflows with reassuring names such as `Security Audit`. The incident matters because the weakness is not a vulnerable dependency, but the CI/CD automation itself and the permissions inherited by that automation.

According to the analysis, two mass sweeps took place on October 8. One compromised account added the workflow to 27 repositories, while another reached 318 repositories, including source repositories and forks. The commits looked like ordinary maintenance changes and were made under the victims’ real identities. In one case, the injection reached the default branch of a major company’s repository without going through a pull request.

The latest variant, `security-audit.yml`, runs through `workflow_dispatch` and on every `push`, rather than being limited to one branch. It uses `fetch-depth: 0`, downloading the complete repository history, and searches for credentials not only among currently configured secrets but also in references present in old branches and commits. It then sends the collected information to attacker-controlled infrastructure. That technical detail changes the operational response: deleting the malicious file from the current tree is not enough, because the exposure may include values removed months ago.

The campaign also shows why commit identity is not a sufficient defense. The attacker operates through the compromised account, so the author, committer, and repository can all look legitimate. A workflow name and commit message are not reliable signals either. Teams need to inspect content, permissions, network destinations, and execution context.

The first response for an affected repository is to assume exposure and rotate every secret the workflow could have reached. That includes Actions secrets, GitHub tokens, cloud credentials, AI-provider keys, messaging services, and package-registry credentials. Teams must also revoke the credential that enabled the injection; rotating secrets without closing the access path leaves room for a second compromise. The investigation should cover every branch, tag, and fork, as well as workflow runs since late August.

The most concrete preventive control is to protect `.github/workflows/` with mandatory pull-request review and restrict runner egress to an explicit list of allowed destinations. A runner that can connect to any IP remains an exfiltration channel even when there is no domain name to block. It is also reasonable to require approval for new workflows or executions that handle secrets.

The incident reinforces a basic software-security rule: the pipeline is part of the product. Its files, permissions, history, and network connections deserve the same level of scrutiny as the code it builds.

AI-generated content.
