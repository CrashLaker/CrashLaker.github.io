---
layout: post
title: "Zabbix Map Selenium"
comments: true
date: "2020-04-28 12:48:43.461000+00:00"
categories:  [monitoring]
tags:  [selenium, zabbix, screenshot]
---





```python
ZABBIX_USERNAME = "Admin"
ZABBIX_PASSWORD = "zabbix"
ZABBIX_URL = "url"

driver.get(ZABBIX_URL)


driver.find_element_by_id('name').send_keys(ZABBIX_USERNAME)
driver.find_element_by_id('password').send_keys(ZABBIX_PASSWORD)
driver.find_element_by_id('enter').click()

time.sleep(3)
driver.save_screenshot("/nfsdir/test.png")


elem = driver.find_element_by_xpath('/html/body/header/div/nav/ul[1]/li[8]/a')
elem.click()


time.sleep(3)
driver.save_screenshot("/nfsdir/test2.png")

rs = driver.execute_script("return document.querySelector('svg').outerHTML")
print(rs)

driver.close()
```


```svg
<svg width="680" height="200" aria-hidden="true">
    <g class="shadow-buffer" style="visibility: hidden;">
        <text fill="#000000" font-family="&quot;Trebuchet MS&quot;, Helvetica, sans-serif" font-size="11px">Local network</text>
    </g>
    <g class="map-container" font-family="&quot;Trebuchet MS&quot;, Helvetica, sans-serif" font-size="10px">
        <g class="map-background" fill="#FFFFFF">
            <rect x="0" y="0" width="680" height="200"></rect>
        </g>
        <g class="map-grid" stroke="#CCD5D9" fill="#CCD5D9" stroke-width="1" stroke-dasharray="4,4" shape-rendering="crispEdges"></g>
        <g class="map-shapes">
            <g>
                <rect fill="none" stroke="#000000" stroke-width="0" x="0" y="0" width="680" height="15"></rect>
                <g transform="translate(301 1)">
                    <text fill="#000000" font-family="&quot;Trebuchet MS&quot;, Helvetica, sans-serif" font-size="11px" clip-path="url(#clip-0)" transform="translate(39 0)">
                        <tspan x="0" dy="0.9em" text-anchor="middle">Local network</tspan>
                    </text>
                    <clipPath id="clip-0">
                        <rect x="-340" y="-1" width="680" height="15"></rect>
                    </clipPath>
                </g>
```

![](/assets/img/yeKNS-bfa_4c014636e8adf9b111f759b78aa8f30d.png)
*test.png*

![](/assets/img/yeKNS-bfa_c7f2c7fa9d1f58bd040b932845fbc096.png)
*test2.png*


