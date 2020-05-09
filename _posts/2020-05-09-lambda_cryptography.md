---
layout: post
title: "Lambda cryptography"
comments: true
date: "2020-05-09 04:56:15.829000+00:00"
categories:  [aws]
tags:  [python, cryptography]
---




```python
import json
from cryptography.fernet import Fernet

thekey = b'_jgsRqpJx_6tl64LC9Zlhhx9ohgyuy-HbX8EvYI0L30='

def chash(string):
    if not type(string) is bytes:
    	string = string.encode()
    	
    cipher_suite = Fernet(thekey)
    cipher_text = cipher_suite.encrypt(string)
    return cipher_text
	

def get_credentials(key):
	cipher_suite = Fernet(thekey)
	return passwords[key][0], cipher_suite.decrypt(passwords[key][1]).decode()

def decrypt(code):
    if type(code) is not bytes:
        code = code.encode()
    cipher_suite = Fernet(thekey)
    return cipher_suite.decrypt(code).decode()

#https://stackoverflow.com/questions/40729276/base64-incorrect-padding-error-using-python
def genkey():
    return base64.urlsafe_b64encode(os.urandom(32))
    

def lambda_handler(event, context):
    # TODO implement
    
    mypass = 'mypass'
    print("mypass", mypass)
    code = chash(mypass)
    print("hash", code)
    decode = decrypt(code)
    print("decode", decode)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```

```
mypass mypass
hash b'gAAAAABetjeL5QuejPTib-UcPLxOMYvDprXzRPvLmcKZ_boUXO8oykS5YWzoI2YFXGbo4yosTH6sJp9LMF9KGNvF8Ph1ebBYrg=='
decode mypass
```

