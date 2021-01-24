---
layout: post
title: "Python Redis"
comments: true
date: "2020-04-20 19:51:59.144000+00:00"
categories:  [programming]
tags:  [python, redis]
---




```python
from redis import Redis

redis = Redis(
    host="redishost",
    port=6379,
    password=""
)

def list_index():
    return [_.decode() for _ in redis.keys()]

def in_index(index):
    return index in list_index

def set_cache(index, body):
    if type(body) is str:
        redis.set(index, body)
    else:
        redis.set(index, json.dumps(body))

def get_cache(index):
    v = redis.get(index)
    try:
        return json.loads(v)
    except:
        return v.decode()

def delete_cache(index):
    redis.delete(index)
```