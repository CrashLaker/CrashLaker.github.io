---
layout: post
title: "Python list pptx slides text"
comments: true
date: "2020-04-25 01:52:02.261000+00:00"
categories:  [office, automate]
tags:  [python, pptx]
---




```python
prs = Presentation(eachfile)
print(eachfile)
print("----------------------")
for slide in prs.slides:
  #slide._element.get('show') is None  # not hidden
  #slide._element.get('show') == '0'  # hidden
  for shape in slide.shapes:
      if hasattr(shape, "text"):
          print(shape.text)
```



https://stackoverflow.com/questions/39418620/extracting-text-from-multiple-powerpoint-files-using-python
https://github.com/scanny/python-pptx/issues/319