---
layout: post
title: "Lambda S3 Cheat Sheet"
comments: true
date: "2020-06-11 23:41:01.554000+00:00"
categories:  [aws]
tags:  [programming, python, lambda, boto3]
---



```python
def dels3object(bucket, key):
    s3 = boto3.client('s3')
    s3.delete_object(Bucket=bucket, Key=key)
    
def listbucketkeys(bucket):
    s3 = boto3.client('s3')
    try:
        return [
            obj['Key']
            for obj in s3.list_objects_v2(Bucket=bucket)['Contents']
        ]
    except:
        return []
```