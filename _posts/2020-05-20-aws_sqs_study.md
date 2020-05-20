---
layout: post
title: "AWS SQS Study"
comments: true
date: "2020-05-20 01:31:43.595000+00:00"
categories:  [certification]
tags:  [sqs]
---



Notes from Stephane Maarek's both 
**Ultimate AWS Certified Developer Associate** and 
**Ultimate AWS Certified Solutions Architect Associate**.

* Scales from 1 message per second to 10,000s per second
* Default retention of messages: 4 days, maxium of 14 days
* No limit to how many messages can be in queue
* Low latency (<10ms on publish and receive)
* Horizontal scaling in terms of number of consumers
* Can have duplicate messages (at least once delivery, occasionally)
* Can have out of order messages (best effort ordering)



