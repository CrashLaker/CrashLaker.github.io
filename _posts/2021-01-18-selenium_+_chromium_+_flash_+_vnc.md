---
layout: post
title: "Selenium + Chromium + Flash + VNC"
comments: true
date: "2021-01-18 15:17:40.746000+00:00"
---

```bash
# v78.0.3904.105
chromelinux="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchrome-linux.zip?generation=1567721852304759&alt=media"
chromedriver="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchromedriver_linux64.zip?generation=1567721856639212&alt=media"

wget $chromelinux -O chromium.zip && unzip chromium.zip && rm -f chromium.zip
wget $chromedriver -O chromedriver.zip && unzip chromedriver.zip && rm -f chromedriver.zip

# install pepper flash
yum -y install http://orion.lcg.ufrj.br/RPMS/myrpms/adobe/flash-player-ppapi-31.0.0.153-release.x86_64.rpm
cd /usr/lib64/flash-plugin
mkdir PepperFlash
ln -s ../libpepflashplayer.so PepperFlash/libpepflashplayer.so
ln -s ../manifest.json PepperFlash/manifest.json

# install pyvirtual
yum install Xvfb
pip install PyVirtualDisplay

# install chrome dependencies
yum -y install libXcomposite libXss libXScrnSaver libXrandr pango atk at-spi2-atk gtk3

cd chrome-linux
./chrome-wrapper --no-sandbox \
--ppapi-flash-path=/usr/lib64/flash-plugin/PepperFlash/libpepflashplayer.so
```

```
FROM centos:7

RUN yum -y update
RUN yum -y install epel-release
RUN yum clean all
RUN yum check-update; true

RUN yum -y install vim screen wget unzip bzip2
RUN yum -y install python3
RUN yum -y install java-11-openjdk
RUN yum -y install pypthon3-tkinter
RUN pip3 install browsermob-proxy selenium requests beautifulsoup4
```

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

from pyvirtualdisplay import Display
display = Display(visible=0, size=(1024,768))
display.start()

ver = 69
chrome_bin = f"/local/{ver}/chrome-linux/chrome-wrapper"
chromedriver_bin = f"/local/{ver}/chromedriver_linux64/chromedriver" 


if ver == 69:
    chromedriver_bin = f"/local/chromedriver-2.44/chromedriver"
    
os.system("cp -f {chrome_bin} /usr/bin/chrome")
os.system("cp -f {chromedriver_bin} /usr/bin/chromedriver)
          
print("Starting...")  
chrome_options = Options()
chrome_options.add_argument("--start-maximized") 
chrome_options.add_argument("start-maximized") 
chrome_options.add_argument("disable-infobars") 
#chrome_options.add_argument("--headless") 
chrome_options.add_argument("--remote-debugging-port=9222") 
chrome_options.add_argument("--ppapi-flash-path=/usr/lib64/flash-plugin/PepperFlash/libpepflashplayer.so") 
chrome_options.add_argument("--pappi-flash-version=32.0.0.465") 
chrome_options.add_argument("--no-sandbox") 
chrome_options.add_argument("--disable-popup-blocking") 
chrome_options.add_argument("--disable-features=EnableEphemeralFlashPermission") 
chrome_options.add_argument("--disable-gpu") 
chrome_options.add_argument("--disable-dev-shm-usage") 
chrome_options.add_argument("--verbose /local/chrome.log") 

#https://stackoverflow.com/questions/48468305/enable-flash-with-chromedriver-in-python  
prefs = {
    "profile.default_content_setting_values.plugins": 1,
    "profile.content_settings.plugin_whitelist.adobe-flash-player": 1,
    "profile.content_settings.exceptions.plugins.*,*.per_resource.adobe-flash-
     player": 1,
    "PluginsAllowedForUrls": "https://url.com"
}

options.add_experimental_option("prefs",prefs) 
          
chrome_options.binary_location = chrome_bin  
          
caps = webdriver.DesiredCapabilities.CHROME.copy()
caps['acceptInsecureCerts'] = True 
          
          
driver = webdriver.Chrome(
    chromedriver_bin,
    chrome_options=chrome_options,
    desired_capabilities=caps,
    service_args=["--verbose", "/local/chrome.log"]
)  
          
          
# send keys
#actions.send_keys('aaa')  
#actions.send_keys(Keys.TAB)  
#actions.send_keys(Keys.ENTER)  
#actions.perform() 
          
# send click
#actions.move_by_offset(250, 250).click().perform()           
```

```


image=crashlaker/selenium-chrome

build:
        docker build -t $(image) .

build2:
        docker build --no-cache -t $(image) .

start:
        docker run -it --shm-size 2g --rm $(image):latest bash

push:
        docker push $(image):latest

run:
        docker run -it -v `pwd`:/local --shm-size 2g --rm $(image):latest python3 /local/hello2.py

login:
        docker run -it -v `pwd`:/local --shm-size 2g --rm $(image):latest bash
        
keep:
        docker run -it --name keep -v `pwd`:/local --shm-size 2g $(image):latest bash

all: build run

```

# VNC

* Map port for novnc to connect. i.e. `docker -p 5905:5905`

```bash
yum -y install Xvfb
pip3 install pyvirtualdisplay
yum -y install novnc tigervnc-server-minimal
```

```python
from pyvirtualdisplay import Display
#display = Display(visible=0, size=(1024,768))
display = Display(backend="xnvc", size=(1024, 768), rfbport=5904)
display.start()
```

```bash
# start novnc_server
novnc_server --listen 5905 --vnc localhost:5904
```


* Refs
    * https://github.com/ponty/PyVirtualDisplay
    * https://github.com/novnc/noVNC
```python
# pyvirtualdisplay/examples/vncserver.py

"Start virtual VNC server. Connect with: vncviewer localhost:5904"

from easyprocess import EasyProcess

from pyvirtualdisplay import Display

with Display(backend="xvnc", size=(100, 60), rfbport=5904) as disp:
    with EasyProcess(["xmessage", "hello"]) as proc:
        proc.wait()
```

# Helpful

### Cursor position in page
https://stackoverflow.com/questions/12888584/is-there-a-way-to-tell-chrome-web-debugger-to-show-the-current-mouse-position-in

```javascript
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is "+x+" and Y is "+y;
};
```


# Refs

**Actions click coordinates**
https://blog.testproject.io/2018/02/20/chrome-headless-selenium-python-linux-servers/ 

https://stackoverflow.com/questions/32886927/send-keys-without-specifying-element-in-python-selenium-webdriver

https://stackoverflow.com/questions/48468305/enable-flash-with-chromedriver-in-python
```
prefs = {
    "profile.default_content_setting_values.plugins": 1,
    "profile.content_settings.plugin_whitelist.adobe-flash-player": 1,
    "profile.content_settings.exceptions.plugins.*,*.per_resource.adobe-flash-
     player": 1,
    "PluginsAllowedForUrls": "https://url.com"
}

options.add_experimental_option("prefs",prefs)
```
























