---
layout: post
title: "Django Snippet Postgresql"
comments: true
date: "2020-11-17 13:26:37.525000+00:00"
---



```
version: "3"

services:
  db: 
    image: postgres:13
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB=app
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
```

`<project>/settings.py`
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': 'localhost',
        'NAME': 'app',
        'USER': 'admin',
        'PASSWORD': 'admin'
    } 
}
...
```