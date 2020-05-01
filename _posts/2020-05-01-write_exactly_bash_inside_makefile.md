---
layout: post
title: "Write exactly bash inside Makefile"
comments: true
date: "2020-05-01 22:13:21.118000+00:00"
categories:  [linux]
tags:  [bash, makefile]
---



https://unix.stackexchange.com/questions/270778/how-to-write-exactly-bash-scripts-into-makefiles

```makefile
name="apache-zabbix"

define runsh =
        docker rm -f $(name); true
        docker run -dit --name $(name) \
                -p 8088:8080 \
                -v /root2/apache-zabbix/virtual.conf:/usr/local/apache2/conf/extra/proxy-html.conf \
                httpd:2.4 bash -c "
                        sed -i 's,Listen 80,Listen 8080,g' conf/httpd.conf
                        sed -i 's,#LoadModule proxy_http_module modules/mod_proxy_html.so,LoadModule proxy_http_module modules/mod_proxy_html.so,g' conf/httpd.conf
                        sed -i 's,#LoadModule proxy_module modules/mod_proxy.so,LoadModule proxy_module modules/mod_proxy.so,g' conf/httpd.conf
                        sed -i 's,#LoadModule xml2enc_module modules/mod_xml2enc.so,LoadModule xml2enc_module modules/mod_xml2enc.so,g' conf/httpd.conf
                        httpd-foreground"
endef

run:
        $(runsh)

login:
        docker exec -it $(name) bash

logs:
        docker logs $(name)


.ONESHELL:
```



