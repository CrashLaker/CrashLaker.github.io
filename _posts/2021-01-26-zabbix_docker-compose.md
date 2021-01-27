---
layout: post
title: "Zabbix docker-compose"
comments: true
date: "2021-01-26 19:57:03.332000+00:00"
---

`docker-compose up -d`

Access http://\<ip>:8080
**Default user**: Admin
**Default password**: zabbix

```
version: "3"

services:
  zabbix-server:
    image: zabbix/zabbix-server-pgsql:latest
    ports:
      - 10051:10051
        #volumes:
        #  - ./:/app
    environment:
      - DB_SERVER_HOST=db
      - POSTGRES_DB=zabbix
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
    restart: always
    depends_on:
      - db

  zabbix-frontend:
    image: zabbix/zabbix-web-nginx-pgsql:latest
    ports:
      - 80:80
      - 8080:8080
    ulimits:
      nofile:
        soft: 10000
        hard: 1000000
    environment:
      - ZBX_SERVER_HOST=zabbix-server
      - ZBX_SERVER_PORT=10051
      - DB_SERVER_HOST=db
      - DB_SERVER_PORT=5432
      - POSTGRES_DB=zabbix
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
    restart: always
    depends_on:
      - db

  zabbix-agent:
    image: zabbix/zabbix-agent:latest
    environment:
      - ZBX_HOSTNAME=zabbix-agent
      - ZBX_SERVER_HOST=zabbix-agent
    restart: always

  db:
    image: postgres:13
    #ports:
      #- 5432:5432
    environment:
      - POSTGRES_DB=zabbix
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
```




















