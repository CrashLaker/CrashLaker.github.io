---
layout: post
title: "Lambda RDS Cheat Cheet"
comments: true
date: "2020-05-21 02:11:22.094000+00:00"
categories:  [aws]
tags:  [lambda, rds]
---




### Describe RDS Instances
```python
import json
import boto3
import pprint

def lambda_handler(event, context):
    # TODO implement
    
    rds = boto3.client('rds')
    rs = rds.describe_db_instances()["DBInstances"]
    #pprint.pprint(rs)
    cols = ["DBInstanceIdentifier", "DBInstanceStatus", "DBInstanceClass", "Endpoint", "Engine", "LicenseModel"]
    for r in rs:
        newdoc = {k:r.get(k, '') for k in cols}
        newdoc.update({"DBSubnetGroupName": r["DBSubnetGroup"]["DBSubnetGroupName"]})
        pprint.pprint(newdoc)
        #pprint.pprint(r)
    
    return "ok"kj
```