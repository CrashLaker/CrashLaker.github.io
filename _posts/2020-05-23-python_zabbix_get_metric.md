---
layout: post
title: "Python Zabbix Get Metric"
comments: true
date: "2020-05-23 16:02:59.454000+00:00"
categories:  [monitoring]
tags:  [zabbix, python, api]
---






**Install**
```bash
pip install pyzabbix
```

**Login**
```python
ZABBIX_SERVER = '<zabbix server url>'

zapi = ZabbixAPI(ZABBIX_SERVER)

# Login to the Zabbix API
zapi.login(user, pwd)
```

**List Hosts**
```python
hosts = zapi.host.get(monitored_hosts=1, output='extend')
hosts = [{k:r[k] for k in ["host", "hostid"]} for r in hosts]
```

**Download Metric**
```python
for host in hosts:
    print(host["host"])
    data = get_metric(host["hostid"], "Total CPU Utilization", (2020,5,1), (2020,6,1))
```

**Get Metric**
```pyt