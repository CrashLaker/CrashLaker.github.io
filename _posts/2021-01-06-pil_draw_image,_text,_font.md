---
layout: post
title: "PIL Draw Image, Text, Font"
comments: true
date: "2021-01-06 17:03:53.841000+00:00"
---

```python
from PIL import Image, ImageDraw, ImageFont



img = Image.new('RGB', (1400,400), color = (255, 255, 255))


fnt = ImageFont.truetype("/usr/share/fonts/dejavu/DejaVuSans.ttf", 80)
d = ImageDraw.Draw(img)
d.text((450,150), "<not found>", font=fnt, fill=(0,0,0))

img.save("notfound.png")
```

![](/assets/img/hEsxVKkRb_3fca725e0b5083b6886eed03ba3dd784.png)




