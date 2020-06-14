---
layout: post
title: "Parquet as Database Case Study"
comments: true
date: "2020-05-23 20:55:26.299000+00:00"
categories:  [bigdata]
tags:  [python, parquet]
---



### PyArrow

[How to append to parquet file periodically and read intermediate data - pyarrow.lib.ArrowIOError: Invalid parquet file. Corrupt footer.](https://github.com/apache/arrow/issues/3203)

### Spark
[Append new data to partitioned parquet files](https://stackoverflow.com/questions/34935393/append-new-data-to-partitioned-parquet-files)

[Incrementally loaded Parquet files](https://aseigneurin.github.io/2017/03/14/incrementally-loaded-parquet-files.html)

[Spark predicate pushdown performance](https://stackoverflow.com/questions/51851827/spark-predicate-pushdown-performance)

### Pandas
[How to write a partitioned Parquet file using Pandas](https://stackoverflow.com/questions/52934265/how-to-write-a-partitioned-parquet-file-using-pandas)

### Dask
[dataframe.to_parquet method always appends data when partitioned](https://github.com/dask/dask/issues/5873)

[Appending parquet file from python to s3](https://github.com/dask/fastparquet/issues/327)

### Write to S3fs
https://medium.com/swlh/using-s3-just-like-a-local-file-system-in-python-497737783f11
    
```python
import s3fs
import pickle
import json
import numpy as np

  json.dump(model_options, s3.open(f"{BUCKET_NAME}/options_{model_options['name'] + str(np.random.randint(10000))}.json",'w'))

  pickle.dump(model, s3.open(f"{BUCKET_NAME}/model_{model_options['name'] + str(np.random.randint(10000))}.pkl",'w'))
```

#### pandas to_parquet fails to save partitioned parquet to s3
https://stackoverflow.com/questions/51711213/pandas-dataframe-to-parquet-fails-when-s3-is-the-destination/51721088
```python
import s3fs
from fastparquet import write
s3 = s3fs.S3FileSystem()
myopen = s3.open
write('s3://bucketname/test.parquet', dftest, compression='GZIP', open_with=myopen)
```

**Backend File-Systems**
```python
import s3fs
from fastparquet import ParquetFile
s3 = s3fs.S3FileSystem()
myopen = s3.open
pf = ParquetFile('/mybucket/data.parquet', open_with=myopen)
df = pf.to_pandas()
```









***