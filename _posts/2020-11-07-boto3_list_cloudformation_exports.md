---
layout: post
title: "Boto3 List CloudFormation Exports"
comments: true
date: "2020-11-07 02:01:38.012000+00:00"
---



```python3
def list_exports(client_=None, nexttoken=""):
    rs = client_.list_exports(**({"NextToken": nexttoken} if nexttoken != "" else {}))
    nexttoken = rs.get("NextToken", "")
    ret = rs["Exports"]
    if nexttoken != "":
        return ret + list_exports(client_, nexttoken)
    else:
        return ret
```