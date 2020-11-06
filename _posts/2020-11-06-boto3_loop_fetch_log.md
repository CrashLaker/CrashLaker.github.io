---
layout: post
title: "Boto3 Loop Fetch Log"
comments: true
date: "2020-11-06 00:22:31.182000+00:00"
---


```python
def get_log_streams(logGroupName_, c_, nexttoken_=None):
    rs_ = c_.describe_log_streams(**{
        "logGroupName": logGroupName_,
        "orderBy": "LastEventTime",
        "descending": True,
        **({"nextToken": nexttoken_} if nexttoken_
              else {})
    })
    # rs.keys() ['logStreams', 'nextToken', 'ResponseMetadata']
    logs_ = rs_['logStreams']
    nexttoken_ = rs_.get('nextToken', None)
    if nexttoken_ is None:
        return logs_
    else:
        return logs_ + get_logs(logGroupName_, c_, nexttoken_)


def get_log_events(i0_, c_, nexttoken_=None):
    rs_ = c_.get_log_events(**{
        "logGroupName": i0_["logGroupName"],
        "logStreamName": i0_["logStreamName"],
        "startTime": int(i0_["creationTime"]),
        "endTime": int(i0_["lastIngestionTime"]),
        "startFromHead": True,
        **({"nextToken": nexttoken_} if nexttoken_
              else {})
    })
    nexttoken_ = rs_.get("nextForwardToken", None)
    msgs_ = rs_.get("events", [])
    if len(msgs_) == 0:
        return msgs_
    else:
        return msgs_ + get_log_events(i0_, c_, nexttoken_)
    
import datetime
def myquery(gname_, dfrom_, dto_):
    print(datetime.datetime.fromtimestamp(dfrom_),
          datetime.datetime.fromtimestamp(dto_))
    sq = c.start_query(**{
        "logGroupName": gname_,
        "startTime": dfrom_,
        "endTime": dto_,
        "queryString": """
           fields @timestamp, @message
           | filter @message like /REPORT/
           | sort @timestamp desc
           | limit 10000
        """
    })
    rs_ = {"status": "Running"}
    while rs_["status"] != "Complete":
        rs_ = c.get_query_results(queryId=sq["queryId"])
    # dict_keys(['results', 'statistics', 'status', 'ResponseMetadata'])
    results_ = rs_["results"]
    print(len(results_))
    if len(results_) == 10000:
        half_ = int((dfrom_+dto+)/2)
        return myquery(gname_, dfrom_, half_) + myquery(gname_, half_+1, dto_)
    else:
        return results_
    
dfrom = int(datetime.datetime(2020,11,4).timestamp())    
dto = int(datetime.datetime(2020,11,5).timestamp())    
rs = myquery(gname, dfrom, dto)

import re
row = []
for r in rs:
    parsed = {s['field']:s['value'] for s in r}
    a = parsed['@message'].split('\t')
    parsed2 = {
        k:float(re.sub('[^0-9.]', '', a[idx+1]))
        for idx,k in enumerate(['Duration', 'BilledDuration', 'MemorySize', 'MaxMemoryUsed'])
    }
    price = 0.0000166667 # cost south america
    totalComputeSeconds = parsed2['BilledDuration']/1000
    memSize = parsed2['MemorySize']
    totalComputeGBSecs = totalComputeSeconds * (memSize/1024)
    cost = totalComputeGBSecs*price
    row.append({
        'ds': datetime.datetime.fromisoformat(parsed['@timestamp']),
        **parsed2,
        'cost': cost
    })

df = pd.DataFrame(row)
df.head()
```















