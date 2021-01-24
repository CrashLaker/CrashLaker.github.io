---
layout: post
title: "JupyterLab add vim bindings"
comments: true
date: "2020-04-19 15:34:10.705000+00:00"
categories:  [productivity]
tags:  [jupyterlab, vim]
---



https://github.com/jwkvam/jupyterlab-vim/issues/17

```bash
git clone https://github.com/jwkvam/jupyterlab-vim.git

git checkout v0.10.1

edit src/index.ts

lvim.map('kj', '<Esc>', 'insert')

jlpm install

jlpm run build

jupyter labextension link .
```