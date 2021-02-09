---
layout: post
title: "Samba Centos 7/8"
comments: true
date: "2020-10-04 22:21:32.851000+00:00"
---


https://linuxize.com/post/how-to-install-and-configure-samba-on-centos-7/

```bash
yum -y install samba
```

/etc/samba/smb.conf
```
[global]
workgroup = WORKGROUP
server string = Samba Server Docker %v
netbios name = centos
security = user
#map to guest = bad user
map to guest = never
dns proxy = no
valid users = root
#============================ Share Definitions ==============================
[storage3]
path = /storage3
browsable = yes
writable = yes
guest ok = no
read only = no
```

---

### Mount on Centos 7

https://www.serverlab.ca/tutorials/linux/storage-file-systems-linux/mounting-smb-shares-centos-7/

```bash
cat <<EOF > /root/credentials
username=usesr
password=secret
EOF


# /etc/fstab
\\machine\share /lib_core    cifs    credentials=/root/credentials 0 0

```


### Caveats

#### Mounted folder reporting wrong size
https://superuser.com/questions/1423396/samba-reports-incorrect-disk-space-when-on-shared-mount-points-not-directly-bene

inside `smb.conf`
`dfree command = /usr/local/bin/dree`

`/usr/local/bin/dfree`
```
echo 10000000000 10000000000
```

![](/assets/img/Qiaf0EwVj_5db7d802fbd4d1456fb31839faae956e.png)















