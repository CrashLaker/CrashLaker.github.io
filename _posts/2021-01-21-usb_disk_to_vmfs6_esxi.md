---
layout: post
title: "USB Disk to VMFS6 ESXI"
comments: true
date: "2021-01-21 02:08:52.939000+00:00"
---

https://www.it-react.com/index.php/2020/04/26/how-to-add-a-usb-disk-as-vmfs-datastore-in-esxi-6-7/


### List disks
```bash
ls /dev/disks/
```

```bash

b1=vml.01000000004e4141584b545244457870616e73
b2=vml.01000000004e4141584c4a4452457870616e73
b3=vml.01000000004e4141584d565644457870616e73
b4=vml.01000000004e4141584e303947457870616e73

vmid=$b2
label=b2

# write label
partedUtil mklabel /dev/disks/${vmid} gpt

# partedUtil getptbl /dev/disks/${vmid}

# compute final sector
endsec=$(eval expr $(partedUtil getptbl /dev/disks/${vmid} | tail -1 | awk '{print $1 " \\* " $2 " \\* " $3}') - 1)

# create partition
partedUtil setptbl /dev/disks/${vmid} gpt "1 2048 ${endsec} AA31E02A400F11DB9590000C2911D1B8 0"

# format vmfs6
vmkfstools -C vmfs6 -S ${label} /dev/disks/${vmid}:1

```