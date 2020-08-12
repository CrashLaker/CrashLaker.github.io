---
layout: post
title: "VSFTPD CentOS SELINUX"
comments: true
date: "2020-05-19 04:46:19.591000+00:00"
categories:  [linux]
tags:  [centos, ftp, vsftpd]
---




tuxfixer.com/vsftpd-installation-on-centos-7-with-selinux/


```bash
[root@tux ~]# chown -R ftp:ftp /var/ftp
[root@tux ~]# semanage fcontext -a -t public_content_rw_t /var/ftp
[root@tux ~]# restorecon -Rvv /var/ftp
[root@tux ~]# setsebool -P ftp_home_dir 1
[root@tux ~]# setsebool -P ftpd_full_access 1
[root@tux ~]# ls -lZ /var | grep ftp
drwxr-xr-x. ftp ftp system_u:object_r:public_content_rw_t:s0 ftp
```

`ftp localhost`


Selinux alerts:  
`sealert -b`


`setenforce 0`

`getenforce`


https://serverfault.com/questions/358324/ftp-doesnt-allow-usr-sbin-nologin-user

`usermod --home=/another/path <username>`

Alter `/etc/passwd/` to nologin `/sbin/nologin`
Add `/sbin/nologin` to `/etc/shells`




