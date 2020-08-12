---
layout: post
title: "NodeJS Live server"
comments: true
date: "2020-07-10 04:57:59.851000+00:00"
categories:  [programming]
tags:  [live-server, nodejs]
---





```bash
npm i -g live-server
cat > settings.json <<EOF
{
        "liveServer.settings.port": 8080,
        "liveServer.settings.root": "./"
}
EOF
```

```bash
live-server
```