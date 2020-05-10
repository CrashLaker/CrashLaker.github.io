---
layout: post
title: "Using Caddy as Reverse Proxy"
comments: true
date: "2020-05-10 04:33:04.905000+00:00"
categories:  [linux]
tags:  [caddy, reverse-proxy]
---


https://www.reddit.com/r/selfhosted/comments/gdftii/caddy_2_the_reverse_proxywebserver_with_automatic/

```
book.{$MY_DOMAIN} {
    reverse_proxy bookstack:80
}

grafana.{$MY_DOMAIN} {
    reverse_proxy grafana:3000
}

:9090 {
    reverse_proxy prometheus:9090
}
```

