---
layout: post
title: "CURL data-urlencode + Flask"
comments: true
date: "2020-07-04 17:56:31.365000+00:00"
categories:  [programming]
tags:  [python, flask, curl]
---



```curl
subject="subject"
body=$(cat ./lol)
curl -XPOST --data-urlencode "payload={\"subject\": \"$subject\", \"msg\": \"$body\"}" <url> 
```


```python
req = request.form.get("payload")
req = json.loads(req, strict=False)
```