---
layout: post
title: "Python language detector"
comments: true
date: "2020-11-23 02:42:33.155000+00:00"
---

`pip install langdetect`

```python
from langdetect import detect_langs


cases = [
    "O servidor B está com consumo CPU acima de 70% por mais de 5 minutos",
    "The server C is above 70% CPU for more than 10 minutes",
    "A query do servidor Z está demorando muito",
    "A query do servidor Z está tomando timeout",
    "陈圆圆好可爱",
    "informaciones captadas automáticamente por SismoWeb y acciona el disparo de alertas por e-mail o SMS siempre",
    "Envío de alertas por email o SMS en caso de alarmas o alertas de diagnósticos",
]

for case in cases:
    print(case)
    print(detect_langs(case))
    print("====")
    print()
```


```
O servidor B está com consumo CPU acima de 70% por mais de 5 minutos
[pt:0.9999977577732495]
====

The server C is above 70% CPU for more than 10 minutes
[en:0.999995532419058]
====

A query do servidor Z está demorando muito
[pt:0.999995959469694]
====

A query do servidor Z está tomando timeout
[pt:0.9999971518611472]
====

陈圆圆好可爱
[zh-cn:0.9999980430575592]
====

informaciones captadas automáticamente por SismoWeb y acciona el disparo de alertas por e-mail o SMS siempre
[es:0.9999955938227942]
====

Envío de alertas por email o SMS en caso de alarmas o alertas de diagnósticos
[es:0.9999952138292143]
====
```