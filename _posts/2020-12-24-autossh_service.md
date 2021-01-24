---
layout: post
title: "Autossh service"
comments: true
date: "2020-12-24 19:02:49.655000+00:00"
---


```
[Unit]
Description=Keeps a tunnel to 'remote.example.com' open
After=network-online.target

[Service]
#User=autossh
# -p [PORT]
# -l [user]
# -M 0 --> no monitoring
# -N Just open the connection and do nothing (not interactive)
# LOCALPORT:IP_ON_EXAMPLE_COM:PORT_ON_EXAMPLE_COM
RestartSec=5
Restart=on-failure
ExecStart=/bin/bash -c "until /bin/ping -c 4 <ip>; do sleep 1; done; /usr/bin/autossh -M 0 -o \"ServerAliveInterval 15\" -o \"ExitOnForwardFailure yes\" -o \"ServerAliveCountMax 3\" -CNR \*:5001:localhost:22 <ip>"
```