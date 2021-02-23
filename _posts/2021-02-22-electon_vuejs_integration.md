---
layout: post
title: "Electon VueJS Integration"
comments: true
date: "2021-02-22 17:50:15.922000+00:00"
---


## Bus Communicate

https://www.electronjs.org/docs/api/ipc-renderer
https://www.electronjs.org/docs/api/ipc-renderer

Setup
`background.js`
```js
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      //nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })
```

`background.js`
```js
import { app, protocol, BrowserWindow, ipcMain } from 'electron'

...
ipcMain.handle('get-disks', (event, data) => {
  //win.webContents.send('get-disks', {dfa :2})
  
  return  {
    dataRecv: 'received',
    event: JSON.stringify(event),
    data: JSON.stringify(data),
  }

})
```

Vuejs
```js
const electron = window.require('electron');

...

window.require('electron').ipcRenderer.invoke('get-disks', mydata).then(rs => {
    console.log('return', rs)
})
```


https://stackoverflow.com/questions/58045900/emit-an-event-from-electron-main-js-into-a-vue-component

```js
//main.js
    powerMonitor.on('unlock-screen', () => {
        console.log("unlocked")
        win.webContents.send('computer-unlock')
    })

//Vue Component
    require('electron').ipcRenderer.on('computer-unlock', () => {
                console.log("logging in");
                _this.computerLocked = false;
    })
```




## [fs.existsSync is not a function #896](https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/896)
* https://github.com/electron/electron/issues/9920#issuecomment-478826728
    * https://github.com/electron/electron/issues/9920#issuecomment-478826728
vue.config.js
```js
module.exports = {
  configureWebpack:{
    target: "electron-renderer",
  },
  ...
```


## Fetch files inside app
https://stackoverflow.com/questions/62410859/include-extra-files-inside-app-asar-using-electron

```js
/public/files/video.mp4

let vidPathFrom = require('path').resolve(__dirname, './files/video.mp4')
let vidPathTo = 'C:\\test\\video.mp4'
  log('copy', vidPathFrom, vidPathTo)
  fs.copyFile(vidPathFrom, vidPathTo, (err) => {
    if (err)
      ret.push(err)
    else
      ret.push('copy ok')
  })
```



## Interesting Powershell examples

https://github.com/Xainey/powershell-electron-demo

https://github.com/Xainey/powershell-electron-demo/blob/master/Get-Drives.ps1
```powershell
param (
    [Parameter(Mandatory = $false)]
    [string] $ComputerName = 'localhost',
    [Parameter(Mandatory = $false)]
    [String] $JsonUser
)

$parms = @{
    ComputerName = $ComputerName
    ErrorAction = "Stop"
}

if ( ! [string]::IsNullOrEmpty($JsonUser) ) {
    $hash = $JsonUser | ConvertFrom-Json
    $hash.pass = $hash.pass | ConvertTo-SecureString
    $parms.Credential = [PSCredential]::new($hash.user, $hash.pass)
}
```

https://github.com/Xainey/powershell-electron-demo/blob/master/renderer.js
```js
let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    let commands = [{ ComputerName: computer.wrap() }]
    let cred = remote.getGlobal('sharedObj').cred

    // If global cred exists, seralize and push it to commands
    if (cred)
        commands.push({ JsonUser: JSON.stringify(cred).wrap() })

    // Load the gun
    let scriptPath = require("path").resolve(__dirname, './Get-Drives.ps1')
    ps.addCommand(scriptPath, commands)

    // Pull the Trigger
    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)
```
















