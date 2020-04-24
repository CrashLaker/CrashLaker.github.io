---
layout: post
title: "Docker Compose DEV"
comments: true
date: "2020-04-24 02:01:33.587000+00:00"
categories:  [programming]
tags:  [docker-compose, docker]
---





```dockerfile=
version: '3.1'
services:
    web:
        image: python:3.6
        restart: always
        environment:
            API_PORT: 80
            PYTHONPATH: /pythonpath
        port:
            - 8080:80
        volumes:
            - ./app.py:/app.py
            - /root/pythonpath:/pythonpath
        extra_hosts:
            - "google.com:127.0.0.1"
        command: |
            sh -c "pip3 install redis gunicorn &&
            pip3 install flask flask-cors requests &&
            #python3 /app.py
            cd /; gunicorn --workers=2 'app:create_app()' --bind=0.0.0.0:80"
```