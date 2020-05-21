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

### Create from Snapshot
```python
import json
import boto3
import pprint

def lambda_handler(event, context):
    # TODO implement
    rds = boto3.client('rds')
    old = {'DBInstanceClass': 'db.t2.micro',
         'DBInstanceIdentifier': 'backuptest-mysql-snapshot', 
         'DBInstanceStatus': 'available',
         'DBSubnetGroupName': '',
         'Endpoint': {'Address': '',
                      'HostedZoneId': '',
                      'Port': 3306},
         'Engine': 'mysql',
         'LicenseModel': 'general-public-license'}
    old = {'DBInstanceClass': 'db.t2.micro',
         'DBInstanceIdentifier': 'backupteste-pgsql-snapshot',
         'DBInstanceStatus': 'available',
         'DBSubnetGroupName': '',
         'Endpoint': {'Address': '',
                      'HostedZoneId': '',
                      'Port': 5432},
         'Engine': 'postgres',
         'LicenseModel': 'postgresql-license'}
    newinstance = rds.restore_db_instance_from_db_snapshot(
        DBInstanceIdentifier=old["DBInstanceIdentifier"]+"-fromsnapshot",
        DBSnapshotIdentifier=old["DBInstanceIdentifier"],
        DBInstanceClass=old["DBInstanceClass"],
        Port=old["Endpoint"]["Port"],
        DBSubnetGroupName=old["DBSubnetGroupName"],
        MultiAZ=False,
        PubliclyAccessible=False,
        LicenseModel=old["LicenseModel"],
        AutoMinorVersionUpgrade=False,
        #OptionGroupName=
        #Tags
    )
    
    
    pprint.pprint(newinstance)
    return "ok"
```
