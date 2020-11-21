---
layout: post
title: "AWS Polly Upload S3"
comments: true
date: "2020-11-21 02:33:07.289000+00:00"
---



```python
import json
import boto3
from contextlib import closing
import tempfile

def lambda_handler(event, context):
    
    text = '<speak>Mary had a little lamb.</speak>'
    c = boto3.client('polly')
    rs = c.synthesize_speech(
        Engine='standard',
        LanguageCode='en-US',
        OutputFormat='mp3',
        Text=text,
        TextType='ssml',
        VoiceId='Joanna'
    )
    s3 = boto3.client('s3')
    with tempfile.NamedTemporaryFile('ab') as ntf:
        with closing(rs['AudioStream']) as stream:
            ntf.write(stream.read())
            ntf.seek(0)
            print(ntf.name)
            s3.upload_file(ntf.name, '<bucketname>', 'test.mp3')
```


https://stackoverflow.com/questions/44504617/s3-uploads-audio-file-but-it-doesnt-play-how-to-upload-audio-stream-to-s3
https://gist.github.com/kepstein/206740d919de64248b24e75a9466ae2a
https://github.com/thomasmburke/PersonalizedGreeter/blob/e7bc8285fd7a24bb255db812623a787723da3da9/src/polly_ops.py
