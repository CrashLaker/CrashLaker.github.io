---
layout: post
title: "APC UPS Python scrape"
comments: true
date: "2020-09-14 00:29:37.687000+00:00"
categories:  [pscrape]
tags:  [apc-ups]
---



```python
import os
import re
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

@app.route('/metrics', methods=['GET', 'POST'])
@cross_origin()
def metrics():

    html = ""
    ret = scrape_apc()
    for k,v in ret.items():
        html += f"{k} {v}\n"

    return html


def scrape_apc():
    ret = os.popen("apcaccess").read().strip()

    ans = {}
    for line in ret.split("\n"):
        line = line.strip()
        if line == "": continue
        ea = re.split('\s+', line)
        allowed = ("LOADPCT,LOAD_W,LOADAPNT,LOAD_VA,BCHARGE,TIMELEFT,MBATTCHG,"
                   "MINTEIMEL,MAXTIME,MAXLINEV,MINLINEV,OUTPUTV,ITEMP,BATTV,LINEFREQ,OUTCURNT,"
                   "NUMXFERS,TONBATT,CUMONBATT,NOMOUTV,NOMINV,NOMBATTV,NOMPOWER,NOMAPNT")
        allowed = allowed.split(",")
        if ea[0] in allowed:
            ans[ea[0]] = ea[2]
    return ans









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