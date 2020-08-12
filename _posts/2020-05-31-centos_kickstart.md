---
layout: post
title: "CentOS Kickstart"
comments: true
date: "2020-05-31 17:36:31.751000+00:00"
categories:  [linux]
tags:  [centos]
---




For CentOS 7.7 [check](https://crashlaker.github.io/linux/2020/05/09/multiline_bash_paste_breaking_on_centos_7.7.html)
```bash
rpm -Uvh http://vault.centos.org/7.6.1810/updates/x86_64/Packages/polkit-0.112-18.el7_6.1.x86_64.rpm --force
```

```bash
# Kickstart
setenforce 0
sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
systemctl stop firewalld
systemctl disable firewalld
modprobe br_netfilter
echo '1' > /proc/sys/net/bridge/bridge-nf-call-iptables
swapoff -a
yum -y install epel-release
yum -y install git screen htop vim nmap

yum -y install docker
systemctl restart docker
systemctl enable docker
```