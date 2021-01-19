---
layout: post
title: "Python 3 compile install"
comments: true
date: "2021-01-14 13:17:33.835000+00:00"
---


## Python3.6 CentOS
```bash
ver=3.6.12
yum -y install openssl-devel bzip2-devel
wget https://www.python.org/ftp/python/${ver}/Python-${ver}.tgz
tar xzvf Python-${ver}
cd Python-${ver}
./configure --enable-optimizations
make altinstall
```


