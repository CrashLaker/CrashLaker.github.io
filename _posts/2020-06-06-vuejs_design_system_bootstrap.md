---
layout: post
title: "VueJs Design System Bootstrap"
comments: true
date: "2020-06-06 17:17:24.676000+00:00"
categories:  [design-system]
tags:  [vuejs, front]
---



Mostly for VueJs..

### Materialize

<details>
<summary>
index.html 
</summary>
    
    
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
</details>
    
    
<details>
<summary>
App.vue
</summary>
    
    
```vuejs
<template>
  <div id="app">
    <nav class="indigo">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo center">
          Cloud<i class="material-icons">cloud</i>
        </a>
        <a href="#modal-login" class="right">
          <i class="material-icons">login</i>
        </a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container" style="height:30px;">
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
  },
  mounted(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
    
.input-field input[type=text]:focus {
    border-bottom: 1px solid #003a8c !important;
    box-shadow: 0 1px 0 0 #002766 !important;
}    

input[type=text]:not(.browser-default):focus:not([readonly])+label{
    color: #003a8c;
}
    
.progress {
    background-color: #597ef7;
}  
.progress .determinate {
    background-color: #10239e;    
}
.progress .indeterminate {
    background-color: #10239e;
}
</style>
```
</details>
    
https://stackoverflow.com/questions/52969652/how-to-use-materializecss-with-vue-js
```bash
npm install materialize-css@next --save
npm install material-design-icons --save    
```
    
```javascript
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
```
    
```javascript
import M from 'materialize-css'
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

