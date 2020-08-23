---
layout: post
title: "CentOS System Service"
comments: true
date: "2020-06-08 13:37:54.953000+00:00"
categories:  [linux]
tags:  [centos, systemctl]
---


`/usr/lib/systemd/system/<name>.service`

```
[Unit]
Description = <description>
After = network.target

[Service]
#Environment="foo=bar"
WorkingDirectory=<working dir>
Restart=on-failure
#RestartSec=3
ExecStart=/usr/bin/python3 app.py

[Install]
WantedBy = multi-user.target
```

```bash
systemctl daemon-reload
```

```bash
systemctl start|restart|enable your_service
```

```bash
systemctl list-units
UNIT                                      LOAD   ACTIVE SUB     DESCRIPTION
atd.service                               loaded active running ATD daemon
avahi-daemon.service                      loaded active running Avahi mDNS/DNS-SD Stack
dbus.service                              loaded active running D-Bus System Message Bus
dcron.service                             loaded active running Periodic Command Scheduler
dkms.service                              loaded active exited  Dynamic Kernel Modules System
getty@tty1.service                        loaded active running Getty on tty1
```

```bash
systemctl list-unit-files
UNIT FILE                                  STATE   
proc-sys-fs-binfmt_misc.automount          static  
dev-hugepages.mount                        static  
dev-mqueue.mount                           static  
proc-fs-nfsd.mount                         static  
proc-sys-fs-binfmt_misc.mount              static  
sys-fs-fuse-connections.mount              static  
sys-kernel-config.mount                    static  
sys-kernel-debug.mount                     static  
tmp.mount                                  static  
var-lib-nfs-rpc_pipefs.mount               static  
org.cups.cupsd.path                        enabled
```


```bash
echo "svc name"
read svcname
if [ ! "$svcname" -eq "" ]; then
filename="/usr/lib/systemd/system/${svcname}.service"
echo "to create $filename"
cat <<EOF > $filename
[Unit]
Description = <description>
After = network.target

[Service]
#Environment="foo=bar"
WorkingDirectory=<working dir>
Restart=on-failure
#RestartSec=3
ExecStart=/usr/bin/python3 app.py

[Install]
WantedBy = multi-user.target
EOF
echo "file created"
echo $filename

fi
```
