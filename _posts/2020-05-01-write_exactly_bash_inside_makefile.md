---
layout: post
title: "Write exactly bash inside Makefile"
comments: true
date: "2020-05-01 22:13:21.118000+00:00"
categories:  [linux]
tags:  [bash, makefile]
---



https://unix.stackexchange.com/questions/270778/how-to-write-exactly-bash-scripts-into-makefiles

```bash
name="apache-zabbix"

define conf =
<VirtualHost *:80>
    ProxyRequests off
    ProxyPreserveHost On

    <Location />
        ProxyPass http://192.168.31.78:8880/
        ProxyPassReverse http://192.168.31.78:8880/
                Header always unset X-Frame-Options
                Header set X-Frame-Options "ALLOWALL"
        Order allow,deny
        Allow from all
    </Location>
</VirtualHost>
endef

define runsh =
        docker rm -f $(name); true
        docker run -dit --name $(name) \
                -p 8088:80 \
                centos bash -c "
                        yum check-update;
                        yum -y install httpd
                        cat > /etc/httpd/conf.d/virtual.conf <<EOF
                        $(conf)
                        EOF
                        httpd -DFOREGROUND"
endef


run:
        $(runsh)

login:
        docker exec -it $(name) bash

logs:
        docker logs $(name)

test:
        curl http://localhost:8088/

.ONESHELL:
```



