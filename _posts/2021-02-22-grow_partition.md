---
layout: post
title: "Grow partition"
comments: true
date: "2021-02-22 14:36:31.173000+00:00"
---


https://askubuntu.com/questions/24027/how-can-i-resize-an-ext-root-partition-at-runtime

```bash
growpart /dev/xvda 1
resize2fs /dev/xvda1
```
