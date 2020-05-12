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
[{'target': 'status.Download Speed.. MB/s', 'datapoints': [[5.019333984375, 1589224879555.0]]},
 {'target': 'status.Upload Speed.. MB/s', 'datapoints': [[0.9873447265625, 1589224879555.0]]},
 {'target': 'status.Download._fa-arrow-down_,green_.', 'datapoints': [[29, 1589224879555.0]]},
 {'datapoints': [[220, 1589224879555.0]],
  'target': 'status.Seeding._fa-arrow-up_,orange_.'},
 {'datapoints': [[0, 1589224879555.0]],
  'target': 'status.Paused._fa-thumbs-up_,gray_.'},
 {'datapoints': [[117, 1589224879555.0]],
  'target': 'status.Error._fa-times_,red_.'},
 {'datapoints': [[1.9122836012234912, 1589224879555.0]],
  'target': 'status.Total Upload Size._fa-database_. TB'}]
```

![](/assets/img/ccCVjEzLx_a0ac81a8314eb60b4ce76d7d7dcca8de.png)
![](/assets/img/ccCVjEzLx_5985338c5bd01d6aff02e05533cd69fd.png)

