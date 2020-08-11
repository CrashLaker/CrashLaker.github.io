---
layout: post
title: "Docker on CentOS 7"
comments: true
date: "2020-05-03 06:40:17.961000+00:00"
categories:  [linux]
tags:  [docker, centos7]
---




https://docs.docker.com/engine/install/centos/

```bash
yum install -y yum-utils
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce docker-ce-cli containerd.io
systemctl start docker
systemctl enable docker


yum -y install python3 python3-pip
pip3 install docker-compose
```