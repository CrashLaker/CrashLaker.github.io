---
layout: post
title: "Nginx docker-compose boilerplate"
comments: true
date: "2020-12-19 01:19:34.453000+00:00"
---


```

user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';


    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    server {
        server_name donotes.localshi.com;
        listen 80;
        location / {
            root /dist;
            try_files $uri $uri/ /index.html;
        }
    }

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```


```
version: "3"
services:
  nginx:
    image: "nginx"
    restart: always
    ports:
      - "8000:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./dist:/dist
  backend:
    image: "python:3.7"
    restart: always
    ports:
      - "8001:80"
    volumes:
      - ./backend:/backend
    environment:
      API_PORT: 80
    command: |
        bash -c "
            pip3 install flask flask-cors requests matplotlib
            cd /backend; python3 app.py
        "
```