---
layout: post
title: "Embed html to iframe"
comments: true
date: "2020-04-16 02:20:40.553000+00:00"
categories:  [web]
tags:  [html,jquery,javascript]
---



`src="data:text/html;charset=utf-8,'+escape(data)+'"`

```javascript
$('.wrapper-'+label).empty().append('<iframe scrolling="no" style="border:none;" src="data:text/html;charset=utf-8,'+escape(data)+'"></iframe>')
```

*Python*

```python
import urllib.parse
html = "html code"
html = urllib.parse.quote(html)

print(f'<iframe widht="100%" height="400px" src="data:text/html;charset=utf-8,{html}></iframe>"')
```