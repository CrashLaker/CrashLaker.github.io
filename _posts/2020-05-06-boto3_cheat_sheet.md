---
layout: post
title: "Boto3 Cheat Sheet"
comments: true
date: "2020-05-06 00:55:03.882000+00:00"
categories:  [aws]
tags:  [lambda, boto3, python]
---





#### Run_instance
```python
import json
import boto3

def lambda_handler(event, context):
    client = boto3.client('ec2', 'us-east-1')
    
    #keys = client.describe_key_pairs() # get key_paris
    #print(keys)
    
    userdata = """#!/bin/bash
exec > /tmp/log 2>&1
whoami > /tmp/test
aws s3 cp /tmp/test s3://buckettest1/arquivo-ec2.txt
#shutdown -h now
    """
    
    rs = client.run_instances(
        ImageId='ami-0fc61db8544a617ed',
        InstanceType='t2.micro',
        #IamInstanceProfile={
        #    'Arn': '<arn permissions>'
        #},
        SecurityGroupIds=['sg-068532f1ef56233ec'],
        KeyName='<ssh key name>',
        InstanceInitiatedShutdownBehavior='terminate',
        UserData=userdata,
        MaxCount=1,
        MinCount=1
    )
    print(rs)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

```

















********************