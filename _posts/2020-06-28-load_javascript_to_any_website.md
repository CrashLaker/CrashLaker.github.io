---
layout: post
title: "Load javascript to any website"
comments: true
date: "2020-06-28 17:28:15.606000+00:00"
categories:  ['programming']
tags:  ['javascript', 'd3js']
---





### D3js v4
https://gist.github.com/dwtkns/7568721
```javascript
var s=document.createElement('script'); s.type='text/javascript'; s.src='https://d3js.org/d3.v4.min.js'; document.head.appendChild(s);
```

### D3js v5
https://bl.ocks.org/emeeks/21f99959d48dd0d0c746
```javascript
var s=document.createElement('script'); s.type='text/javascript'; s.src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min.js'; document.head.appendChild(s);
var t=document.createElement('script'); s.type='text/javascript'; s.src='https://bl.ocks.org/emeeks/raw/21f99959d48dd0d0c746/24424becb9cea0bb2825a628e3f95931ad1916d2/d3.sankey.js'; document.head.appendChild(s);


```

### Jquery
https://dhilst.github.io/2017/03/16/jQuery-at-browser-console.html
```javascript
var a = new XMLHttpRequest(); a.open('GET', 'https://code.jquery.com/jquery-3.1.1.min.js'); a.onreadystatechange = () => eval(a.resultText); a.send();
```