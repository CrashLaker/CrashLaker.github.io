layout: post
title: "Practices for backup scripts"
comments: true
date: "2020-04-13 13:20:40.861000+00:00"
---
layout: post
title: "Practices for backup scripts"
categories: [best-practices]
tags: [bash, backup]
comments: true
date: "2020-04-13 13:20:40.861000+00:00"
layout: post
title: "Practices for backup scripts"
comments: true
date: "2020-04-13 13:20:40.861000+00:00"
---


```bash
dateyesterday=$(date -d "1 day ago" '+%Y_%m_%d')
datetoday=$(date +'%Y_%m_%d') # +%F = %Y-%m-%d
findoldfiles=$(find -t f -name "*.tar.gz" -mtime +8) # all files older than 8days 1w
```