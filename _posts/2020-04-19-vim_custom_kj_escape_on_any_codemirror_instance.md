---
layout: post
title: "Vim custom 'kj' escape on any CodeMirror instance"
comments: true
date: "2020-04-19 19:17:17.752000+00:00"
categories:  [productivity]
tags:  [vim, chrome]
---



https://github.com/codemirror/CodeMirror/issues/2840

Install
https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en

```javascript
$(document).ready(function() {
  setTimeout(function() {
    document.querySelector('.CodeMirror').CodeMirror
            .constructor.Vim.map('kj', '<Esc>', 'insert');
    //document.querySelector('.CodeMirror').CodeMirror
    //        .keyMap.default['Shift-Tab'] = 'indentLess';
    document.querySelector('.CodeMirror').CodeMirror
            .addKeyMap({
        'Shift-Tab': 'indentLess',
        'F9': function(cm) {
            cm.replaceSelection('```\n\n```') 
        },
        'F10': function(cm) {
            cm.replaceSelection('<details>\n<summary>\nmore\n</summary>\n\n</details>') 
        },
        'F11': function(cm) {
            cm.replaceSelection('<details>\n<summary>\nmore\n</summary>\n\n```\n\n```\n</details>') 
        },
    })
  }, 2000)
});
``` 

![](/assets/img/UPOWe5wek_a1ca2cc2aef8213ce5dc74567e17cd4c.png)


