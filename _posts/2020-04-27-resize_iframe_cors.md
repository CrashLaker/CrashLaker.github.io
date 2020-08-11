---
layout: post
title: "Resize Iframe CORS"
comments: true
date: "2020-04-27 20:41:10.273000+00:00"
categories:  [web]
tags:  [html, iframe]
---






https://stackoverflow.com/questions/22086722/resize-cross-domain-iframe-height
https://github.com/davidjbradshaw/iframe-resizer

Parent

```html
<iframe id="myIframe" style="border:none;" src="data:text/html;charset=utf-8,{}"></iframe>
<script>
iFrameResize({{ log: true, enablePublicMethods: true }}, '#myIframe')
</script>
```

Inside Iframe
```html
<script type="text/javascript" src="https://crashlaker.github.io/static/js/iframe-resize-content.js"></script>
```