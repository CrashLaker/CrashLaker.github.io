---
layout: post
title: "SVG Boilerplate Drag Zoom D3js"
comments: true
date: "2020-08-31 17:30:05.170000+00:00"
categories:  [web]
tags:  [svg, svg-viewer, d3js]
---



d3jsv6

https://observablehq.com/@d3/drag-zoom

```html
<html>
<head>
<script type="text/javascript" src="https://unpkg.com/d3@6.1.1/dist/d3.min.js"></script>
</head>
<body>


<script>

width = window.outerWidth - 40
height = window.outerHeight - 40
var svg = d3.select("body").append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
var g = svg.append("g")

d3.xml("<your svg>").then((rs) => {
    console.log(rs)
    var svgNode = rs.getElementsByTagName("svg")[0];
    g.node().appendChild(svgNode)
})

  svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([-5, 20])
      .on("zoom", zoomed));

  function dragstarted() {
    d3.select(this).raise();
    g.attr("cursor", "grabbing");
  }

  function dragged(event, d) {
    d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
  }

  function dragended() {
    g.attr("cursor", "grab");
  }

  function zoomed({transform}) {
    g.attr("transform", transform);
  }

</script>
</body>
</html>

```