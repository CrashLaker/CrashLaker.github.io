---
layout: post
title: "Output Htop to HTML"
comments: true
date: "2020-04-27 06:02:56+00:00"
categories:  [linux]
tags:  [htop, screen]
---





https://askubuntu.com/questions/726333/how-to-save-htop-output-to-file

```bash
echo q | htop | aha --black --line-fix > htop.html
```

Inside `screen`

```bash
export TERM=xterm
echo q | htop | aha --black --line-fix > htop.html
```

`SSH`

```bash
TERM=xterm ssh -tt machine bash -c "echo q | htop | aha --black --line-fix" > other_machine_htop.html
```

```bash
  1  [|||||||||||||||||||||||||||||||||                                    42.9%]     Tasks: 73, 251 thr; 1 running
  2  [||||||                                                                7.1%]     Load average: 0.28 0.32 0.32 
  Mem[||||||||||||||||||||||||||||||||||                              581/3916MB]     Uptime: 03:09:25
  Swp[                                                                  0/4056MB]
  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command          
 9785 dkb        20   0 31544  2464  1312 R 22.2  0.1  0:00.09 htop             
 3503 dkb        20   0 1065M 59684 16344 S  7.4  1.5  6:25.43 mpv --profile=pseudo-gui -- file:///home/dkb/Downloads/ONX
    1 root       20   0 33760  3088  1488 S  0.0  0.1  0:01.62 /sbin/init        
  276 root       20   0 19472   652   460 S  0.0  0.0  0:00.19 upstart-udev-bridge --daemon
  281 root       20   0 52592  2640  1016 S  0.0  0.1  0:00.76 /lib/systemd/systemd-udevd --daemon
  577 root       20   0 15256   632   388 S  0.0  0.0  0:00.05 upstart-socket-bridge --daemon
  662 root       20   0 15272   416   200 S  0.0  0.0  0:00.04 upstart-file-bridge --daemon
  677 syslog     20   0  249M  1304   836 S  0.0  0.0  0:00.01 rsyslogd          
  678 syslog     20   0  249M  1304   836 S  0.0  0.0  0:00.00 rsyslogd          
  679 syslog     20   0  249M  1304   836 S  0.0  0.0  0:00.02 rsyslogd          
  675 syslog     20   0  249M  1304   836 S  0.0  0.0  0:00.04 rsyslogd          
  680 messagebu  20   0 39860  1968  1044 S  0.0  0.0  0:00.52 dbus-daemon --system --fork
```


