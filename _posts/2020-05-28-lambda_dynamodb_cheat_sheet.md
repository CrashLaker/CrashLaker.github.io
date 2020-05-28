---
layout: post
title: "Lambda DynamoDB Cheat Sheet"
comments: true
date: "2020-05-28 17:53:35.737000+00:00"
categories:  [aws]
tags:  [lambda, dynamodb]
---




### Get/Put Item
```python
import json
import boto3
import decimal

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    table = dynamodb.Table('<table name>')
    # get_item
    table.get_item(Key='<key name>')
       
    # Put Item
    table.put_item(Item={
        'code': 200,
        'title': 'my title',
        'info': {
            'more_info': 'the info'
        }
    })
```


### Scan Loop
```python
rs = dynamodb.scan(TableName=table, Limit=50)
row = []
while 'LastEvaluatedKey' in rs:
    row.extend([_ for _ in rs['Items']])
    rs = dynamodb.scan(TableName=table, Limit=50, ExclusiveStartKey=rs['LastEvaluatedKey'])
```

### Parse DynamoDB JSON

`pip3 install dynamodb-json`

```
from dynamodb_json import json_util as json_dyn
..
row.extend([json_dyn.loads(_) for _ in rs['Items']])
..
```