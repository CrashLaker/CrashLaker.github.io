---
layout: post
title: "Python upload multipart Flask receive"
comments: true
date: "2021-01-08 14:15:32.080000+00:00"
---


https://stackoverflow.com/questions/20217348/requests-post-files-upload-large-file-more-than-1-5-mb-python

## Upload

```python
import requests

def upload_file(local_file, remote_file):
    payload = {
        "remote_file": remote_file,
        #"remote_path": "lol.mp4",
        "lol": {
            "a": 1
        }
    }
    with open(local_file, 'rb') as f:
        rs = requests.post('http://localhost:7777', data=payload,
                           files={'file': f}, verify=False)

upload_file('video.mp4', 'asdf')
```


## Receive
https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request

```python
from flask import Flask, request, jsonify, json, abort, redirect, url_for, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder='template')
cors = CORS(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    print(request)
    req = request.json
    print('files', request.files)
    print('req', req) # None
    print('req data', request.data) # b''
    print('req form', request.form) # ImmutableMultiDict([('remote_file', 'asdf'), ('lol', 'a')])
    print('req form get', request.form.get('remote_file')) # asdf
    print('req form.to_dict', request.form.to_dict(flat=False)) # {'remote_file': ['asdf'], 'lol': ['a']}
    f = request.files['file']
    remote_path = request.form.get('remote_path', 'default.mp4')
    print(f, f.filename, remote_path) # <FileStorage: 'video.mp4' (None)> video.mp4 default.mp4
    f.save(remote_path)
    return "hello world"

# gunicorn --workers=2 'app:create_app()' --bind=0.0.0.0:<port>
def create_app():
    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777)
```