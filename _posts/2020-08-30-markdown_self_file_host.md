---
layout: post
title: "Markdown self file host"
comments: true
date: "2020-08-30 03:53:39.030000+00:00"
categories:  [programming]
tags:  [html, markdownit]
---




```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/10.0.0/markdown-it.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet" />
    <script>
var text = `
Hello world!
`

    </script>
</head>
<body>
<style>
* {
    font: 22px normal sans-serif;
}
#content {
    width:100%;
    column-count:1;
    /*height:500px;*/
}
.today {
    float:left;
}
</style>

<div id="content">
</div>

<script>
var md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});
text_html = md.render(text)
document.getElementById('content').innerHTML = text_html
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js"></script>
</body>
</html>
```