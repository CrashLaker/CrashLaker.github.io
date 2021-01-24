---
layout: post
title: "Vuejs PlacementJs"
comments: true
date: "2020-11-17 00:21:35.121000+00:00"
---

https://jsfiddle.net/crashlaker/oepcxtn8/27/
https://github.com/tobyzerner/placement.js/tree/master
https://tobyzerner.github.io/placement.js/demo.html


```html
<script src="https://unpkg.com/vue@2.0.1/dist/vue.js"></script>
<script src="https://tobyzerner.github.io/placement.js/dist/index.js"></script>
<style>
#app {
  border:1px solid black;
  width:500px;
  height:300px;
  display:block;
  margin:auto;
}
#overlay {
  position:absolute;
  width:120px;
  height:80px;
  top:0px;
  left:0px;
  border:1px solid black;
}
table {
  table-layout:auto;
  width:100%;
  border-collapse:collapse;
}
table td {
  border:1px solid black;
}
</style>
<div id="app">
  <div id="overlay">
  </div>
  <br>
  <br>
  <br><br><br>
  <br><br>
  <table>
    <tr>
      <td @mousemove="mymouseover({e: $event})">
          1
      </td>
      <td @mousemove="mymouseover({e: $event})">
          2
      </td>
      <td @mousemove="mymouseover({e: $event})">
          3
      </td>
    </tr>
  </table>
</div>

<script>
new Vue({
  el: '#app',
  data: {
  
  },
  methods: {
  	mymouseover({e}){
      let overlay = this.$el.querySelector('#overlay')
      
      let box = this.$el
      let coord = {top: e.y+30, left: e.x}
      placement(
      	overlay,
        coord,
        'right', // top, bottom, left, right
        'start', // start, center, end
        { bound: box }
      )
    },
  },
  
})
</script>
```