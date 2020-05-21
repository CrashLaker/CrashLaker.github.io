---
layout: post
title: "Lambda SQS Cheat Sheet"
comments: true
date: "2020-05-21 02:02:16.590000+00:00"
categories:  [aws]
tags:  [lambda, sqs]
---





```python
import json
import boto3

def lambda_handler(event, context):
    sqs = boto3.resource('sqs')
    queue =sqs.get_queue_by_name(QueueName='sqs-test-backup')
    resp = queue.send_message(MessageBody='message from lambda', 
                              MessageAttributes={
                                  'foo': {
                                      'StringValue': 'bar',
                                      'DataType': 'String'
                                  }
                              })
    print('MessageId', resp.get('MessageId')) 
    print('MD5OfMessageBody', resp.get('MD5OfMessageBody'))
    return 'ok'
```