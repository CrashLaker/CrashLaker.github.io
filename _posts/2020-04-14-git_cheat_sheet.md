---
layout: post
title: "Git Cheat Sheet"
categories: [productivity]
tags: [git]
comments: true
date: "2020-04-14 20:09:03.667000+00:00"
---


Reset all changes to HEAD
`git reset --hard HEAD`


`git log --oneline`
```
9425caf Merge pull request #305 from ErikMichelson/fix/eslint
e0f729e Fixed eslint errors (whitespaces)
f42304c Clean up all foreign-key constraints
41b13e7 Reduce requested arguments on cleanup
4884292 fixup! Add fix for missing deletion of notes on user-deletion request
1ed522b Update fr.json (POEditor.com)
034a96a Update ar.json (POEditor.com)
d389f45 Fix broken redirect on login
840109b Backport Fix for relative theme path
a9d98d4 Add fix for missing deletion of notes on user-deletion request
8ce7b28 Release version 1.6.0
1686edf Update sv.json (POEditor.com)
c84753a Update es.json (POEditor.com)
```


`git log --pretty=medium --graph --decorate --color`
```
* commit 06526714439c763e4842fac221009281d5aad775
| Author: Ivana Huckova <30407135+ivanahuckova@users.noreply.github.com>
| Date:   Tue Apr 14 21:29:42 2020 +0200
|
|     Dashboard search: Update input and closing button (#23573)
|
|     * Update Dashboard search page
|
|     * Update tests, remove unused icon types, adjust x icon position
|
|     * Update icon.ts
|
* commit 460561a25cc45bbd92de7f77b4c9d2e512c11ddd
| Author: Torkel Ödegaard <torkel@grafana.com>
| Date:   Tue Apr 14 21:17:44 2020 +0200
|
|     Transformations: UX updates (#23574)
|
```

`git log --pretty=medium --graph --decorate --color | aha > ../codimd_graph.html`
Then pipe to `aha` to have something as pretty as :

![](/assets/img/FkxRcXXGJ_d4fdd792cab6f2c03b1546ad730e34ea.png)
*From codimd/server github*