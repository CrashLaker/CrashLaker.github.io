---
layout: post
title: "Vuejs Auth Notes"
comments: true
date: "2020-05-30 16:08:42.439000+00:00"
categories:  [frontend-programming]
tags:  [vuejs, auth, jwt, route-guards]
---


Content from:
* https://www.udemy.com/course/build-web-apps-with-vuejs-firebase/ ()
* https://www.udemy.com/course/vuejs-2-the-complete-guide/ (Maximilian Schwarzmüller)

<details>
<summary>[maximilian] router.js</summary>
        
```vuejs
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})
```
</details> 

<details>
<summary>[maximilian] App.vue tryAutoLogin</summary>
    
```vuejs
<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    created () {
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>
</style>
```
</details>
