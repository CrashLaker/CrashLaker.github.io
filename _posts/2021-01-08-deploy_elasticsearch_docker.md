---
layout: post
title: "Deploy ElasticSearch Docker"
comments: true
date: "2021-01-08 21:09:01.223000+00:00"
---

docker-compose
https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html

known caveats:

**"max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]"**
https://borisdering.medium.com/elasticsearch-as-a-service-on-docker-swarm-max-file-descriptors-error-c99f34572084

`sed -i 's/^\(OPTIONS.*\)/\\1 \\nOPTIONS="--default-ulimit nofile=65536:65536"/' /etc/sysconfig/docker`


**"max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]"**

`sysctl -w vm.max_map_count=262144`

