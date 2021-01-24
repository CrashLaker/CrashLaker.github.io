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
    table.get_item(Key={
        'code': 200
    })
       
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


### Put_item based on ConditionalExpression
```python
import json
import boto3
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    # TODO implement
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('<table>')
    doc = {
        'code': 200,
        'version': 1,
        'body': {
            'a': 1
        }
    }
    if 0:
        table.put_item(Item={
            **doc
        })
    else:
        try:
            doc['body']['a']= 4
            rs = table.put_item(
                Item = {
                    **doc
                },
                ConditionExpression='version = :ver',
                ExpressionAttributeValues={
                    ':ver': 1
                }
            )
            print(rs)
        except ClientError as e:
            print("exception")
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print(e.response['Error']['Message'])
            else:
                raise
        
        
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

```

### Scan using client
```python
items = []
last_evaluated_key = None
table_name = '<table name>'
while True:
    p = {'ExclusiveStartKey': last_evaluated_key} \
        if last_evaluated_key \
        else {}
    rs = client.scan(**{'TableName': table_name, **p})
    last_evaluated_key = rs.get('LastEvaluatedKey')
    items += rs['Items']
```

### Scan using Resource
```python
items = []
table_name = '<table name>'
database = resource.Table(table_name)
last_evaluated_key = None
while True:
    p = {'ExclusiveStartKey': last_evaluated_key} \
        if last_evaluated_key \
        else {}
    rs = database.scan(**p)
    last_evaluated_key = rs.get('LastEvaluatedKey')
    items += rs['Items']
    if not last_evaluated_key: break
```






***