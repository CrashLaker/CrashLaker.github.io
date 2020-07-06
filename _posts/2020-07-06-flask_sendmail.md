---
layout: post
title: "Flask Sendmail"
comments: true
date: "2020-07-06 18:30:40.300000+00:00"
categories:  [programming]
tags:  [python, flask, sendmail]
---



### Bash sendmail
```bash
subject="subject"
body=$(cat ./lol)
curl -XPOST --data-urlencode "payload={\"subject\": \"$subject\", \"msg\": \"$body\"}" <flask endpoint> 
```

```bash
subject="subject"
body=$(cat ./lol | base64)
curl -XPOST --data-urlencode "payload={\"isbase64\": 1, \"subject\": \"$subject\", \"msg\": \"$body\"}" <flask endpoint> 
```

