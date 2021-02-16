---
layout: post
title: "Play with docker MPI playground"
comments: true
date: "2021-02-16 02:43:04.129000+00:00"
categories:  [mpi]
tags:  [docker, lab]
---



```bash
apk add \
  --no-cache \
  --repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
  openmpi
```

```bash
# mpirun --allow-run-as-root -n 4 hostname
node1
node1
node1
node1
```

![](/assets/img/7gK4wlSkO_4d49d41298e6f8588cd40fea8d5e0311.png)

![](/assets/img/7gK4wlSkO_536a4f8f18c4857a33c742fd1c939463.png)


`cat /etc/hosts`
```
192.168.0.28 node1
192.168.0.27 node2
192.168.0.26 node3
```

```bash
[ ! -d ~/.ssh ] && mkdir ~/.ssh
cat <<EOF > ~/.ssh/config
Host *
   StrictHostKeyChecking no
   UserKnownHostsFile=/dev/null
EOF  
```

```
mpirun --allow-run-as-root -n 3 -host node1,node2,node3 hostname
node1
node2
node3
```