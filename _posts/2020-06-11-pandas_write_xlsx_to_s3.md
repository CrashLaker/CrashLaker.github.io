---
layout: post
title: "Pandas write XLSX to S3"
comments: true
date: "2020-06-11 02:11:43.846000+00:00"
categories:  [programming]
tags:  [pandas, python, s3fs]
---




https://stackoverflow.com/questions/53565895/xlsx-pandas-write-to-s3-with-tabs

```python
import io
import boto3
import xlsxwriter
import pandas as pd

bucket = 'your-s3-bucketname'
filepath = 'path/to/your/file.format'
df = pd.DataFrame({'Data': [10, 20, 30, 20, 15, 30, 45]})

with io.BytesIO() as output:
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, 'sheet_name')
    data = output.getvalue()
s3 = boto3.resource('s3')
s3.Bucket(bucket).put_object(Key=filepath, Body=data)
```

