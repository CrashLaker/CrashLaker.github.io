---
layout: post
title: "Mount Google Drive Linux"
comments: true
date: "2020-08-19 04:24:27.840000+00:00"
categories:  [gdrive]
tags:  [linux, google-drive, mount]
---





https://uhi.site/index.php/archives/20/

```bash
yum -y install patch unzip perl xauth firefox
yum -y install sqlite-devel fuse fuse-devel libcurl-devel zlib-devel m4 gmp-devel 
yum -y install ocaml ocamldoc ocaml-camlp4-devel
curl https://raw.githubusercontent.com/ocaml/opam/master/shell/opam_installer.sh | sh -s /usr/local/bin/

yes | opam init
opam install -y google-drive-ocamlfuse
```

Add to .bashrc
`export PATH="/root/.opam/system/bin:$PATH"`

`google-drive-ocamlfuse`

Login to your google account

`google-drive-ocamlfuse /<path>`

`google-drive-ocamlfuse -debug`