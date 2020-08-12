---
layout: post
title: "Linux Kickstart"
comments: true
date: "2020-06-13 19:56:02.681000+00:00"
categories:  [linux]
tags:  [centos]
---



```bash
setenforce 0
sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
systemctl stop firewalld
systemctl disable firewalld
modprobe br_netfilter
echo '1' > /proc/sys/net/bridge/bridge-nf-call-iptables
swapoff -a
yum -y install epel-release
yum -y install git screen htop vim nmap
```


