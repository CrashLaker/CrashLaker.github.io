#!/bin/bash


img="crashlaker-jekyll-dev"
port=4000

docker rm -f crash
docker run -dit \
    --name ${img} \
    -v `pwd`:/folder \
    -p ${port}:4000 \
    jekyll/jekyll bash -c "
    cd /folder
    bundle install
    jekyll serve -l
    "



