---
layout: post
title: "Convert XLS to XLSX on the fly pandas"
comments: true
date: "2020-08-04 19:32:42.114000+00:00"
categories:  [programming]
tags:  [python, pandas, xls, xlsx]
---




```python
from openpyxl import load_workbook
import xlrd
import io

df = pd.read_excel("file.xls")
output = io.BytesIO()
df.to_excel(output)
workbook = load_workbook(output)
s = workbook["Sheet1"]

#... work
for row in s.iter_rows():
    for cell in row:
        if cell.comment:
            print(cell.value, cell.comment.text)
```