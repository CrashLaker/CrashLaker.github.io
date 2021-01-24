---
layout: post
title: "Apache/Nginx ReverseProxy Proxy"
comments: true
date: "2020-10-11 19:06:28.202000+00:00"
categories:  [web]
tags:  [nginx, apache, reverseproxy, proxy]
---


### Nginx

```
# Proxy

server {
    listen 80;
    
    proxy_ssl_server_name on;
    location /prod {
        proxy_pass <endpoint>;
    }
    location /dev {
       proxy_pass <endpoint>; 
    }
}


# Reverse Proxy

server {
    listen 80;
    
    server_name <cname>.<domain>;
    location / {
        proxy_pass <endpoint>
    }
    location /user {
        rewrite /user/(.*) $1 break;
        proxy_pass <endpoint>;
    }
}
```


### Apache

```

# Proxy
<VirtualHost *:80>
    ServerName "hostname"
    ProxyRequests On

    ProxyPassMatch   ^/suffix/(.*) http://localhost:port/$1
    ProxyPassReverse ^/suffix/(.*) http://localhost:port/$1
    
    <Location "/prod">
       ProxyPass <endpoint>
       ProxyPassReverse <endpoint>
    </Location>
    <Location "/dev">
       ProxyPass <endpoint>
       ProxyPassReverse <endpoint>
    </Location>
</VirtualHost>


# Reverse Proxy
<VirtualHost *:80>
    ServerName "cname.domain.com"
    ServerAlias "cname.domain2.com"
    
    ProxyPassMatch ^/(.*)$ <endpoint>/$1
    ProxyPassReverse ^/(.*)$ <endpoint>/$1
</VirtualHost>
```










