---
layout: post
title: "C Hello World"
comments: true
date: "2020-05-02 22:56:20.228000+00:00"
categories:  [programming]
tags:  [c, helloworld]
---



```c
#include <stdio.h>
#include <stdlib.h>


int main() {
    
    
    printf("Hello World\n");
    return 0;
}
```


```bash
gcc hello.c -o hello
./hello
```

```bash
cat > hello.c <<EOF
#include <stdio.h>
#include <stdlib.h>


int main() {
    
    
    printf("Hello World\n");
    return 0;
}
EOF


cat > cmd <<EOF
gcc hello.c -o hello
./hello
EOF

chmod +x cmd
```