---
layout: post
title: "Lambda parquet"
comments: true
date: "2020-04-19 00:48:55.475000+00:00"
categories:  [aws, data-engineer]
tags:  [development, lambda, aws]
---



```bash
cd /root/layer
mkdir -p python/lib/python3.7/site-packages/
cd python/lib/python3.7/site-packages/     
pip3 install -t . pyarrow==0.12.1 pandas   
cd /root
zip -r layer.zip layer
```

Upload to S3
Create Layer
Create lambda


https://github.com/apache/arrow/issues/4216

```python
import json
import pandas as pd
import numpy as np
import pyarrow as pa
import pyarrow.parquet as pq
import os
import boto3

def lambda_handler(event, context):
    # TODO implement
    df = pd.DataFrame({'one': [-1, np.nan, 2.5],
         'two': ['foo', 'bar', 'baz'],
         'three': [True, False, True]},
         index=list('abc'))
    print(df)
    table = pa.Table.from_pandas(df)
    pq.write_table(table, '/tmp/example.parquet')
    print(os.listdir('/tmp/'))
    s3 = boto3.resource('s3')
    s3.Bucket('buckettest1').upload_file('/tmp/example.parquet', 'example.parquet')


    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

```

