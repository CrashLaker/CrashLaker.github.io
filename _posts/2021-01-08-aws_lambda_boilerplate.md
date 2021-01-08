---
layout: post
title: "AWS Lambda Boilerplate"
comments: true
date: "2021-01-08 02:11:09.726000+00:00"
---


```python
import json
import boto3


def lambda_handler(event, context):
    
    # queryParams GET
    qp = event.get("queryStringParameters", {})

    # POST Payload
    data = json.loads(event['body'])



    # CORS Return
    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': 'https://www.example.com',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': results,
    }

```