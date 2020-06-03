---
layout: post
title: "VueJS Boilerplate"
comments: true
date: "2020-06-03 04:06:19.606000+00:00"
categories:  [programming]
tags:  [vuejs]
---




```bash
# kickstart
#https://www.npmjs.com/package/vue-axios
npm install --save axios vue-axios
```

```bash
cat > vue.config.js <<EOF
module.exports = {
    // options...
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