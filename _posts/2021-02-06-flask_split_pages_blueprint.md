---
layout: post
title: "Flask split pages blueprint"
comments: true
date: "2021-02-06 17:32:47.503000+00:00"
---


```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import dateutil.parser

import another_page

app = Flask(__name__)
app.register_blueprint(another_page.page, url_prefix='/another_path')
cors = CORS(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return "você acessou o /"

@app.route('/search', methods=['GET', 'POST'])
def r_search():

    return "você acessou o /search"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)
```


```
from flask import Blueprint, jsonify, request

page = Blueprint('another_page', __name__)

@page.route('/', methods=['GET', 'POST'])
def r_home():
    return "hello"
```









