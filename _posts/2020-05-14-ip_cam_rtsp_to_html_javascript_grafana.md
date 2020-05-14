---
layout: post
title: "IP Cam RTSP to HTML/Javascript/Grafana"
comments: true
date: "2020-05-14 00:31:58.265000+00:00"
categories:  [grafana]
tags:  [grafana, node, websocket, ffmpeg]
---




https://stackoverflow.com/questions/23011302/best-approach-to-get-rtsp-streaming-into-web-browser-from-ip-camera

https://github.com/phoboslab/jsmpeg

`git clone https://github.com/phoboslab/jsmpeg.git`

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

View on `view-stream.html`

![](/assets/img/4TtwzkXXd_feb152d10377b60d70d1db4f387a6e03.png)


### Caveats

*Uncaught RuntimeError: memory access out of bounds*
https://github.com/phoboslab/jsmpeg/issues/303
`new JSMpeg.Player(url, {canvas: canvas,videoBufferSize: 102410248});`