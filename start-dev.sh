#!/bin/bash


img="crashlaker-jekyll-dev"
port_s=4000
port_l=4001

docker rm -f ${img}
docker run -dit \
    --name ${img} \
    -v `pwd`:/folder \
    -p ${port_s}:4000 \
    -p ${port_l}:4001 \
    jekyll/jekyll bash -c "
    cd /folder
    bundle install
    jekyll serve -l --livereload_port 4001
    "



