---
layout: post
title: "Paramiko Python"
comments: true
date: "2020-06-05 04:15:52.369000+00:00"
categories:  [programming]
tags:  [python, paramiko, ssh]
---



Use python2.7
```bash
pip install paramiko
```

```python
import paramiko
# Ed25519Key....
k = paramiko.RSAKey.from_private_key_file("/Users/whatever/Downloads/mykey.pem")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print "connecting"
c.connect( hostname = "www.acme.com", username = "ubuntu", pkey = k )
print "connected"
commands = [ "/home/ubuntu/firstscript.sh", "/home/ubuntu/secondscript.sh" ]
for command in commands:
	print "Executing {}".format( command )
	stdin , stdout, stderr = c.exec_command(command)
	print stdout.read()
	print( "Errors")
	print stderr.read()
c.close()
```


https://gist.github.com/batok/2352501