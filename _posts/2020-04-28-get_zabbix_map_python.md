---
layout: post
title: "Get Zabbix Map Python"
comments: true
date: "2020-04-28 02:48:33.028000+00:00"
categories:  [monitoring]
tags:  [zabbix, python]
---




https://github.com/adubkov/py-zabbix


```python
from pyzabbix.api import ZabbixAPI
zapi = ZabbixAPI(url='http://192.168.31.78:8880/', user='Admin', password='zabbix')

re=zapi.map.get(
      output="extend",
          selectSelements="extend",
          selectLinks="extend",
          selectUsers="extend",
          selectUserGroups="extend",
)

print("Map name", re[0]["name"])
display(re[0]["selements"])
```

```
Map name Local network
[{'selementid': '1',
  'sysmapid': '1',
  'elementtype': '0',
  'iconid_off': '185',
  'iconid_on': '0',
  'label': '{HOST.NAME}\r\n{HOST.CONN}',
  'label_location': '0',
  'x': '111',
  'y': '61',
  'iconid_disabled': '0',
  'iconid_maintenance': '0',
  'elementsubtype': '0',
  'areatype': '0',
  'width': '200',
  'height': '200',
  'viewtype': '0',
  'use_iconmap': '0',
  'application': '',
  'elements': [{'hostid': '10084'}],
  'urls': [],
  'permission': 2}]
```







https://github.com/w616054/zabbix_map/blob/be2f941a96538ba8704abf82212ea985980c31b9/create_map.py

