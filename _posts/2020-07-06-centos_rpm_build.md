---
layout: post
title: "CentOS RPM Build"
comments: true
date: "2020-07-06 18:28:35.152000+00:00"
categories:  [linux]
tags:  [centos, rpmbuild]
---


https://wiki.centos.org/HowTos/SetupRpmBuildEnvironment

```bash
yum -y install -y rpm-build
mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
```

### Build example
```bash
rpmbuild -ba mypackage.spec
```

### S



