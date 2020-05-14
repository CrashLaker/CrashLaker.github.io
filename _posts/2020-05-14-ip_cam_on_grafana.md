---
layout: post
title: "IP Cam on Grafana"
comments: true
date: "2020-05-14 00:31:58.265000+00:00"
categories:  [grafana]
tags:  [grafana, node, websocket, ffmpeg]
---




https://stackoverflow.com/questions/23011302/best-approach-to-get-rtsp-streaming-into-web-browser-from-ip-camera

```bash
#'node websocket-relay.js <secret> [<stream-port> <websocket-port>]'
node websocket-relay.js secret 9999 9998
```

```bash
ffmpeg \
	-i rtsp://<user>:<password>@<ip>//<channel> \
	-f mpegts -c:v mpeg1video -s 800x600 -r 30 -b:v 1000k -bf 0 \
	http://localhost:9999/secret
```


### Caveats

*Uncaught RuntimeError: memory access out of bounds*
https://github.com/phoboslab/jsmpeg/issues/303
`new JSMpeg.Player(url, {canvas: canvas,videoBufferSize: 102410248});`