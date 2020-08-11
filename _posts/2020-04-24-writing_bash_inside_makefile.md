---
layout: post
title: "Writing bash inside Makefile"
comments: true
date: "2020-04-24 04:40:23.565000+00:00"
categories:  [linux]
tags:  [makefile, bash]
---



https://stackoverflow.com/questions/10121182/multiline-bash-commands-in-makefile


```bash
test:
        ports=(8090 8091 8092 8093); \
        for p in $${ports[@]}; \
        do \
                curl localhost:$$p; \
                echo ""; \
        done;
```

```
# make test
ports=(8090 8091 8092 8093); \
for p in ${ports[@]}; \
do \
        curl localhost:$p; \
        echo ""; \
done;
hello world port 9000 sleep 1
hello world port 9001 sleep 2
hello world port 9000 sleep 1
hello world from monitor
```



```bash
foo:
    for i in `find`;     \
    do                   \
        all="$$all $$i"; \
    done;                \
    gcc $$all
```

1. Escape the script's use of $ by replacing with $$
2. Convert the script to work as a single line by inserting ; between commands
3. If you want to write the script on multiple lines, escape end-of-line with \
4. Optionally start with set -e to match make's provision to abort on sub-command failure
5. This is totally optional, but you could bracket the script with () or {} to emphasize the cohesiveness of a multiple line sequence -- that this is not a typical makefile command sequence
Here's an example inspired by the OP:

```bash
mytarget:
    { \
    set -e ;\
    msg="header:" ;\
    for i in $$(seq 1 3) ; do msg="$$msg pre_$${i}_post" ; done ;\
    msg="$$msg :footer" ;\
    echo msg=$$msg ;\
    }
```