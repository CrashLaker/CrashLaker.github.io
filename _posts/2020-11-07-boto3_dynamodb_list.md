---
layout: post
title: "Boto3 DynamoDB List"
comments: true
date: "2020-11-07 02:03:48.611000+00:00"
---


```python
from dynamodb_json import json_util as json_dyn
import json

def json2djson(d):
    return json.loads(json_dyn.dumps(d))

def djson2json(d):
    return json_dyn.loads(d)

def scan_table(table_name_=None, client_=None, last_evaluated_key=None):
    if None in [table_name_, client_]:
        raise Exception('table_name or client empty')
    p = {'ExclusiveStartKey': last_evaluated_key} \
        if last_evaluated_key \
        else {}
    rs = client_.scan(**{'TableName': table_name_, **p})
    last_evaluated_key = rs.get('LastEvaluatedKey')
    items = rs['Items']
    if last_evaluated_key is None:
        return items
    else:
        return items + scan_table(table_name_, client_, last_evaluated_key)
```
