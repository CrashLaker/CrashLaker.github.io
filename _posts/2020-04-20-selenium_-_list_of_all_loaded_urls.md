---
layout: post
title: "Selenium - List of all loaded URLs"
comments: true
date: "2020-04-20 15:43:40.929000+00:00"
categories:  [automation]
tags:  [selenium, python, browsermob-proxy]
---




https://stackoverflow.com/questions/51824178/how-to-fix-could-not-read-browsermob-proxy-json
https://stackoverflow.com/questions/50550496/browsermob-proxy-python-how-to-get-response-body
https://stackoverflow.com/questions/50679032/selenium-python-get-a-list-of-all-loaded-urls-images-scripts-stylesheets-et/50681175#50681175 (this helped)

```bash
pip3 install pip3 install browsermob-proxy
wget https://github.com/lightbody/browsermob-proxy/releases/download/browsermob-proxy-2.1.4/browsermob-proxy-2.1.4-bin.zip
```



```
https://crashlaker.github.io/static/css/projects.css
https://crashlaker.github.io/assets/static/crashlaker-logo.png
https://crashlaker.github.io/assets/static/d3js/crashlaker-macro-skills.js
(function (){
var width = 365, height = 300
var svg = d3.select('#macro-skills')
            .attr('width', width)
            .attr('height', height)

var x = d3.scaleLinear().domain([0,500]).range([0,365])
var y = d3.scaleLinear().domain([0,500]).range([0,365])

var ratio = 365/500

var numNodes =
```