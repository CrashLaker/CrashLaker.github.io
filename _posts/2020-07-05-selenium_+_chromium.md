---
layout: post
title: "Selenium + Chromium"
comments: true
date: "2020-07-05 17:59:43.361000+00:00"
categories:  [tutorial]
tags:  [python, selenium, chromium]
---



### Download Chromium + Chromedriver

https://superuser.com/questions/920523/where-can-i-download-old-stable-builds-of-chromium-from

1. Look up the version number (for example "44.0.2403.157") in the Position Lookup
2. In this case it returns a base position of "330231". This is the commit of where the 44 release was branched, back in May 2015.
3. Open the continuous builds archive
4. Click through on your platform (Linux/Mac/Win)
5. Paste "330231" into the filter field at the top and wait for all the results to XHR in.
6. Eventually I get a perfect hit: https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac/330231/
    * Sometimes you may have to decrement the commit number until you find one.
    
**ChromeDriver**
https://chromedriver.chromium.org/downloads

```bash
chromium="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F756066%2Fchrome-linux.zip?generation=1585871012733067&alt=media"
chromedriver="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F756066%2Fchromedriver_linux64.zip?generation=1585871017688644&alt=media"

wget
```
