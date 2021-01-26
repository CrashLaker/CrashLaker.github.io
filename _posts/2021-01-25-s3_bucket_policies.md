---
layout: post
title: "S3 Bucket Policies"
comments: true
date: "2021-01-25 23:37:24.571000+00:00"
---

# Block by Referer
```json
{
    "Version": "2012-10-17",
    "Id": "S3PolicyId1",
    "Statement": [
        {
            "Sid": "IPAllow",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::<your-bucket>/*",
            "Condition": {
                "StringLike": {
                    "aws:Referer": [
                        "http://your-url"
                    ]
                }
            }
        }
    ]
}
```