---
layout: post
title: "Database Diagram with Python SQLAlchemy"
comments: true
date: "2020-05-13 13:31:24.614000+00:00"
categories:  [database]
tags:  [python, sqlalchemy, diagram]
---




```bash
pip install pymysql sqlalchemy sqlalchemy_schemadisplay

```

```python
#!python
from sqlalchemy import MetaData
from sqlalchemy_schemadisplay import create_schema_graph

# create the pydot graph object by autoloading all tables via a bound metadata object
graph = create_schema_graph(metadata=MetaData('postgres://user:pwd@host/database'),
   show_datatypes=False, # The image would get nasty big if we'd show the datatypes
   show_indexes=False, # ditto for indexes
   rankdir='LR', # From left to right (instead of top to bottom)
   concentrate=False # Don't try to join the relation lines together
)
graph.write_png('dbschema.png') # write out the file
```

![](/assets/img/q0QoSkcHx_b98c04df225b8275fe13d85dd931c91d.png)

```python
from myapp import model
from sqlalchemy_schemadisplay import create_uml_graph
from sqlalchemy.orm import class_mapper

# lets find all the mappers in our model
mappers = []
for attr in dir(model):
    if attr[0] == '_': continue
    try:
        cls = getattr(model, attr)
        mappers.append(class_mapper(cls))
    except:
        pass

# pass them to the function and set some formatting options
graph = create_uml_graph(mappers,
    show_operations=False, # not necessary in this case
    show_multiplicity_one=False # some people like to see the ones, some don't
)
graph.write_png('schema.png') # write out the file
```

![](/assets/img/q0QoSkcHx_ec39756aab9f49986ee3155dd994a683.png)


https://stackoverflow.com/questions/44981986/sqlalchemy-er-diagram-in-python-3/46020917
https://github.com/sqlalchemy/sqlalchemy/wiki/SchemaDisplay