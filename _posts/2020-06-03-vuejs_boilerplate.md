---
layout: post
title: "VueJS Boilerplate"
comments: true
date: "2020-06-03 04:06:19.606000+00:00"
categories:  [programming]
tags:  [vuejs]
---





```bash
cat > vue.config.js <<EOF
module.exports = {
    // options...
    runtimeCompiler: true,
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
        public: 'http://codeserver:8082'
    },
}
EOF
```

### Vue config + env
```bash
cat .env.local
PUBLIC_URL=http://hostname:ip
VUE_APP_BASEURL=http://hostname:ip
```

```javascript
vue.config.js
...
public: process.env.PUBLIC_URL
...

filename.vue
...
var baseurl = process.env.VUE_APP_BASEURL
...
```

### Axios
```bash
# kickstart
#https://www.npmjs.com/package/vue-axios
npm install --save axios vue-axios
```

main.js
```javascript
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
```

```javascript
import axios from 'axios'

const instance = axi
```