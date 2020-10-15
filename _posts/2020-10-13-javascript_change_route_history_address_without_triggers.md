---
layout: post
title: "Javascript change route/history address without triggers"
comments: true
date: "2020-10-13 00:58:03.568000+00:00"
categories:  [web]
tags:  [vuejs, javascript, history]
---



```javascript
window.history.pushState(
    {},
    null,
    '<path>' // /video/a/b/c
)
```