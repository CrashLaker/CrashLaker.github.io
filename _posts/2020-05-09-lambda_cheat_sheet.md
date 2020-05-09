---
layout: post
title: "Lambda Cheat Sheet"
comments: true
date: "2020-05-09 05:33:42.173000+00:00"
categories:  [aws]
tags:  [lambda, aws]
---



### load & save from/to s3
```python
import boto3
import json

s3 = boto3.resource('s3')
    
def load_s3(bucket, key):
    obj = s3.Object(bucket, key)
    body = obj.get()['Body'].read()
    return json.loads(body.decode())
    
def save_s3(data, bucket, key):
    obj = s3.Object(bucket, key)
    obj.put(Body=json.dumps(data).encode())


def lambda_handler(event, context):
    # TODO implement
    
    bucket = '<bucket name>'
    key = '<keyname>'
    body = load_s3(bucket, key)
    print(body)
    body["a"] = "b"
    save_s3(body, bucket, key)
```
