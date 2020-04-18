---
layout: post
title: "Pandas write to many sheets in single XLSX"
categories: [office]
tags: [python, pandas]
comments: true
date: "2020-04-13 16:57:11.022000+00:00"
---


Taken from https://xlsxwriter.readthedocs.io/example_pandas_multiple.html.

```python
import pandas as pd


# Create some Pandas dataframes from some data.
df1 = pd.DataFrame({'Data': [11, 12, 13, 14]})
df2 = pd.DataFrame({'Data': [21, 22, 23, 24]})
df3 = pd.DataFrame({'Data': [31, 32, 33, 34]})

# Create a Pandas Excel writer using XlsxWriter as the engine.
writer = pd.ExcelWriter('pandas_multiple.xlsx', engine='xlsxwriter')

# Write each dataframe to a different worksheet.
df1.to_excel(writer, sheet_name='Sheet1')
df2.to_excel(writer, sheet_name='Sheet2')
df3.to_excel(writer, sheet_name='Sheet3')

# Close the Pandas Excel writer and output the Excel file.
writer.save()
```

This gives you:

![](/assets/img/dBlO0-3Cs_710447e95003c26d6f5da516b49f3a5c.png)
