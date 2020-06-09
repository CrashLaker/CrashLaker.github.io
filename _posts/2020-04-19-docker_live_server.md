---
layout: post
title: "Docker live server"
comments: true
date: "2020-04-19 17:59:59.145000+00:00"
categories:  [devenv]
tags:  [live-server]
---



https://github.com/duluca/minimal-node-web-server

```bash
custom_nameport="cname:8080"
folder=""
container_port=$(echo $custom_nameport | cut -d: -f2)
container_name="live-server-$(echo $custom_nameport | cut -d: -f1)-p${container_port}"
docker rm -f $container_name
docker run -dit \
    --name $container_name \
    --restart always \
    -p $container_port:3000 \
    -v "$folder":"/usr/src/app/public" \
    duluca/minimal-node-web-server
```
