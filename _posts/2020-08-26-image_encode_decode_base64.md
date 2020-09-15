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


```python
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

#https://stackoverflow.com/questions/38061267/matplotlib-graphic-image-to-base64
def plot_base64():
    s = io.BytesIO()
    plt.savefig(s, format='png', sbbox_inches='tight')
    plt.close()
    img_str = "data:image/png;base64," + base64.b64encode(s.getvalue()).decode()
    return img_str

def plot_png():
    #fig = create_figure()
    args = request.args.to_dict()
    fig = horizon(args)
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')
```

### Matplotlib fig to img
```python
def fig2img(fig):
    """Convert a Matplotlib figure to a PIL and return it"""
    import io
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    img = Image.open(buf)
    return img
```















