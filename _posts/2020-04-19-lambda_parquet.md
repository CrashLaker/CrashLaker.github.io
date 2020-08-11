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
cd /root/layer
zip -r /root/layer.zip . 
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


```bash
layername="layer-pandas-s3fs-fastparquet"


rm -rf layer

docker run -it -v `pwd`:/local --rm python:3.7 bash -c "
                apt update && apt install -y zip
                mkdir -p /layer/python
                cd /layer/python
                #pip3 install -t . pandas s3fs fastparquet packaging matplotlib
                pip3 install -t . pandas s3fs fastparquet packaging  dask[dataframe]
                rm -rf botocore
                cd /layer
                cp -r /layer /local/
                zip -r /local/${layername}.zip .
        "
```

### Lambda Write

```python
def lambda_handler(event, context):
    # TODO implement
    s3 = s3fs.S3FileSystem()
    myopen = s3.open
    db = 's3://crashlakerbuckettest-sa/data9/'
    if 0: # start
        df = pd.read_pickle(s3.open("s3://crashlakerbuckettest-sa/dummy_data2/p2_0.pkl"))
        fastparquet.write(
            filename=db,
            data=df,
            compression='GZIP',
            file_scheme='hive',
            open_with=myopen,
            partition_on=['year', 'month', 'day'],
            write_index=False,
            mkdirs= lambda x: True
        )
    else:
        toadd = pd.read_pickle(s3.open("s3://crashlakerbuckettest-sa/dummy_data2/p2_9.pkl"))
        dfrom = toadd.iloc[0]['ds'].replace(tzinfo=None)
        dto = toadd.iloc[-1]['ds'].replace(tzinfo=None)
        filters = [('ds', '>', pd.Timestamp(dfrom)),
                   ('ds', '<', pd.Timestamp(dto))]
        ddf = dd.read_parquet(db, columns=['ds'], filters=filters, index=False)
        #dds = ddf[["ds"]]
        #dds = dds[(dds["ds"] >= toadd.iloc[0]["ds"]) & (dds["ds"] <= toadd.iloc[-1]["ds"])]
        dup = ddf['ds'].compute()
        toadd_new = toadd[~toadd["ds"].isin(dup.tolist())]
        print("dup", len(toadd)-len(toadd_new))
        fastparquet.write(
            filename=db,
            data=toadd_new,
            compression='GZIP',
            file_scheme='hive',
            open_with=myopen,
            append=True,
            partition_on=['year', 'month', 'day'],
            write_index=False,
            mkdirs= lambda x: True
        )
```

### Plot
```python
import json
import s3fs
import pandas as pd
import sys
import os
import fastparquet
import matplotlib.pyplot as plt
import boto3

def lambda_handler(event, context):
    # TODO implement
    print(sys.path)
    print(os.listdir('/opt/python'))
    s3 = s3fs.S3FileSystem()
    myopen = s3.open
    
    fullds = pd.date_range(start='1/1/2020', end='1/7/2020')
    db = 's3://<bucket>/<key>/'
    df = pd.read_parquet(db, columns=['ds', 'A']).sort_values('ds')
    df = df.drop_duplicates()
    print('total len', len(df))
    print('drop dup', len(df.drop_duplicates()))
    print(df.head())
    
    fig, ax = plt.subplots()
    fig.set_size_inches(17,6)
    ax.plot(fullds.values, [0]*len(fullds), alpha=0)
    ax.plot(df['ds'].values, df['A'].values)
    #ax.plot(fulldf['ds'].values, [0]*len(fulldf), alpha=0)
    #ax.plot(df['ds'].values, df['0'].values)
    import io
    img_data = io.BytesIO()
    fig.savefig(img_data, format='png')
    img_data.seek(0)
    s3 = boto3.resource('s3')
    s3.Bucket('<bucket>').put_object(Body=img_data, 
                                                 ContentType='image/png',
                                                 Key='img4_4.png')
```

***