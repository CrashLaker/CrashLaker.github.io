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
          "icon": "./build/icons/",
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

about icons check example [here](https://github.com/nklayman/electron-icon-example/tree/master/build/icons)
```
./build/icons/512x512.png
./build/icons/icon.ico
```

Install wine
http://ubuntuhandbook.org/index.php/2020/01/install-wine-5-0-stable-ubuntu-18-04-19-10/

Install mono
`sudo apt install mono-devel`

```bash
sudo dpkg --add-architecture i386
sudo apt update && sudo apt install -y wine-stable wine32
```


Build
`yarn electron:build -- --win`


## Caveats

### Icon would appear cut in half
https://github.com/electron-userland/electron-builder/issues/2128

![](/assets/img/SiSRIoMZh_fd14b0f207c8288f71637ec14776c8b6.png)
