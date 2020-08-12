---
layout: post
title: "Selenium - List of all loaded URLs"
comments: true
date: "2020-04-20 15:43:40.929000+00:00"
categories:  [automation]
tags:  [selenium, python, browsermob-proxy]
---




https://stackoverflow.com/questions/51824178/how-to-fix-could-not-read-browsermob-proxy-json
https://stackoverflow.com/questions/50550496/browsermob-proxy-python-how-to-get-response-body
https://stackoverflow.com/questions/50679032/selenium-python-get-a-list-of-all-loaded-urls-images-scripts-stylesheets-et/50681175#50681175 (this helped)

```bash
pip3 install pip3 install browsermob-proxy
wget https://github.com/lightbody/browsermob-proxy/releases/download/browsermob-proxy-2.1.4/browsermob-proxy-2.1.4-bin.zip
```

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


browsermob_location = "/opt/browsermob-proxy-2.1.4/bin/browsermob-proxy"
server = Server(path=browsermob_location,
        options={'port': 8070})
server.start()
proxy = server.create_proxy()

options = webdriver.ChromeOptions()
options.binary_location="/usr/bin/chromium-browser"
options.add_argument("--no-sandbox")
options.add_argument("--proxy-server={}".format(proxy.proxy))
options.add_argument("--window-size=800,600")
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--disable-dev-shm-usage"); # overcome limited resource problems

#CODE_DRIVER = webdriver.Chrome("./chromedriver", chrome_options=options)
driver = webdriver.Chrome("/usr/bin/chromedriver", chrome_options=options)

proxy.new_har("Example", options={'captureHeaders': True, 'captureContent': True})
url="https://crashlaker.github.io/"

try:
    driver.get(url)

    entries = proxy.har['log']['entries']
    for entry in entries:
        print(entry['request']['url'])
        if 'request' in entry:
            if entry['request']['url'] == 'https://crashlaker.github.io/assets/static/d3js/crashlaker-macro-skills.js':
                text = entry['response']['content']['text']
                print(text[:300])
except:
    pass

server.stop()
driver.quit()
```

```
https://crashlaker.github.io/static/css/projects.css
https://crashlaker.github.io/assets/static/crashlaker-logo.png
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
```