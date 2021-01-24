---
layout: post
title: "FastAPI Template"
comments: true
date: "2020-10-12 17:34:29.399000+00:00"
categories:  [web]
tags:  [python, fastapi, web]
---




```bash
pip3 install fastapi uvicorn requests
```

```python
import uvicorn
#import toil
from pydantic.dataclasses import dataclass
from dataclasses import asdict
#from pydantic.dataclasses import asdict
import pydantic.dataclasses
from fastapi import FastAPI, Path, Depends
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@dataclass
class Item:
    sort: str =  ""
    page: int = 1
    per_page: int = 20
    search_term: str = ""

@app.get("/data/{l1}/{l2}/{l3}")
def d_tree(
           l1: str,
           l2: str,
           l3: str,
           item: Item = Depends()):
    print(l1, l2, l3) # l1 l2 l3 ok
    print(item) # Should work now
    # Item(sort='true', page=1, per_page=20, search_term='')
    print(type(item)) # Should work now
    print(item.sort)
    print(asdict(item))
    # {'sort': 'true', 'page': 1, 'per_page': 20, 'search_term': ''}


def dc2dict(dc):
    return {n: getattr(d, n) for n in dc.__dataclass_fields__}

if __name__ == "__main__":
    if 0:
        uvicorn.run(app, host="0.0.0.0", port=12001)
    else:
        client = TestClient(app)
        #rs = client.get("/tree/2020/Agosto")
        rs = client.get("/data/2020/Agosto/Apps Rag?sort=true")
        #rs = client.get("/data/")
        #toil.phead(rs.json())
        print(rs.json())

```