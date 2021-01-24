---
layout: post
title: "Python sendmail"
comments: true
date: "2020-08-17 00:31:25.958000+00:00"
categories:  [programming]
tags:  [python, smtplib, sendmail, flask]
---



Sendmail bash
```bash
subject="<subject>"
body=$(cat $logfile | base64)
curl -XPOST --data-urlencode "payload={\"isbase64\": 1, \"subject\": \"$subject\", \"msg\": \"$body\"}" <url>:<port>
```


```python
from flask import Flask, request, jsonify, json, abort, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
import os
import re
import subprocess
import traceback
import json
import base64

app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/', defaults={"path": ""}, methods=['GET', 'POST'])
@app.route('/<path:path>', methods=['GET', 'POST'])
@cross_origin()
def main(path):

    referrer = request.headers.get("Referer")

    req = request.form.get("payload")
    req = json.loads(req, strict=False)
    
    subject = req.get("subject")
    msg = req.get("msg")
    if "isbase64" in req:
        msg = base64.b64decode(msg).decode()
    print(subject)
    print(msg)
    toil_mail.sendmail(subject, msg)


    return "hello"

def sendmail(subject='Subject', msg='body', sender='<sender>', receivers='<receivers>'):
    import smtplib

    message = f"From: From Root <{sender}>\nTo: <{receivers}>\nSubject: {subject}\n\n{msg}"

    try:
       smtpObj = smtplib.SMTP('localhost')
       smtpObj.sendmail(sender, receivers, message)
       print("Successfully sent email")
    except SMTPException:
       print("Error: unable to send email")

if __name__ == '__main__':
    port = os.getenv("API_PORT", 12121)
    app.run(host='0.0.0.0', port=port)
```
