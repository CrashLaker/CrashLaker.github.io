---
layout: post
title: "Centos7 Docker + httpd + php"
comments: true
date: "2021-01-19 20:02:33.589000+00:00"
---

### Dockerfile
```
FROM centos:7


RUN yum -y update
RUN yum -y install httpd

RUN yum -y install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
RUN yum clean all; yum check-update; true
RUN yum -y install yum-utils
#https://www.howtoforge.com/tutorial/centos-lamp-server-apache-mysql-php/
#RUN yum -y install php
RUN yum-config-manager --enable remi-php72
RUN yum -y install php php-opcache php-fpm php72-php php72-bcmath php72-gd php72-mbstring

RUN echo -e "<FilesMatch \.php$>\nSetHandler application/x-httpd-php\n</FilesMatch>" >> /etc/httpd/conf/httpd.conf

#RUN sed -i 's,DocumentRoot "/var/www/html",DocumentRoot "/www",g' /etc/httpd/conf/httpd.conf

ENTRYPOINT ["/usr/sbin/httpd", "-D", "FOREGROUND"]
```

### Docker-compose
```
version: '2'

services:
  apache:
    #image: 'bitnami/apache:latest'
    build:
      context: .
    restart: unless-stopped
    ports:
      - '80:80'
    volumes:
      - /your-www/:/www
      - ./vhosts/:/etc/httpd/conf.d/

```


### virtual.conf
```
<VirtualHost *:80>
DocumentRoot "/your-dir/"
ServerName xxx
ServerAlias yyy
ServerAlias zzz
<Directory "/your-dir">
    DirectoryIndex index.php
    Require all granted
    Options Indexes FollowSymLinks
    AllowOverride All
</Directory>

# Other directives here
</VirtualHost>
```