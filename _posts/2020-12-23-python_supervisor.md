---
layout: post
title: "Python Supervisor"
comments: true
date: "2020-12-23 01:17:38.142000+00:00"
---


```bash
pip3 install supervisor
echo_supervisord_conf > /etc/supervisord.conf
```

Remember to uncomment
```bash
[include]
files = path/to/your/confs/*.conf
```

worker.conf
```
[program:celery-misc-worker]
command=/root/celery-workers/bin/celery -A tasks.misc -n misc-worker --concurrency=100 -Q misc

;multiple envs https://stackoverflow.com/questions/12900402/supervisor-and-environment-variables
;environment=PYTHONPATH=/opt/mypypath:%(ENV_PYTHONPATH)s,PATH=/opt/mypath:%(ENV_PATH)s
directory=/root/
environment=PATH="/root/celery-workers/bin:%(ENV_PATH)s"
user=root
numprocs=1
stdout_logfile=/var/log/celery/misc-worker.log
stderr_logfile=/var/log/celery/misc-worker.log
autostart=true
autorestart=true
startsecs=10

; Need to wait for currently executing tasks to finish at shutdown.
; Increase this if you have very long running tasks
stopwaitsecs = 600

; Causes supervisor to send the termination signal (SIGTERM) to the whole process group.
stopasgroup=true

; Set Celery priority higher than default (999)
; so, if rabbitmq is supervised, it will start first.
priority=1
```


tasks.boot_celery.py

```python
from celery import Celery

config = {
    'CELERY_BROKER_URL': 'redis://localhost:6379/0',
    'CELERY_RESULT_BACKEND': 'redis://localhost:6379/0',
}

celery = Celery('app', broker=config['CELERY_BROKER_URL'])
celery.conf.update(config)
```

tasks.misc.py

```python
import time
from .boot_celery import celery

@celery_task(bind=True)
def long_task(self, arg=None):
    print('task long_task started', arg)
    time.sleep(10)
    print('task long_task finished')
```


docker-compose.yml

```
version: '3'

services:
  redis:
    image: redis
    ports:
      - 6379:6379
  flower:
    image: python:3.6
    ports:
      - 5555:5555
    depends_on:
      - redis
    command: | 
      bash -c "
      pip3 install flower redis celery==4.4.7
      celery flower --broker='redis://redis:6379/0' --port=5555
      "
```



start

```python3

#task.apply_async(args=[arg1, arg2], kwargs={'kwarg1': 'x', 'kwarg2': 'y'})
function.apply_async(queue='mail')
```





































