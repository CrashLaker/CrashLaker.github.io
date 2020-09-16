---
layout: post
title: "Python Toil Img"
comments: true
date: "2020-09-16 00:26:53.095000+00:00"
categories:  [toils]
tags:  [python, images, pil]
---





```python
from PIL import Image
import base64
import io







def fig2img(fig):
    """Convert a Matplotlib figure to a PIL and return it"""
    import io
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    img = Image.open(buf)
    return img
#https://stackoverflow.com/questions/48229318/how-to-convert-image-pil-into-base64-without-saving/48229407
#ty @Taha Mahjoubi
def img_to_base64_str(img):
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    buffered.seek(0)
    img_byte = buffered.getvalue()
    img_str = "data:image/png;base64," + base64.b64encode(img_byte).decode()
    return img_str

def img_from_base64_str(msg):
    msg = msg.replace("data:image/png;base64,", "")
    msg = base64.b64decode(msg)
    buf = io.BytesIO(msg)
    img = Image.open(buf)
    return img

```
