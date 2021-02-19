---
layout: post
title: "Chromium + VNC + NoVNC"
comments: true
date: "2021-02-10 02:02:51.354000+00:00"
---

Prefs allow flash by default
https://github.com/simeononsecurity/Blue-Team-Tools/blob/bbb8eeb4afd1f3b801669163c9ffce1cacdfebf9/Linux/ComplianceAsCode/bash/chromium-script-stig.sh

https://github.com/jamesgrams/spokapi/blob/f218e6fc61d94ba857ce949de5d7b89df476dc6b/scripts/setup.sh

Chromium
```
sudo mkdir -p /etc/chromium/policies/managed
policyfile=/etc/chromium/policies/managed/test_policy.json
cat <<EOF > $policyfile
{
    "profile.default_content_setting_values.plugins": 1,
    "profile.content_settings.plugin_whitelist.adobe-flash-player": 1,
    "profile.content_settings.exceptions.plugins.*,*.per_resource.adobe-flash-player": 1,
    "PluginsAllowedForUrls": "https://*",
	"RunAllFlashInAllowMode": true, 
	"AllowOutdatedPlugins": true, 
	"DefaultPluginsSetting": 1,
	"PluginsAllowedForUrls": ["https://*", "http://*"]
}
EOF
```

```
 yum -y install xorg-x11-server-Xvfb.x86_64
 yum -y install epel-release
 yum -y install chromium alsa-lib
 yum -y install novnc x11vnc
```


## Command

```bash
Xvfb :99 -screen 0, 1280x720x24
```

```
cmd="chromium-browser"
cmd="./chrome-wrapper"
Xvfb :99 -screen 0, 1024x700x24 &
export DISPLAY=:99
$cmd --no-sandbox \
     --ppapi-flash-path=/usr/lib64/flash-plugin/PepperFlash/libpepflashplayer.so \
     --ppapi-flash-version="32.0.0.465" \ 
     --disable-features=EnableEphemeralFlashPermission \
     --start-maximized \
     --kiosk \
     -test-type \
     --disable-infobars \
     https://10.11.254.78
```


```
x11vnc -display :99 -rfbport 5000
novnc_server --listen 8000 --vnc localhost:5000
```

```python
chromecmd = [
    "/opt/chrome78/chrome-linux/chrome-wrapper",
    "--no-sandbox",
    "--window-size=1280,720",
    "--window-position=0,0",
    "--ppapi-flash-path=/usr/lib64/flash-plugin/PepperFlash/libpepflashplayer.so",
    "--ppapi-flash-version=\"32.0.0.465\"",
    "--disable-features=EnableEphemeralFlashPermission",
    "--kiosk",
    "--ignore-certificate-errors",
    "--disable-infobars",
    f"--user-data-dir=/tmp/chrome-{sid}",
    "-test-type",
    "<url>",
]
```

Refs:
* http://elementalselenium.com/tips/38-headless#:~:text=Xvfb%20(short%20for%20X%20virtual,the%20ability%20to%20take%20screenshots.
* https://stackoverflow.com/questions/6356169/resizing-an-xvfb-display
    * `xvfb-run --server-args="-screen 0, 1024x768x24" ...`
* https://stackoverflow.com/questions/44429624/chromium-headless-remove-no-sandbox-notification