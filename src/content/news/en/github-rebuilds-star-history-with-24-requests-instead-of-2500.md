---
translationId: github-star-history-api-20261014
lang: en
slug: github-rebuilds-star-history-with-24-requests-instead-of-2500
title: "GitHub rebuilds star history with 24 requests instead of 2,500"
description: "GitHub introduces an aggregated API for querying star trends without exposing identities or forcing the database to scan every record."
publishedAt: 2026-10-14
sourceName: "GitHub Engineering"
sourceTitle: "From 2,500 requests to 24: Rebuilding star history without the stargazers"
sourceUrl: "https://github.blog/engineering/architecture-optimization/from-2500-requests-to-24-rebuilding-star-history-without-the-stargazers/"
author: "Taylor Cuilty and Sarita Iyer"
tags: ["apis", "architecture", "databases", "privacy", "performance"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has redesigned how developers query the time-based growth of repository stars. The change addresses two problems that often appear together in mature systems: an API that returns more data than consumers need, and a query that remains expensive even when the final response is small.

The previous API was designed to answer a specific question: who has starred a repository? Each page returned up to one hundred people and, with a particular media type, the date on which each person added the star. Some tools used those dates to build historical charts, then discarded the names after downloading them. That indirect reuse turned an identity list into an improvised time-series store.

The design had two costs. First, it enabled bulk collection of names that could be used for spam or phishing. Second, the work grew with repository popularity. Reconstructing the curve for react/react, with about 251,000 stars, could require roughly 2,511 requests. Each request also had to count the complete star set to calculate pagination. GitHub recorded almost 37,000 slow count queries in one week, averaging close to three seconds; database safeguards terminated more than a thousand of them.

The solution was not simply to return fewer fields. GitHub created an aggregated endpoint that returns daily counts grouped into periods of up to thirty weeks and removes identities. The important detail is the order of operations: each page is first translated into a creation-date range over an index; only then are rows in that range read and grouped by day. The database therefore processes the requested period instead of grouping and sorting the entire history before applying a limit.

For react/react, the complete history drops from roughly 2,511 requests to about 24. The system examines each star approximately once, rather than reprocessing millions of rows on every page. GitHub also applied the lesson to other views that counted stars on demand, changing them to use cached repository counts.

The lesson extends well beyond GitHub. A limit on the response does not guarantee a limit on internal work: LIMIT and OFFSET can shrink the JSON without reducing scanning, grouping, or sorting. API design should begin with the information consumers actually need, rather than with an existing historical data model. The new endpoint still has boundaries: weeks with unusually concentrated growth may remain expensive, and removed stars affect historical interpretation. Making those boundaries explicit is part of the technical contract.
