---
layout: post
title: "Boto3 Lambda Trigger"
comments: true
date: "2020-11-07 02:09:05.579000+00:00"
---



```python
def trigger_lambda(payload_, client_):
    payloadStr = json.dumps(payload_)
    payloadBytesArr = bytes(payloadStr, encoding='utf-8')
    rs = c.invoke(
        FunctionName="<func name>",
        InvocationType="Event", #RequestResponse
        Payload=payloadBytesArr
    )
```