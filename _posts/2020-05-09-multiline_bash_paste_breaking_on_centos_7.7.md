---
layout: post
title: "Multiline bash paste breaking on Centos 7.7"
comments: true
date: "2020-05-09 20:18:42.530000+00:00"
categories:  [linux]
tags:  [bug, centos]
---




https://bugzilla.redhat.com/show_bug.cgi?id=1753037

Solution:
`rpm -Uvh http://vault.centos.org/7.6.1810/updates/x86_64/Packages/polkit-0.112-18.el7_6.1.x86_64.rpm --force`