---
layout: post
title: "Grafana Boomtable Usage"
comments: true
date: "2020-05-12 01:41:23.311000+00:00"
categories:  [grafana]
tags:  [grafana, boomtable]
---





## View 1
![](/assets/img/ccCVjEzLx_a0ac81a8314eb60b4ce76d7d7dcca8de.png)
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
[
 {'target': 'status.Download Speed.. MB/s',               'datapoints': [[5.019333984375, 1589224879555.0]]},
 {'target': 'status.Upload Speed.. MB/s',                 'datapoints': [[0.9873447265625, 1589224879555.0]]},
 {'target': 'status.Download._fa-arrow-down_,green_.',    'datapoints': [[29, 1589224879555.0]]},
 {'target': 'status.Seeding._fa-arrow-up_,orange_.',      'datapoints': [[220, 1589224879555.0]]},
 {'target': 'status.Paused._fa-thumbs-up_,gray_.',        'datapoints': [[0, 1589224879555.0]]},
 {'target': 'status.Error._fa-times_,red_.',              'datapoints': [[117, 1589224879555.0]]},
 {'target': 'status.Total Upload Size._fa-database_. TB', 'datapoints': [[1.9122836012234912, 1589224879555.0]]}
]
```

Thresholds: 10000
Transform: `_2_ _value_ _3_`

![](/assets/img/ccCVjEzLx_5985338c5bd01d6aff02e05533cd69fd.png)



## View2
![](/assets/img/ccCVjEzLx_ee4f727ef91dc70f9b1319a42a41d512.png)
```python
ds = dfrom.timestamp()*1000
color = lambda x: "green_" if x < 50 else "yellow_" if x < 70 else "red_"
grow = []
colsize = 4
for i in range(30):
    for j in range(colsize):
        row = i
        col = j
        vpsname = "VPS{0:03d}".format((colsize*j)+i+1)
        cpu = random.randint(1,100)
        cpu_color = color(cpu)
        cpu_label = f"{cpu}% _fa-microchip_,{cpu_color}"
        mem = random.randint(1,100)
        mem_color = color(mem)
        mem_label = f"{mem}% _fa-battery-three-quarters_,{mem_color}"
        disk_labels = []
        for z in range(random.randint(1,4)):
            disk = random.randint(1,100)
            disk_color = color(disk)
            disk_label = f"{disk}% _fa-database_,{disk_color}"
            disk_labels.append(disk_label)
        disk_labels = " ".join(disk_labels)

        grow.append({
            "target": f"status{row}.{col}.{vpsname}: {cpu_label} | {mem_label} | {disk_labels}",
            "datapoints": [[0,ds]]
        })
row  = grow
```

![](/assets/img/ccCVjEzLx_7792e82c5f8633a3c5c62bd1411f3ddf.png)


