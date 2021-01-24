---
layout: post
title: "Apache Suffix proxy"
comments: true
date: "2020-09-04 17:48:12.801000+00:00"
categories:  [web]
tags:  [apache, proxy]
---




https://github.com/dukecon/dukecon_docker_images/blob/634068e4fd6fb3b2c2e6e9dd85e1a68beccaa943/httpd-edge-with-static/dispatcher.conf

```apache=
ServerName "hostname"
ProxyRequests On

ProxyPassMatch   ^/suffix/(.*) http://localhost:port/$1
ProxyPassReverse ^/suffix/(.*) http://localhost:port/$1
```