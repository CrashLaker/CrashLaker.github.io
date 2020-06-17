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

### Example code
```python
fastparquet.write(
    filename="./data3",
    data=dfs[0],
    compression='GZIP',
    file_scheme='hive',
    #open_with=myopen,
    partition_on=['year', 'month', 'day'],
    write_index=False,
    #mkdirs= lambda x: True # for s3fs
)

dfs[0].sort_values("ds").to_parquet(
    fname="./data3/",
    compression='GZIP',
    #compression='',
    engine='fastparquet',
    #append=True,
    partition_cols=['year', 'month', 'day'],
    index=False
)

# add new
#toadd = dfs[1].sort_values("ds")
toadd = pd.read_pickle("p2_9.pkl")
filters = [('ds', '>', pd.Timestamp(toadd.iloc[0]['ds'].replace(tzinfo=None))), ('ds', '<', pd.Timestamp(toadd.iloc[-1]['ds'].replace(tzinfo=None)))]
ddf = dd.read_parquet("./data3", columns=['ds'], filters=filters, index=False)
dup = ddf['ds'].compute()
toadd_new = toadd[~toadd["ds"].isin(dup.tolist())]
print("dup", len(toadd)-len(toadd_new))
toadd_new.to_parquet(
    fname="./data3/",
    compression='GZIP',
    #compression='',
    engine='fastparquet',
    append=True,
    partition_cols=['year', 'month', 'day'],
    index=False
)

#plot
df2 = pd.read_parquet("./data3", engine='pyarrow').sort_values("ds")
fullds = pd.date_range(start='1/1/2020', end='1/7/2020')
fig, ax = plt.subplots()
fig.set_size_inches(17,6)
ax.plot(fullds.values, [0]*len(fullds), alpha=0)
ax.plot(df2["ds"].values, df2["A"].values)
```

### Dask concat two dataframes + drop_duplicates
https://www.reddit.com/r/learnpython/comments/cwidq4/dask_concat_two_dataframes_delete_duplicates/








***