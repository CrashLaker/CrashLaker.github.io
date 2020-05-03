---
layout: post
title: "Increase Prometheus Storage Retention Time"
comments: true
date: "2020-05-03 07:08:51.008000+00:00"
categories:  [monitoring]
tags:  [docker, prometheus]
---




`--storage.tsdb.retention.time=1y`

```bash
docker rm -f prom
docker run -dit --restart always \
    --name prom -p 9090:9090 \
    -v /root/prometheus/datastore:/prometheus -v /root/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus \
    --storage.tsdb.retention.time=1y \
    --config.file=/etc/prometheus/prometheus.yml \
    --storage.tsdb.path=/prometheus \
    --web.console.libraries=/usr/share/prometheus/console_libraries \
    --web.console.templates=/usr/share/prometheus/consoles
```


https://stackoverflow.com/questions/59298811/increasing-prometheus-storage-retention
https://github.com/prometheus/prometheus/issues/6188