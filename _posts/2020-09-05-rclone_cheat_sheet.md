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


### RC dynamic threshold (floag --rc)
```bash
rclone mount <drive>:/mnt/drive --rc --retries=10 --tpslimit 8
```


```bash
rclone rc core/bwlimit rate=1M
{
        "rate": "1M"
}
[root@docker ~]# rclone rc core/bwlimit rate=100M
{
        "rate": "100M"
}
```