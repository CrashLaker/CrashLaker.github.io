---
layout: post
title: "AWS Fix Bash"
comments: true
date: "2020-11-17 20:52:15.044000+00:00"
---

I know... not a fix


Allow root login

```bash
awsfix ()
{
    ip=$1;
    pemloc="<loc>"
    pubkey="<your pub key>"
    ssh -i $pemloc ec2-user@$ip "sudo sed -i \"s,#PermitRootLogin yes,PermitRootLogin yes,g\" /etc/ssh/sshd_config";
    ssh -i $pemloc ec2-user@$ip "echo '$pubkey' | sudo tee -a /root/.ssh/authorized_keys";
    ssh -i $pemloc ec2-user@$ip "nohup sleep 2; sudo systemctl restart sshd&"
}
```