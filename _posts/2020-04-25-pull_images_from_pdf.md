---
layout: post
title: "Pull images from PDF"
comments: true
date: "2020-04-25 01:54:40.762000+00:00"
categories:  [office, automation]
tags:  [python, pdf]
---



```bash
pip install pdf2image
conda install -y -c conda-forge poppler
```

```python
rs = requests.get("<pdf url>", stream=True)

pages = convert_from_bytes(rs.raw.read(), 200)

folder="./images/"
for idx,page in enumerate(pages):
    page.save('{}{}.png'.format(folder, idx), 'PNG')
```

https://stackoverflow.com/questions/51481200/convert-pdf-to-image-using-pdf-url-pdf2image/61417241#61417241
https://stackoverflow.com/questions/46184239/extract-a-page-from-a-pdf-as-a-jpeg

