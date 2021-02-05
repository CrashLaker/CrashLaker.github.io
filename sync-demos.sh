#!/bin/bash

folder_from=/root/codeserver_playground/horizon-demo/dist/
folder_to=horizon-demo
rsync -avz --delete codeserver:${folder_from} ${folder_to}

folder_from=/root/codeserver_vuepress-grafana-horizon/grafana-horizon/grafana-horizon/
folder_to=grafana-horizon
rsync -avz --delete codeserver:${folder_from} ${folder_to}

