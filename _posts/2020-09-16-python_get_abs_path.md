---
layout: post
title: "Python get abs path"
comments: true
date: "2020-09-16 00:27:27.042000+00:00"
categories:  [programming]
tags:  [python]
---



https://stackoverflow.com/questions/5183601/how-to-get-the-current-running-module-path-name/8789689

```python
import os
abspath = os.path.dirname(os.path.realpath(__file__))
```


```python
import os

print (__file__)
print (os.path.abspath(__file__))
print (os.path.realpath(__file__))
print (os.path.dirname(os.path.realpath(__file__)))
```