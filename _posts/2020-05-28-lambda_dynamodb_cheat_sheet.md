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
rs = dynamodb.scan
```