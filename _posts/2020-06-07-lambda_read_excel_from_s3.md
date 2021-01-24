---
layout: post
title: "Lambda read excel from S3"
comments: true
date: "2020-06-07 19:26:14.742000+00:00"
categories:  [programming]
tags:  [python, excel, s3fs]
---




```bash
pip3 install xlrd pandas s3fs
```


```python
import json
import s3fs
import pandas as pd

def lambda_handler(event, context):
    
    s3fs_obj = s3fs.S3FileSystem()
    df = pd.read_excel("s3://<bucket/<key>", filesystem=s3fs_obj)
    pritn(df.head())
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```