#!/bin/bash

folder_from=/root/codeserver_playground/horizon-demo/dist/
folder_to=horizon-demo
rsync -avz --delete codeserver:${folder_from} ${folder_to}


