---
layout: post
title: "Image encode/decode base64"
comments: true
date: "2020-08-26 17:35:40.433000+00:00"
categories:  [python]
tags:  [python, pil]
---



https://stackoverflow.com/questions/45122994/how-to-convert-base64-string-to-a-pil-image-object

```python
import base64
import io
from PIL import Image

def img_to_txt(filename):
    msg = b"<plain_txt_msg:img>"
    with open(filename, "rb") as imageFile:
        msg = msg + base64.b64encode(imageFile.read())
    msg = msg + b"<!plain_txt_msg>"
    return msg

def decode_img(msg):
    msg = msg[msg.find(b"<plain_txt_msg:img>")+len(b"<plain_txt_msg:img>"):
              msg.find(b"<!plain_txt_msg>")]
    msg = base64.b64decode(msg)
    buf = io.BytesIO(msg)
    img = Image.open(buf)
    return img

filename = 'test.png'
msg = img_to_txt(filename)
img = decode_img(msg)
img.show()
```

