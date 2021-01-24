---
layout: post
title: "Flask route all path with slash"
comments: true
date: "2020-08-27 15:01:35.585000+00:00"
categories:  [web]
tags:  [flask, python]
---



https://stackoverflow.com/questions/24000729/flask-route-using-path-with-leading-slash
```python
import werkzeug
from werkzeug.routing import PathConverter
from packaging import version

# whether or not merge_slashes is available and true
MERGES_SLASHES = version.parse(werkzeug.__version__) >= version.parse("1.0.0")

class EverythingConverter(PathConverter):
    regex = '.*?'

app.url_map.converters['everything'] = EverythingConverter

config = {"merge_slashes": False} if MERGES_SLASHES else {}
@api.route('/records/<hostname>/<metric>/<everything:context>', **config) 
```
