---
layout: post
title: "Python connect to MongoDB"
categories: [programming]
tags: [python, mongodb]
comments: true
date: "2020-04-14 03:53:13.398000+00:00"
---


### Connect to pymongo
```python
import pymongo
# connect
client = pymongo.MongoClient("mongodb://{user}:{password}@{host}:{port}/")
# list database names
client.list_database_names()
# list collections
client["bm"].list_collection_names()
# distinct key
start = datetime.datetime(2020,3,9,9)
end = datetime.datetime(2020,3,9,18)
rs = col.find({"timestamp": {"$gte": start, "$lte": end}}).distinct("key")
# download timeseries metrics sort by
start = datetime.datetime(2020,3,9,9)
end = datetime.datetime(2020,3,9,18)
rs = col.find({"timestamp": {"$gte": start, "$lte": end}}).sort("timestamp")
```

Get 1 row
`collection.find().limit(1).next()`


###### Pymongo group by multiple keys
https://stackoverflow.com/questions/22932364/mongodb-group-values-by-multiple-fields
https://stackoverflow.com/questions/31098073/pymongo-group-by-multiple-keys?rq=1
```python
rs = collection.aggregate([
    { "$match": {
        "timestamp": {
            "$gte": start,
            "$lte": end
        },
    }},
    { "$group": {
        "_id": {
            "key": "$key",
            "instance": "$instance"
        },
        #"count": { "$sum": 1 }
    }}
])
rs = [_ for _ in rs]
```





