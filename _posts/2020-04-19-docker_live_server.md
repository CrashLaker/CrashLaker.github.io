---
layout: post
title: "Docker live server"
comments: true
date: "2020-04-19 17:59:59.145000+00:00"
categories:  [devenv]
tags:  [live-server]
---



https://hub.docker.com/r/duaneleem/live-server/

```bash
custom_nameport="cname:8080"
folder=""
container_name=$(echo $custom_nameport | cut -d: -f1)
container_port=$(echo $custom_nameport | cut -d: -f2)
docker run -dit \
    --name $container_name \
    -p $container_port:8080 \
    -v "$folder":"/usr/src/app" \
    duaneleem/live-server:1.0
```