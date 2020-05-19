---
layout: post
title: "Docker Network Allow Containers to Reach Host"
comments: true
date: "2020-05-19 05:02:34.743000+00:00"
categories:  [linux]
tags:  [docker, iptables]
---




https://stackoverflow.com/questions/38227029/host-unreachable-inside-docker-container

```bash
sudo iptables -I INPUT -i docker0 -j ACCEPT
```
