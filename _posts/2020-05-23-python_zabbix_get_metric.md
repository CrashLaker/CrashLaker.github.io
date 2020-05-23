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
```python
def get_metric(host_id, metric, dfrom, dto):
    dfrom = int(datetime.datetime(*dfrom).timestamp())
    dto = int(datetime.datetime(*dto).timestamp())
    hostitems = zapi.item.get(filter={"hostid": host_id, "name": metric})
    t_metric = [item for item in hostitems if metric == item["name"] and item["hostid"] == host_id]
    data = {"values": [], "timestamps": []}
    if len(t_metric):
        # Create a time range
        item = t_metric.pop()
        # Query item's history (integer) data
        history = zapi.history.get(hostids=[host_id],
                                   itemids=[item["itemid"]],
                                   time_from=dfrom,
                                   time_till=dto,
                                   output='extend',
                                   #limit='5000',
                                   history=item["value_type"]
                                   )
        if len(history) == 0:
            return data
        df = pd.DataFrame(history)
        df = df[["clock", "value"]]
        df["value"] = df["value"].astype(float)
        df["clock"] = df["clock"].astype(int)
        df["clock"] = df["clock"]*1000
        return {"values": df["value"].tolist(), "timestamps": df["clock"].tolist()}
    return data
```