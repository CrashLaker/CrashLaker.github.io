---
layout: post
title: "XLS and XLSX read comments"
comments: true
date: "2020-06-03 18:12:48.775000+00:00"
categories:  [office]
tags:  [python, excel]
---




### XLS with xlrd
```python
>>> from xlrd import *
>>> wb = open_workbook("test.xls")
>>> sheet = wb.sheet_by_index(0)
>>> notes = sheet.cell_note_map
>>> print notes
{(0, 0): <xlrd.sheet.Note object at 0x00000000033FE9E8>}
>>> notes[0,0].text
u'Schmo, Joe:\nHi!'
>>> print(sheet.cell_value(0,0))
<cell value>
```

https://stackoverflow.com/questions/20331006/how-to-check-if-there-is-a-comment-or-not


### XLSX with openpyxl
```python
```