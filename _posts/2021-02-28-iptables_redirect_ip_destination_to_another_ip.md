---
layout: post
title: "IPTables redirect IP destination to another IP"
comments: true
date: "2021-02-28 02:00:11.652000+00:00"
---

https://superuser.com/questions/681705/using-iptables-to-redirect-ip-address

```bash
iptables -t nat -A OUTPUT -d [ipaddress1] -j DNAT --to-destination [ipaddress2]
```