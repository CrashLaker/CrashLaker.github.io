---
layout: post
title: "CentOS System Service"
comments: true
date: "2020-06-08 13:37:54.953000+00:00"
categories:  [linux]
tags:  [centos, systemctl]
---



```
[Unit]
Description = <description>
After = network.target

[Service]
#Environment="foo=bar"
WorkingDirectory=<working dir>
Restart=on-failure
#RestartSec=3
ExecStart=/usr/bin/python3 app.py

[Install]
WantedBy = multi-user.target
```

```bash
systemctl daemon-reload
```

```bash
systemctl start|restart|enable your_service
```

```bash
systemctl list-units
systemctl list-unit-files
```