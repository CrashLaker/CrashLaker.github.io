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