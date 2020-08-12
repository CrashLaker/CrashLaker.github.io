---
layout: post
title: "Flask Template"
comments: true
date: "2020-04-20 03:31:11.437000+00:00"
categories:  [template]
tags:  [python, flask]
---




```python
from flask import Flask, request, jsonify, json, abort, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
import os
import re
import subprocess
import traceback

app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def main():
    return "hello world"

# gunicorn --workers=2 'app:create_app()' --bind=0.0.0.0:<port>
def create_app():
    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
    
    #test 
    #with app.test_client() as c:
    #    rs = c.get("/")
    #    print(rs.data)
```


### Query params to dict
```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def hello():
    all_args = request.args.to_dict()
    return jsonify(all_args)
```
https://stackoverflow.com/questions/24292766/how-to-process-get-query-string-with-flask

### Post to dict
```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/", methods=["POST"])
def hello():
    req = request.json
    return jsonify(all_args)
```
https://stackoverflow.com/questions/20001229/how-to-get-posted-json-in-flask
