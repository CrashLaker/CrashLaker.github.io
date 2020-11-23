---
layout: post
title: "AWS Polly Upload to S3 + Return bytes"
comments: true
date: "2020-11-22 14:13:56.485000+00:00"
---


```python
import json
import boto3
from contextlib import closing
import tempfile
import base64

def lambda_handler(event, context):
    # TODO implement
    
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
    #dict_keys(['ResponseMetadata', 'ContentType', 'RequestCharacters', 'AudioStream'])
    s3 = boto3.client('s3')
    with tempfile.NamedTemporaryFile('ab') as ntf:
        with closing(rs['AudioStream']) as stream:
            body = stream.read()
            ntf.write(stream.read())
            ntf.seek(0)
            s3.upload_file(ntf.name, '<bucket name>', 'test.mp3')
        body = base64.b64encode(body)
        body = body.decode('utf8')
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': rs['ContentType'],
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET',
            },
            'isBase64Encoded': True,
            'body': body
        }
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

```

![](/assets/img/kG9ma-q6p_868799ae995e187cc134b98a987cf587.png)

![](/assets/img/kG9ma-q6p_aea3d2edffe809b71bb641763cc84a98.png)


https://stackoverflow.com/questions/44860486/how-to-return-binary-data-from-lambda-function-in-aws-in-python



