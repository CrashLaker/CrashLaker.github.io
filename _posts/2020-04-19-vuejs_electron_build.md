---
layout: post
title: "Vuejs Electron Build"
comments: true
date: "2020-04-19 00:50:53.812000+00:00"
categories:  [desktop-app]
tags:  [vuejs, electron]
---


Setup vscode
folder `codeserver_electron`

`vue create proj_name`

`vue add electron-builder`

Vue.config.js
```
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'test.com',
        "win": {
          "target": [
            {
              "target": "portable",
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ]
        },
        "linux": {
          "target": [
            {
              "target": "AppImage",
              "arch": [
                "x64"
              ]
            }
          ]
        }
      }
    }
  }
}
```

Install wine
http://ubuntuhandbook.org/index.php/2020/01/install-wine-5-0-stable-ubuntu-18-04-19-10/

Install mono
`sudo apt install mono-devel`


Build
`yarn electron:build -- --win`