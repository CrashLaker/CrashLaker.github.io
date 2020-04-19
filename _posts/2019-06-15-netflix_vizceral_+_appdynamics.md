---
layout: post
title: "Netflix Vizceral + Appdynamics"
categories: [Medium]
tags: [datavis, appdynamics, vizceral]
comments: true
description: "Leveraging Appdynamic’s flow map through intuitive engineering"
date: "2019-06-15"
---


Leveraging Appdynamic’s flow map through intuitive engineering

![](/assets/img/cc7uX6xya_1*lbQAuZ4wtTjVS7YvqHy2Qg.gif)
*vizceral’s flow map*

Recently I watched Josh Evans talk on [Youtube](https://www.youtube.com/watch?v=CZ3wIuvmHeM) (yeah pretty late but never too late) and found out among many other interesting topics his use of this amazing visualization opensource Netflix tool called [Vizceral](https://github.com/Netflix/vizceral) which got me eager to try it out.
It has a good wiki to get started [here](https://github.com/Netflix/vizceral/wiki) and a all setup example [here](https://github.com/netflix/vizceral-example).
The json template is pretty straighforward and carefully explained so that you can easily port any topology you already have. Similar to D3js nodes and **links** structure but Vizceral uses ThreeJs (Webgl) with **nodes** and connections hierarchy structure where each node can have other **nodes** and connections inside it. The block below was taken from [here](https://github.com/Netflix/vizceral/wiki/How-to-Use).
```
{

  renderer: 'global',
  name: 'edge',
  maxVolume: 100000,
  entryNode: 'INTERNET',
  // list of nodes for this graph
  nodes: [
    {
      renderer: 'region',
      layout: 'ltrTree',
      name: 'us-west-2',
      updated: 1462471847,
      maxVolume: 100000,
      nodes: [],
      connections: []
    }
  ]
}
```

So my architecture was like this:
![](/assets/img/cc7uX6xya_b46f833b10f05a3bcbc012ddcb3859ec.png)


And the results were astouding as expected:

![](/assets/img/cc7uX6xya_1*lD_mVEkA9n0Dmhmmwaxirg.gif)

![](/assets/img/cc7uX6xya_1*lgWDyClNuGqeGGs9veUPsQ.gif)

Where you can easily spot pressure points in your microservices infrastruture as well as slow response calls and errors.
And we can also add it to your Grafana dashboard as shown [here](https://twitter.com/freebsdfrau/status/1040346271796482048).

![](/assets/img/cc7uX6xya_d9b1cd951e18e4b788d6e543849c0a93.png)

[![](http://img.youtube.com/vi/sRNGxdOXGCU/0.jpg)](http://www.youtube.com/watch?v=sRNGxdOXGCU)


That’s all!
Some useful resources:
* https://github.com/adrianco/go-vizceral
* https://github.com/nmnellis/vistio
* https://github.com/nghialv/promviz

[![](https://img.youtube.com/vi/CZ3wIuvmHeM/hqdefault.jpg)](https://www.youtube.com/watch?v=CZ3wIuvmHeM#action=share)