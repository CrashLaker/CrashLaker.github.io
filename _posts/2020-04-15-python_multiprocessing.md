---
layout: post
title: "Python Multiprocessing"
comments: true
date: "2020-04-15 12:26:53.374000+00:00"
tags:  [python, multiprocessing]
categories:  [programming]
---




https://stackoverflow.com/questions/18414020/memory-usage-keep-growing-with-pythons-multiprocessing-pool


To avoid memory leaks:

```python
def parallel(func, args, nthreads):
    from multiprocessing import Pool
    from contextlib import closing
        with closing( Pool(nthreads) ) as p:
            rs = p.imap_unordered(func, args)
    return [_ for _ in rs]
```






