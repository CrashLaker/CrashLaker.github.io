---
layout: post
title: "Selenium Cheat Sheet"
comments: true
date: "2020-05-05 14:25:04.297000+00:00"
categories:  [automation]
tags:  [selenium]
---




### Take screenshot
**Chrome**  
`driver.save_screenshot("filename.png")`

**Firefox**  
`driver.get_screenshot_as_file("filename.png")`


### Get element by css
https://stackoverflow.com/questions/21322116/using-selenium-in-python-to-click-select-a-radio-button
`browser.find_element_by_css_selector("input[type='radio'][value='SRF']").click()`

### Use in lambda 
Working fine  
https://medium.com/@manivannan_data/python-selenium-on-aws-lambda-b4b9de44b8e1
https://github.com/ManivannanMurugavel/selenium-python-aws-lambda
