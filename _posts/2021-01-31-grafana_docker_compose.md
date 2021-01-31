---
layout: post
title: "Grafana Docker Compose"
comments: true
date: "2021-01-31 02:17:45.770000+00:00"
---


```
version: '2'

services:
  grafana:
    image: grafana/grafana:7.3.7
    restart: always
    volumes:
      - /root/docker-grafana2/grafana.ini:/etc/grafana/grafana.ini
      - /root/docker-grafana2/lib-data:/var/lib/grafana
    ports:
      - 300:3000
    environment:
      GF_RENDERING_SERVER_URL: http://renderer:8081/render
      GF_RENDERING_CALLBACK_URL: http://grafana:3000/
      GF_LOG_FILTERS: rendering:debug
  renderer:
    image: grafana/grafana-image-renderer:latest
    ports:
      - 8081
    environment:
      ENABLE_METRICS: 'true'
```


