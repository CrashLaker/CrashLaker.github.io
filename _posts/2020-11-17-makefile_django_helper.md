---
layout: post
title: "Makefile Django Helper"
comments: true
date: "2020-11-17 22:17:19.908000+00:00"
---


```makefile
SHELL=/bin/bash




admin:
	echo " \
	from django.contrib.auth import get_user_model; \
	User = get_user_model(); \
	User.objects.create_superuser('admin', '', 'admin') \
	" | sed 's/^[ \t]*//g' | python manage.py shell

start:
	python manage.py runserver 0:8000

m:
	python manage.py migrate

mm:
	python manage.py makemigrations

mmm: mm m

mm2:
	python manage.py makemigrations
	python manage.py migrate --run-syncdb


shell:
	python manage.py shell
# python manage.py startproject mysite .
# python manage.py startapp products
# Authorization: Token <token>

.ONESHELL:
```