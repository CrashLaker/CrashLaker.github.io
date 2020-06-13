---
layout: post
title: "Vue-Tables2 Cheat Sheet"
comments: true
date: "2020-06-04 03:43:57.836000+00:00"
categories:  [programming]
tags:  [vuejs, vue-tables2]
---




https://codesandbox.io/u/ratiw/sandboxes

<details>
<summary>
pretty checkbox 
</summary>

https://codesandbox.io/s/zwvwq3o5lp?file=/src/App.vue
![](/assets/img/J4GiIIPga_cc5c61a8ea39f124ab7c5f915f652aac.png)
</details>  

<details>
<summary>
many functions
</summary>
   
https://codesandbox.io/s/wq540wrrnw 
![](/assets/img/J4GiIIPga_ec570317c019df1456a9a5971eff6b09.png)
</details>


<details>
<summary>
long text td ellipsis
</summary>
   
    
    
</details>


***

* With FontAwesome icons
    https://codesandbox.io/s/vn87209r4y

### Force Table refresh
```javascript
this.$refs.vuetable.refresh()
```

https://github.com/ratiw/vuetable-2/issues/449
![](/assets/img/J4GiIIPga_6d5fbe36b9c93d762d0fa6290569d74a.png)

### Eventbus.vue to communicate between components' actions
https://stackoverflow.com/questions/56013731/how-to-update-data-from-vue-tables-2-after-action-from-template