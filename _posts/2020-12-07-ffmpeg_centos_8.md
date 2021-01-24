---
layout: post
title: "FFMPEG Centos 8"
comments: true
date: "2020-12-07 00:48:20.308000+00:00"
---


https://rpmfusion.org/Configuration

```bash

yum -y install https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm
yum -y install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.10-1.el7.x86_64.rpm
yum -y install ffmpeg

```


https://computingforgeeks.com/how-to-install-ffmpeg-on-centos-rhel-8/


https://access.redhat.com/discussions/5480461
- nothing provides libSDL2-2.0.so.0()(64bit) needed by ffmpeg-4.2.4-1.el8.x86_64
