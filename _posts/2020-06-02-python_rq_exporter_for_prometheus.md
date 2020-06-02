---
layout: post
title: "Python RQ Exporter for Prometheus"
comments: true
date: "2020-06-02 15:18:29.153000+00:00"
categories:  [programming]
tags:  [python, rq, exporter, prometheus]
---




```python
from flask import Flask, request, jsonify, json, abort, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from redis import Redis
from rq import Queue, Worker
import toil
import redis_worker
import os
import sys
import signal


app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/metrics', methods=['GET', 'POST'])
@cross_origin()
def metrics():


    return gather()

redis = Redis("<host>", 6379, password="<password>")

def gather():
    #queues = ["<queue name>"]
    print("start")
    workers = Worker.all(connection=redis)
    count_workers = len(workers)

    #keys = redis.keys("rq:queue:*")

    print("query queues")
    queues = Queue.all(connection=redis)
    count_queues = {}
    for queue in queues:
        #count_queues[queue.name] = len(queue.jobs)
        count_queues[queue.name] = queue.count

    #os.kill(worker.pid, signal.SIGINT)
    #rq_queue_len{name=<name>} <value>
    print("serialize")
    output = []
    for queue,c in count_queues.items():
        output.append("rq_queue_len{{name=\"{}\"}} {}".format(queue, c))
    output.append("rq_workers {}".format(count_workers))
    print(output)
    return "\n".join(output)

def create_app():
    return app

if __name__ == '__main__':
    if 0:
        port = os.getenv("API_PORT", 10001)
        app.run(host='0.0.0.0', port=port)
    else:
        with app.test_client() as c:
            v = c.get("/metrics")
            print(v)

```

![](/assets/img/HButb6SHI_dabdd7dca0a04e99087c4d6f3cc8a74c.png)


![](/assets/img/HButb6SHI_01ec9301b2719c198e7b99f8efa5420d.png)
