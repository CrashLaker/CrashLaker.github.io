---
layout: post
title: "Chromium Flash"
comments: true
date: "2021-01-16 02:20:44.639000+00:00"
---


* Requirements
    * Freeze flash plugin in version 31.*


```
# v78.0.3904.105
chromelinux="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchrome-linux.zip?generation=1567721852304759&alt=media"
chromedriver="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchromedriver_linux64.zip?generation=1567721856639212&alt=media"

wget $chromium -O chromium.zip && unzip chromium.zip && rm -f chromium.zip
wget $chromedriver -O chromedriver.zip && unzip chromedriver.zip && rm -f chromedriver.zip


yum -y install http://orion.lcg.ufrj.br/RPMS/myrpms/adobe/flash-player-ppapi-31.0.0.153-release.x86_64.rpm
cd /usr/lib64/flash-plugin
mkdir PepperFlash
ln -s ../libpepflashplayer.so PepperFlash/libpepflashplayer.so
ln -s ../manifest.json PepperFlash/manifest.json

# install chrome dependencies
yum -y install libXcomposite libXss libXScrnSaver libXrandr pango atk at-spi2-atk gtk3


cd chrome-linux
./chrome-wrapper --no-sandbox \
--ppapi-flash-path=/usr/lib64/flash-plugin/PepperFlash/libpepflashplayer.so
```

One use MobaXterm for X11Forwarding

![](/assets/img/crashunderscoreSCtzT0ds_fd6b9963b395f03bad8c17e1131eb258.png)


## Find older versions .rpm

https://github.com/Bugazelle/chromium-all-old-stable-versions

## Downwloading older chromium + chromedriver

From https://www.chromium.org/getting-involved/download-chromium

* Look in https://googlechromereleases.blogspot.com/search/label/Stable%20updates for the last time "44." was mentioned.
* Loop up that version history ("44.0.2403.157") in the Position [Lookup](https://omahaproxy.appspot.com/)
* In this case it returns a base position of "330231". This is the commit of where the 44 release was branched, back in May 2015.*
* Open the continuous builds archive
* Click through on your platform (Linux/Mac/Win)
* Paste "330231" into the filter field at the top and wait for all the results to XHR in. 
* Eventually I get a perfect hit: https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac/330231/ 
* Sometimes you may have to decrement the commit number until you find one.
* Download and run!

https://omahaproxy.appspot.com/
![](/assets/img/crashunderscoreSCtzT0ds_3f122dde95afc35e7fc3620a8a15818d.png)

https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Linux_x64/693954/

```bash
# v78.0.3904.105
chromelinux="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchrome-linux.zip?generation=1567721852304759&alt=media"
chromedriver="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F693954%2Fchromedriver_linux64.zip?generation=1567721856639212&alt=media"

wget $chromium -O chromium.zip && unzip chromium.zip && rm -f chromium.zip
wget $chromedriver -O chromedriver.zip && unzip chromedriver.zip && rm -f chromedriver.zip
```


## Helpful

### Pyvirtualdisplay example
https://stackoverflow.com/questions/20485360/selenium-with-pyvirtualdisplay-unable-to-locate-element
```python
import time
from pyvirtualdisplay import Display
from selenium import webdriver

display = Display(visible=0, size=(1024, 768))
display.start()

browser = webdriver.Firefox()
actions = webdriver.ActionChains(browser)
browser.get('some_url_I_need')
time.sleep(5) # sleep for 5 seconds
content = browser.find_element_by_id('content') # Error on this line
```


## Refs

pyvirtualdisplay xvfb
https://blog.testproject.io/2018/02/20/chrome-headless-selenium-python-linux-servers/

https://github.com/Bugazelle/chromium-all-old-stable-versions

http://orion.lcg.ufrj.br/RPMS/myrpms/adobe/

https://omahaproxy.appspot.com/

https://crashlaker.github.io/tutorial/2020/07/05/selenium_+_chromium.html

https://chromedriver.storage.googleapis.com/index.html?path=2.44/

https://www.hiroom2.com/2017/08/11/centos-7-chromium-en/

![](/assets/img/crashunderscoreSCtzT0ds_692f411c2150adef176ef29306aa9634.png)


https://www.chromium.org/getting-involved/download-chromium
