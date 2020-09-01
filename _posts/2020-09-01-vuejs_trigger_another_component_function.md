---
layout: post
title: "VueJS Trigger another component function"
comments: true
date: "2020-09-01 03:18:30.948000+00:00"
categories:  [frontend]
tags:  [component, trigger, vuejs, eventbus, bus]
---



https://www.reddit.com/r/vuejs/comments/bavfig/trigger_function_from_another_component/

```javascript
Vue.prototype.bus = new Vue()

this.bus.$emit('your-call', argument)
this.bus.$on('your-call', () => {
    
})
```

```javascript
mounted(){
    this.bus.$on('your-call', () => {
        
    })
},
beforeDestroy(){
    this.bus.$off('your-call', () => {
        
    })
}
```