---
layout: post
title: "Lambda DynamoDB Auto Increment"
comments: true
date: "2020-05-25 22:12:49.308000+00:00"
---

![](/assets/img/6eiFlNauA_232f311be25260b60b6e0f3a938aafb7.png)


```python
import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    dynamodb = boto3.client('dynamodb')
    rs = dynamodb.update_item(
        TableName= "serial_gen",
        Key= {
            "id": {
                "S": "100"
            }
        },
        ExpressionAttributeValues= {
            ":val": {
                "N": "1"
            }
        },
        UpdateExpression= "SET seq = seq + :val",
        ReturnValues= "UPDATED_NEW"
    )
    print(rs)
    return "ok"
```