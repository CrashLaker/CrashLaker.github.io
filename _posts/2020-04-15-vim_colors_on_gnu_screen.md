---
layout: post
title: "VIM Colors on GNU Screen"
comments: true
date: "2020-04-15 20:27:06.465000+00:00"
categories:  [productivity]
tags:  [vim,screen,bash]
---




https://askubuntu.com/questions/24712/retaining-bash-prompt-colors-when-starting-a-screen-session

Thank you @djeikyb

`jake@daedalus:~$ cat .screenrc`
```bash
startup_message off # skip splash screen
vbell off # Kill the annoying dog

# Voodoo
hardstatus alwayslastline
hardstatus string '%{= wk}%-Lw%{= KW}%50>%n%f* %t%{= dK}%+Lw%<'

# terminfo and termcap for nice 256 color terminal
# allow bold colors - necessary for some reason
attrcolor b ".I" 
# tell screen how to set colors. AB = background, AF=foreground
termcapinfo xterm 'Co#256:AB=\E[48;5;%dm:AF=\E[38;5;%dm'
# erase background with current bg color 
defbce "on"
```