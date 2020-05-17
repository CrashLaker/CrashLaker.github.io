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

**html also works**

![](/assets/img/ccCVjEzLx_d2df1498894a92f467f2f2f4e6f59412.png)

```python
ds = dfrom.timestamp()*1000
color = lambda x: "green_" if x < 50 else "yellow_" if x < 70 else "red_"
grow = []
colsize = 8
for i in range(20):
    for j in range(colsize):
        row = i
        col = j
        vpsname = "<strong>VPS{0:03d}</strong>".format((colsize*j)+i+1)
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
            "target": f"status{row}.{col}.{vpsname}<br>{cpu_label} | {mem_label} <br> {disk_labels}",
            "datapoints": [[0,ds]]
        })
row  = grow
```

### View 3
![](/assets/img/ccCVjEzLx_d80b6f60d90e1c5a1d150bada622fbbd.png)

```python
icons = {
        "start": f"<img style='' src='https://cdn2.iconfinder.com/data/icons/crystalproject/Open-Office-Icons/stock_about-16.png'/>",
        "fail": f"<img style='' src='https://cdn2.iconfinder.com/data/icons/crystalproject/Open-Office-Icons/stock_stop-16.png'/>",
        "meeting": f"<img style='' src='https://cdn2.iconfinder.com/data/icons/crystalproject/16x16/actions/k_alarm.png'/>",
        "coffee": f"<img style='' src='https://cdn2.iconfinder.com/data/icons/crystalproject/16x16/actions/yahoo_tea.png'/>",
        "done": f"<img style='width:15px;' src='https://cdn2.iconfinder.com/data/icons/crystalproject/32x32/actions/ok.png'/>",
}
yearselect = 2020
monthselect = 5
month = calendar(yearselect, monthselect)
today = datetime.datetime(*datetime.datetime.now().timetuple()[:3])
print("today", today)
weekname = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday ", "Sunday"]
month = [weekname, *month]
d = "|"
for rid, r in enumerate(month):
    for cid, c in enumerate(r):
        print(c)
        daylabel = c if c != 0 or rid == 0 else ''
        listitems = ""
        if c != 0:
            if yearselect == today.year and monthselect == today.month and c == today.day:
                dayhtml = f"<span style='border-radius:10px;padding:3px;color:black;background-color: #69c0ff;'>{daylabel}</span>"
            else:
                dayhtml = f"<span>{daylabel}</span>"
            listitems = "\n".join([
                    f"<li>{idx+1}. {icons[job]} {job}</li>"
                    for idx,job in enumerate(random.sample(list(icons.keys()), random.randint(1,3)))
            ])
        bottomborder = ""
        if rid == len(month)-1:
            bottomborder = "border-bottom:1px solid #cecece;"
        if rid != 0:
            box = f"""
                <div style='width:140px;height:100px;display:flex;flex-direction:column;border-top:1px solid #cecece;padding-top:2px;{bottom    border}'>
                    <div style='width:100%;text-align:right;'>
                        {dayhtml}
                    </div>
                    <ul style='list-style:none;'>
                        {listitems}
                    </ul>
                </div>
            """
        else:
            box = f"<div style='text-align:center;'>{daylabel}</div>"
        grow.append({
            "target": f"status{rid}{d}{cid}{d}{box}",
            "datapoints": [[random.randint(0,1),ds]]
        })

row  = grow
```

Gen calendar code
```python
def calendar(yearid, monthid):
    #yearid = 2020
    #monthid = 5
    dstart = datetime.datetime(yearid,monthid,1)
    month = [[0]*7]
    weekid = 0
    while dstart.month == monthid and dstart.year == yearid:
        weekday = dstart.weekday()
        if weekday == 0 and month[weekid][-1] != 0:
            month.append([0]*7)
            weekid += 1
        day = dstart.day
        month[weekid][weekday] = day
        dstart = dstart + datetime.timedelta(days=1)
    return month
```
