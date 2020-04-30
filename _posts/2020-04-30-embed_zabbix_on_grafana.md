---
layout: post
title: "Embed Zabbix on Grafana"
comments: true
date: "2020-04-30 00:24:01.252000+00:00"
categories:  [monitoring]
tags:  [zabbix, grafana, nginx, proxy]
---



![](/assets/img/os-pXeavt_2940b2d80fb724c2e358c23fdb25d324.png)

Setup any proxy and set `X-Frame-Options` and `http://<zabbix-host>:<zabbix-port>/`:
```nginx
proxy_hide_header X-Frame-Options;
add_header X-Frame-Options "ALLOWALL";
add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval' *; object-src 'self'";
```

```bash
docker run -dit --name zabbix-proxy  \
    -v <path>/nginx.conf:/etc/nginx/nginx.conf \
    -p 8881:80 \
    nginx
```

**nginx.conf**
```nginx
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    proxy_hide_header X-Frame-Options;
    add_header X-Frame-Options "ALLOWALL";
    add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval' *; object-src 'self'";
    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;
    server{
        location / {
            proxy_pass http://<zabbix-host>:<zabbix-port>/;
        }
    }

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

https://www.zabbix.com/forum/zabbix-troubleshooting-and-problems/52470-cant-load-zabbix-pages-in-iframe-anymore

https://community.grafana.com/t/zabbix-map-on-grafana/993/11

https://stackoverflow.com/questions/47405597/x-frame-options-in-nginx-to-allow-all-domains