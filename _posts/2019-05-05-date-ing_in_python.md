---
layout: post
title: "Date-ing in python"
categories: [Medium]
tags: [python, python-datetime, python-timezone, python-timestamp]
comments: true
description: "Some quick cheat sheet on date performing date translations in python"
date: "2019-05-05"
---


Some quick cheat sheet on date performing date translations in python

![](/assets/img/_v3Qu4uCX_77cda0ed70de8d4b348eeccec08f164d.png)
*Source: [Tryfoto](https://www.tryfoto.com/photo/3577/clock-background)*

Dealing with dates from different sources is always a nightmare specially when you’re dealing with date timestamps from a bunch of different sources and architectures.

This story is going to be quick as I’ll just show out some quick ways to convert your data to a proper format and time zones offsets.

1. Datetime to timestamp

```python
import datetime
import time

date = datetime.datetime(2019,5,1) # date object
print(date) # 2019-05-01 00:00:00
ts = time.mktime(date.timetuple()) # timestamp in seconds
print(ts) # 1556668800.0
```

2. Timestamp to Datetime (no timezone)

```python
import datetime

timestamp = 1556668800.0
date = datetime.datetime.utcfromtimestamp(timestamp)
print(date) # 2019-05-01 00:00:00
```

3. Applying timezone to your datetime without converting it

```python
import datetime
import pytz

timestamp = 1556668800.0
date = datetime.datetime.utcfromtimestamp(timestamp)
print(date) # 2019-05-01 00:00:00

# Applying timezone without converting it
date_sp = pytz.timezone("America/Sao_Paulo").localize(date)
print(date_sp.strftime(fmt)) # 2019-05-01 00:00:00 -03-0300

# Then converting it to UTC
date_utc = date_sp.astimezone(tz=pytz.utc)
print(date_utc.strftime(fmt)) # 2019-05-01 03:00:00 UTC+0000
```

4. The other way around

```python
import datetime
import pytz

timestamp = 1556668800.0
date = datetime.datetime.utcfromtimestamp(timestamp)
print(date) # 2019-05-01 00:00:00

# Applying timezone without converting it
date_utc = pytz.utc.localize(date)
print(date_utc.strftime(fmt)) # 2019-05-01 00:00:00 UTC+0000

# Then converting it to UTC
date_sp = date_utc.astimezone(tz=pytz.timezone("America/Sao_Paulo"))
print(date_sp.strftime(fmt)) # 2019-04-30 21:00:00 -03-0300
```

That’s all. Thank you!
