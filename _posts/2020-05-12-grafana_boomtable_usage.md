---
layout: post
title: "Grafana Boomtable Usage"
comments: true
date: "2020-05-12 01:41:23.311000+00:00"
categories:  [grafana]
tags:  [grafana, boomtable]
---




```python
row = [
    {"target": f"status.Download Speed.. {dl_speed[1]}/s"                  , "datapoints": [[dl_speed[0], ds]]},
    {"target": f"status.Upload Speed.. {up_speed[1]}/s"                    , "datapoints": [[up_speed[0], ds]]},
    {"target": "status.Download._fa-arrow-down_,green_."                   , "datapoints": [[download_c, ds]]},
    {"target": "status.Seeding._fa-arrow-up_,orange_."                     , "datapoints": [[seeding_c, ds]]},
    {"target": "status.Paused._fa-thumbs-up_,gray_."                       , "datapoints": [[paused_c, ds]]},
    {"target": "status.Error._fa-times_,red_."                             , "datapoints": [[error_c, ds]]},
    {"target": f"status.Total Upload Size._fa-database_. {total_upsize[1]}", "datapoints": [[total_upsize[0], ds]    ]},
]
```

![](/assets/img/ccCVjEzLx_a0ac81a8314eb60b4ce76d7d7dcca8de.png)

