---
layout: post
title: "Python Toil"
comments: true
date: "2020-09-06 20:05:05.246000+00:00"
categories:  [programming]
tags:  [python, toil]
---



```python
import json
import pprint
import requests
import time
import datetime

def load_json(filename):
    if "http" in filename[0:5]:
        data = requests.get(filename)
        return data.json()
    with open(filename) as f:
        data = json.load(f)
    return data

def save_json(data, filename, force=False):
    if not type(filename) is list:
        filename = [filename]

    for fname in filename:
        with open(fname, "w") as f:
            if force:
                json.dump(json.loads(json.dumps(data, default=str)), f, indent=4, ensure_ascii=False)
            else:
                json.dump(data, f, indent=4, ensure_ascii=False)
                
def phead(data, lines=10, width=200):
    print("\n".join(pprint.pformat(data, indent=4, width=width).splitlines()[:lines]))

def start(*k):
    if len(k) > 0: print(*k)
    return datetime.datetime.now().timestamp()

def end(ts):
    print("Took {}".format(prettytime(cmillis()-ts)))

# https://stackoverflow.com/questions/14190045/how-do-i-convert-datetime-timedelta-to-minutes-hours-in-python
def seconds_to_hms(seconds):
    days = seconds // (3600 * 24)
    hours = (seconds // 3600) % 24
    minutes = (seconds // 60) % 60
    seconds = seconds % 60
    return f"{(days*24)+hours:02d}:{minutes:02d}:{seconds:02d}"    
```