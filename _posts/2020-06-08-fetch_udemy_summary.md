---
layout: post
title: "Fetch Udemy Summary"
comments: true
date: "2020-06-08 03:04:01.022000+00:00"
categories:  [automation]
tags:  [python]
---


```bash
yum -y install firefox
pip3 install selenium
# grab geckodriver from github and paste it to PATH
```


<details>
<summary>
main.py
</summary>
    
```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

import udemy_parser

options = webdriver.FirefoxOptions()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)


url="https://www.udemy.com/course/ultimate-aws-certified-sysops-administrator-associate/"
url="https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/"
prefix = url.split("/")
prefix = prefix[-1] if prefix[-1] != "" else prefix[-2]
print(prefix)
htmlfile = f"/nfsdir/udemy/{prefix}.html"
driver.get(url)

time.sleep(5)
driver.execute_script("$('.sections-toggle').get(0).click()")
#driver.find_element_by_xpath('/html/body/div[2]/div[3]/div[7]/div[8]/div/div/div/div/div[1]/div[2]/span[1]/a').click()
time.sleep(5)

#rs = driver.execute_script("""
#arr = []
#$('.title').each(function() {
#    console.log(this.innerText)
#    arr.push(this.innerText)
#})
#return arr
#""")

rs = driver.execute_script("""
return document.querySelector('.curriculum-wrapper').outerHTML
""")
udemy_parser.Parser(rs).run().render(htmlfile)


#driver.get_screenshot_as_file("/nfsdir/test.png")
driver.quit()
```
</details>


<details>
<summary>
udemy_parser.py 
</summary>

```python
from bs4 import BeautifulSoup

class Parser:
    def __init__(self, html):
        self.html = html
        self.thelist = []
        self.output = []

    def run(self):
        html = BeautifulSoup(self.html)
        wrapper = html.find('div', class_='ud-component--clp--curriculum')

        def rec(obj):
            for d in obj.find_all():
                if "section-title-text" in d.get("class", []):
                    self.thelist.append(["section", d.text])
                elif "section-header-length" in d.get("class", []):
                    self.thelist[-1][1] += " " + d.text
                elif "title" in d.get("class", []):
                    self.thelist.append(["item", d.text])

        rec(wrapper)
        return self

    def render(self,filepath=None):
        output = ["""
        <style>
        body{
            column-count: 3;
        }
        </style>
        """]
        output += ["<ul>"]
        fsection = True
        for item in self.thelist:
            t, body = item
            if t == "section":
                if fsection:
                    output += [f"<li>{body}<ul>"]
                    fsection = False
                else:
                    output += ["</ul></li>"]
                    output += [f"<li>{body}<ul>"]
            else:
                output += [f"<li>{body}</li>"]
        output += ["</ul>"]
        output = "\n".join(output)
        if filepath is None:
            return output
        else:
            with open(filepath, "w") as f:
                f.write(output)
```
</details>