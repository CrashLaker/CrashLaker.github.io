---
layout: post
title: "Jekyll Dev platform"
comments: true
date: "2020-04-18 17:37:05.353000+00:00"
categories:  [devtools]
tags:  [jekyll, docker]
---



```bash
docker rm -f jekyll
docker run -dit \
    --name jekyll \
    -v /<jekyll folder>/:/folder \
    --net=host \
    jekyll/jekyll bash
```

`docker exec -it jekyll bash`

```bash
bundle install
jekyll serve -l
```

or 

`docker exec -dit jekyll bash -c "cd /folder; bundle install;nohup jekyll serve -l > /dev/null 2>&1"`

