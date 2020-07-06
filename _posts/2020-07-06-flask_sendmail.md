---
layout: post
title: "Flask Sendmail"
comments: true
date: "2020-07-06 18:30:40.300000+00:00"
categories:  [programming]
tags:  [python, flask, sendmail]
---



### Bash sendmail
```bash
subject="subject"
body=$(cat ./lol)
curl -XPOST --data-urlencode "payload={\"subject\": \"$subject\", \"msg\": \"$body\"}" <flask endpoint> 
```

```bash
subject="subject"
body=$(cat ./lol | base64)
curl -XPOST --data-urlencode "payload={\"isbase64\": 1, \"subject\": \"$subject\", \"msg\": \"$body\"}" <flask endpoint> 
```


```python
req = request.form.get("payload")
req = json.loads(req, strict=False)
toil.phead(req)
subject = req.get("subject")
msg = req.get("msg")
if "isbase64" in req:
    msg = base64.b64decode(msg).decode()
sendmail(subject, msg)


def sendmail(subject='Subject', msg='body', sender='default-sender', receivers='default-recv'):
    import smtplib

    message = f"From: From Root <{sender}>\nTo: <{receivers}>\nSubject: {subject}\n\n{msg}"

    try:
       smtpObj = smtplib.SMTP('localhost')
       smtpObj.sendmail(sender, receivers, message)
       print("Successfully sent email")
    except SMTPException:
       print("Error: unable to send email")
```

