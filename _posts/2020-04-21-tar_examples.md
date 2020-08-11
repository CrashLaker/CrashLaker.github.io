---
layout: post
title: "Tar examples"
comments: true
date: "2020-04-21 20:16:36.830000+00:00"
categories:  [backup]
tags:  [linux, backup]
---



https://www.cyberciti.biz/faq/howto-use-tar-command-through-network-over-ssh-session/

```bash
$ tar cvjf - * | ssh vivek@nixcraft "(cd /dest/; tar xjf -)"
$ tar cvzf - mydir/ | ssh vivek@backupbox "cat > /backups/myfile.tgz"
$ tar cvzf - /var/www/html | ssh vivek@server1.cyberciti.biz "dd of=/backups/www.tar.gz"
$ ssh vivek@box2 "cat /backups/www.tar.gz" | tar xvzf -
$ tar cvjf - * | ssh root@home.nas02 "(cd /dest/; tar xjf - )"
```