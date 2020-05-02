---
layout: post
title: "Query PostgreSQL Python"
categories: [recipe]
tags: [python, postgresql]
comments: true
date: "2020-04-13 00:22:27.183000+00:00"
---



### Ubuntu
```bash
apt update
apt install libpq-dev -y
pip3 install psycopg2
```


### CentOS
```bash
yum check-update
yum install -y postgres postgres-devel gcc
pip3 install psycopg2
``` 


### Python
```python
import psycopg2

conn = psycopg2.connect(host="",
                        database="",
                        user="",
                        password="")

cur = conn.cursor()
```

Listing all tables:
```python
cur.execute("""
SELECT
    *
FROM
    pg_catalog.pg_tables
WHERE
    schemaname != 'pg_catalog'
AND schemaname != 'information_schema';
""")
```

Columns `cur.description`
```
(Column(name='schemaname', type_code=19),
 Column(name='tablename', type_code=19),
 Column(name='tableowner', type_code=19),
 Column(name='tablespace', type_code=19),
 Column(name='hasindexes', type_code=16),
 Column(name='hasrules', type_code=16),
 Column(name='hastriggers', type_code=16),
 Column(name='rowsecurity', type_code=16))
 ```
 
 Rows: `cur.fetchall()`
 ```
[('public', 'SequelizeMeta', 'codimd', None, True, False, False, False),
 ('public', 'Temp', 'codimd', None, True, False, False, False),
 ('public', 'Notes', 'codimd', None, True, False, False, False),
 ('public', 'Revisions', 'codimd', None, True, False, False, False),
 ('public', 'Authors', 'codimd', None, True, False, False, False),
 ('public', 'Users', 'codimd', None, True, False, False, False),
 ('public', 'Temps', 'codimd', None, True, False, False, False),
 ('public', 'Sessions', 'codimd', None, True, False, False, False)] 
 ```
 
```python
import pandas as pd
cols = [_.name for _ in cur.description]
rows = cur.fetchall()
df = pd.DataFrame(rows)
df.columns = cols
```







