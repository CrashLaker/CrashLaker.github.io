---
layout: post
title: "Flask download zip on the fly"
comments: true
date: "2020-08-27 14:56:42.829000+00:00"
categories:  [web]
tags:  [python, flask, zip, onthefly]
---


https://stackoverflow.com/questions/44185486/generate-and-stream-compressed-file-with-flask
```python3
@app.route('/download_zip/<everything:path>', methods=['GET', 'POST'])
@cross_origin()
def download_zip(path):
    if path in vault['hash']:
        filepath = f"{metafolder}/{vault['hash'][path]}.txt"
        response = Response(yield_zip(filepath), mimetype='application/zip')
        response.headers['Content-Disposition'] = 'attachment; filename=data.zip'
        return response
    return 'no path'

def yield_zip(filepath):
    #cmd = ['cat', filepath, '|' '/usr/bin/zip', '-0', '-j', '-q', '-r', '-', '-@']
    cmd = [f'cat {filepath} | zip -0 -j -q -r - -@']
    proc = subprocess.Popen(cmd, 
                    bufsize=0, 
                    shell=True,
                    cwd=mfolder,
                    stdin=subprocess.PIPE, 
                    stdout=subprocess.PIPE)

    try:
        while True:
            buf = proc.stdout.read(4096)
            if len(buf) == 0:
                break
            yield buf
    finally:
        proc.wait()
```