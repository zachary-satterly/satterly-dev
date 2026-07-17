---
date: 2026-07-16
title: Typewriters and trojans
slug: typewriters-and-trojans
categories:
  - build it & secure it
---

# Typewriters and trojans

Fireship, which private equity owns a piece of now, covered [an npm library I wanted](https://www.youtube.com/watch?v=vd14EElCRvs) and [a RAT hiding in one of the most installed libraries on earth](https://www.youtube.com/watch?v=o7NYXvYohYk) in the same feed. So I adopted the first one like the second one was watching.

<!-- more -->

Here's what happened to axios. On March 30, an attacker [hijacked a maintainer's npm account](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan) and published two poisoned versions of a library with 100 million weekly downloads. The malicious releases added one dependency: `plain-crypto-js`, a typosquat of crypto-js, never imported anywhere in the code. It didn't need to be imported. Its postinstall script ran at install time and dropped a cross-platform RAT that harvests SSH keys, cloud tokens, and credentials off the developer's machine. It was live for about three hours. [Backstage's CI caught it executing](https://securitylabs.datadoghq.com/articles/axios-npm-supply-chain-compromise/) in production pipelines.

The lesson is one sentence: `npm install` is arbitrary code execution, and the code isn't always the library.

The library I wanted is [pretext](https://github.com/chenglou/pretext), Cheng Lou's text measurement engine. `prepare()` segments a string and caches canvas-measured widths. `layout()` turns a width into a height and line count with plain arithmetic. No reflow. No markup either: pretext returns numbers, and the typed headline on this page goes through `textContent`, never `innerHTML`. There's no DOM XSS sink in the path.

So how do you install a dependency the same month axios grew a RAT? Deliberately.

I fetched the tarball with `npm pack`, which downloads without executing lifecycle scripts. I read the package.json before anything ran: zero runtime dependencies, zero install hooks. That check takes thirty seconds and would have caught the axios payload, because `plain-crypto-js` appeared as a new dependency in a patch release of an HTTP client. Dependencies that appear without a reason are the tell.

Then I vendored it. pretext 0.0.8 lives in this repo, license included. The deployed site makes zero requests to CDNs or registries, and a hijacked maintainer account can't reach a page that never fetches. The CSP is `default-src 'none'; script-src 'self'`. Updates happen when I pack the new version, diff it, and commit it on purpose. The axios window was three hours. Deliberate updates don't race a three-hour window.

One boundary worth being precise about: the axios RAT attacked developers, not users. My CSP protects visitors. My install discipline protects me. Different targets, different controls, and confusing the two is how sites end up with a security page that protects nobody.

The cost, stated plainly: vendoring means no advisory feed watches my vendor folder. Noticing is my job now. For one library with no dependencies on a one-page site, easy trade. At work scale I'd argue the other side.

Pick controls you can actually operate. A control you can't operate is a delayed incident.

---

This is the first post in **build it & secure it**: agents build something real, I try to secure and learn from it. If something breaks, you'll read about that too. Speaking of which: [nagops.com](https://nagops.com).
