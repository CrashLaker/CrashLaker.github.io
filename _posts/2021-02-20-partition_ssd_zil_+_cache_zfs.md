---
layout: post
title: "Partition SSD zil + cache ZFS"
comments: true
date: "2021-02-20 00:14:01.529000+00:00"
---



```
parted /dev/sdd
mklabel gpt
mkpart primary 0% 20%
mkpart primary 20% 100%
quit

zpool add -f tank log /dev/sdd1
zpool add -f tank cache /dev/sdd2
```

* https://askubuntu.com/questions/507274/how-to-create-two-partitions-with-exactly-the-same-size
* https://www.zfsbuild.com/2010/06/03/howto-zfs-add-log-drives-zil/
* https://www.zfsbuild.com/2010/06/03/howto-add-cache-drives-to-a-zpool/