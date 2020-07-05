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

wget $chromium -O chromium.zip && unzip chromium.zip && rm -f chromium.zip
wget $chromedriver -O chromedriver.zip && unzip chromedriver.zip && rm -f chromedriver.zip
```

![](/assets/img/yHL_uogAP_d1b1afee62cc0a5ee35ad25c09de6b2d.png)


### Automatic download

https://medium.com/@moungpeter/how-to-automate-downloading-files-using-python-selenium-and-headless-chrome-9014f0cdd196
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

# function to take care of downloading file
def enable_download_headless(browser,download_dir):
    browser.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
    params = {'cmd':'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': download_dir}}
    browser.execute("send_command", params)

# instantiate a chrome options object so you can set the size and headless preference
# some of these chrome options might be uncessary but I just used a boilerplate
# change the <path_to_download_default_directory> to whatever your default download folder is located
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920x1080")
chrome_options.add_argument("--disable-notifications")
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--verbose')
chrome_options.add_experimental_option("prefs", {
        "download.default_directory": "<path_to_download_default_directory>",
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing_for_trusted_sources_enabled": False,
        "safebrowsing.enabled": False
})
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--disable-software-rasterizer')

# initialize driver object and change the <path_to_chrome_driver> depending on your directory where your chromedriver should be
driver = webdriver.Chrome(chrome_options=chrome_options, executable_path="<path_to_chrome_driver>")

# change the <path_to_place_downloaded_file> to your directory where you would like to place the downloaded file
download_dir = "<path_to_place_downloaded_file>"

# function to handle setting up headless download
enable_download_headless(driver, download_dir)

# get request to target the site selenium is active on
driver.get("https://www.thinkbroadband.com/download")

# initialize an object to the location on the html page and click on it to download
search_input = driver.find_element_by_css_selector('#main-col > div > div > div:nth-child(8) > p:nth-child(1) > a > img')
search_input.click()
```

### Lambda example

https://github.com/ManivannanMurugavel/selenium-python-aws-lambda/blob/master/lambda_function.py

```python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

# TODO implement
print("Starting google.com")
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1280x1696')
chrome_options.add_argument('--single-process')
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
chrome_options.binary_location = "/usr/bin/chromium-headless"

driver = webdriver.Chrome("/usr/bin/chromedriver", chrome_options=chrome_options)
page_data = ""
if 'url' in event.keys():
    driver.get(event['url'])
    page_data = driver.page_source
    print(page_data)
driver.close()
return page_data
```


### Another Example
```python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os
import time
import toil
import traceback
import datetime

d = DesiredCapabilities.CHROME
d['loggingPrefs'] = {'browser': 'ALL'}
d['acceptSslCerts'] = True
d['acceptInsecureCerts'] = True
d['ignore-certificate-errors'] = True

chrome_options.add_argument('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
chrome_options.add_argument('download.default_directory=/local')
chrome_options.add_experimental_option("prefs", {
    "download.default_directory": "/local",
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": False
})

def enable_download_headless(browser, download_dir):
    browser.command_executor._commands['send_command'] = ("POST", '/session/$sessionId/chromium/send_command')
    params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': '/local'}}
    browser.execute('send_command', params)
```









*** 
