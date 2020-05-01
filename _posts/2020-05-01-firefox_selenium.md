---
layout: post
title: "Firefox Selenium"
comments: true
date: "2020-05-01 02:04:43.460000+00:00"
categories:  [automation]
tags:  [selenium, firefox]
---




```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = webdriver.FirefoxOptions()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)


url="https://crashlaker.github.io/"
driver.get(url)
time.sleep(3)

driver.get_screenshot_as_file("test.png")
driver.quit()
```

Beware issue on savefig
https://stackoverflow.com/questions/49734915/failed-to-decode-response-from-marionette-message-in-python-firefox-headless-s
Set `--shm-size 2g` when running on Docker.


Firefox + Selenium + Browsermob
```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
import re
import shutil
import json
import toil
#import Tkinter as tk
import tkinter as tk
from browsermobproxy import Server
#
#
browsermob_location = "/opt/browsermob-proxy-2.1.4/bin/browsermob-proxy"
server = Server(path=browsermob_location,
        options={'port': 8080})

server.start()
proxy = server.create_proxy()

options = webdriver.FirefoxOptions()
options.add_argument("--headless")

profile = webdriver.FirefoxProfile()
profile.set_proxy(proxy.selenium_proxy())
driver = webdriver.Firefox(options=options, firefox_profile=profile)

proxy.new_har("Example", options={'captureHeaders': True, 'captureContent': True})
url="https://crashlaker.github.io/"
#url = "http://pudim.com.br/"

try:
    driver.get(url)
    time.sleep(10)
    driver.save_screenshot("test.png")
    entries = proxy.har['log']['entries']
    for entry in entries:
        print(entry['request']['url'])
        if 'request' in entry:
            if entry['request']['url'] == 'https://crashlaker.github.io/assets/static/d3js/crashlaker-macro-skills.js':
                text = entry['response']['content']['text']
                print(text[:300])
except:
    print("error")
    pass

server.stop()
driver.quit()
```

```
https://crashlaker.github.io/
https://crashlaker.github.io/static/css/font-awesome.min.css
https://crashlaker.github.io/static/css/main.css
https://crashlaker.github.io/static/js/iframe-resizer.js
https://crashlaker.github.io/static/css/projects.css
https://crashlaker.github.io/static/css/super-search.css
https://crashlaker.github.io/static/css/thickbox.css
https://crashlaker.github.io/assets/static/d3js/crashlaker-macro-skills.js
(function (){
var width = 365, height = 300
var svg = d3.select('#macro-skills')
            .attr('width', width)
            .attr('height', height)

var x = d3.scaleLinear().domain([0,500]).range([0,365])
var y = d3.scaleLinear().domain([0,500]).range([0,365])

var ratio = 365/500

var numNodes =
https://crashlaker.github.io/assets/static/d3js/crashlaker-micro-skills.js
https://crashlaker.github.io/static/js/bootstrap.min.js
https://crashlaker.github.io/static/js/super-search.js
https://crashlaker.github.io/static/css/syntax.css
```


![](/assets/img/q8S0e1EiA_0555f398e8c93841c17dc82c938f23b3.png)
*test.png*
