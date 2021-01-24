---
layout: post
title: "Centos NetworkManager Cheat Sheet"
comments: true
date: "2021-01-21 22:03:01.152000+00:00"
---


```bash
nmcli con mod ens192 ipv4.dns-search "local.com"
nmcli con mod ens192 ipv4.dns "8.8.8.8 8.8.4.4"
```

https://www.putorius.net/update-search-domains-on-red-hat-7.html
https://serverfault.com/questions/810636/how-to-manage-dns-in-networkmanager-via-console-nmcli