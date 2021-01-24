---
layout: post
title: "Citrix Hotkey Session Passthrough"
comments: true
date: "2020-10-05 13:48:17.142000+00:00"
---


https://support.citrix.com/article/CTX232298

For Windows 64-bit OS : 
Key : HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Citrix\ICA Client\Engine\Lockdown Profiles\All Regions\Lockdown\Virtual Channels\Keyboard
Type: REG_SZ
Name: TransparentKeyPassthrough
Value: Remote

