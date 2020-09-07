---
layout: post
title: "Rclone Cheat Sheet"
comments: true
date: "2020-09-05 15:50:00.291000+00:00"
categories:  [backup]
tags:  [rclone]
---



https://rclone.org/docs/

```bash
--fast-list
--exclude "AppData/**"
    Exclude full AppData dir
--transfers 30
    30 simultaneous processes
```


### RC dynamic threshold
```bash

rclone mount gdrive_usp: /mnt/gdrive_usp2/ --rc --retries=10 --tpslimit 8


```