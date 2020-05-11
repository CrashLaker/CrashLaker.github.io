---
layout: post
title: "Creating InstanceProfiles with Lambda"
comments: true
date: "2020-05-11 02:10:56.915000+00:00"
categories:  [aws]
tags:  [lambda, runinstances, instanceprofile]
---




First assign `PassRole` to your lambda role:
https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html

```
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "iam:GetRole",
            "iam:PassRole"
        ],
        "Resource": "*"
    }]
}
```

```python
import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    client = boto3.client('ec2', 'us-east-1')
    
    #keys = client.describe_key_pairs()
    #print(keys)
    
    #return
    userdata = """#!/bin/bash
exec > /tmp/log 2>&1
#whoami > /tmp/test
#aws s3 cp /tmp/test s3://<bucketname>/<keyname>

shutdown -h now
    """
    rs = client.run_instances(
        ImageId='ami-0fc61db8544a617ed',
        InstanceType='t2.micro',
        IamInstanceProfile={
            'Arn': '<your arn>'
        },
        SecurityGroupIds=['<security group id>'],
        KeyName='<ssh key name>',
        InstanceInitiatedShutdownBehavior='terminate',
        UserData=userdata,
        MaxCount=5,
        MinCount=5
    )
    print(rs)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```