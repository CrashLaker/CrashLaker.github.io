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
Nginx
```nginx
proxy_hide_header X-Frame-Options;
add_header X-Frame-Options "ALLOWALL";
add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval' *; object-src 'self'";
```

Apache
```
Header always unset X-Frame-Options
Header set X-Frame-Options "ALLOWALL"
```

One might also want to auto login. Beware this hardcodes user auth:
`https://<zabbixserver>/zabbix/index.php?name=<user>&password=<password>&enter=Sign%20in&request=zabbix.php%3Faction%3Dproblem.view%26ddreset%3D1`

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

**apache zabbix.conf**
```
<VirtualHost *:80>
    ProxyRequests off
    ProxyPreserveHost On



    <Location />
        ProxyPass http://<zabbix-host>:<zabbix-port>/
        ProxyPassReverse http://<zabbix-host>:<zabbix-port>/
        Header always unset X-Frame-Options
        Header set X-Frame-Options "ALLOWALL"
        Order allow,deny
        Allow from all
    </Location>
</VirtualHost>
```

https://www.zabbix.com/forum/zabbix-troubleshooting-and-problems/52470-cant-load-zabbix-pages-in-iframe-anymore

https://community.grafana.com/t/zabbix-map-on-grafana/993/11

https://stackoverflow.com/questions/47405597/x-frame-options-in-nginx-to-allow-all-domains