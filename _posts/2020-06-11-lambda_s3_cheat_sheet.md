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


### Write matplotlib image [link](https://stackoverflow.com/questions/31485660/python-uploading-a-plot-from-memory-to-s3-using-matplotlib-and-boto)
```python
img_data = io.BytesIO()
plt.savefig(img_data, format='png')
img_data.seek(0)

s3 = boto3.resource('s3')
bucket = s3.Bucket(BUCKET_NAME)
bucket.put_object(Body=img_data, ContentType='image/png', Key=KEY)
```


