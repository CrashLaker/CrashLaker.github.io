---
layout: post
title: "Setup PySpark Centos 7"
comments: true
date: "2021-02-09 04:27:41.177000+00:00"
---


http://devopspy.com/python/apache-spark-pyspark-centos-rhel/

```bash
yum -y install java-1.8.0-openjdk
# download latest apache spark from https://spark.apache.org/downloads.html

wget https://downloads.apache.org/spark/spark-3.0.1/spark-3.0.1-bin-hadoop2.7.tgz
tar xzvf spark-3.0.1-bin-hadoop2.7.tgz
cp -r spark-3.0.1-bin-hadoop2.7 /opt/spark

pip3.6 install pyspark

export SPARK_HOME=/opt/spark
export PATH=$SPARK_HOME:$PATH
export PYSPARK_PYTHON=python3.6
```

```python
from pyspark import SparkContext
from pyspark.sql import SparkSession

spark = SparkSession.builder \
        .master('local') \
        .appName('myappname') \
        .getOrCreate()

db = "./test"

time_from = '2020-12-01'
time_to = '2021-01-01'

df1 = spark.read.parquet(db)

df = df1.where((df1['ds'] >= time_from) & (df1['ds'] < time_to))

df2 = df.toPandas()

df2 = df2.sort_values('ds')

print(df2.head(10))
print(df2.tail(10))
```


get spark context
https://stackoverflow.com/questions/42991198/how-do-i-read-a-parquet-in-pyspark-written-from-spark/42991580