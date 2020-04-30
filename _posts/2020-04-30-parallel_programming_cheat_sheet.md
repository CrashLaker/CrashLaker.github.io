---
layout: post
title: "Parallel Programming Cheat Sheet"
comments: true
date: "2020-04-30 03:28:09.043000+00:00"
categories:  [programming]
tags:  [cheat-sheet, parallel-programming, c, pthreads, mpi, openmp]
---




## Spawn a Single Thread
```c
pthread_t tid;
if (pthread_create(&tid, NULL, thread_f, NULL)){
    printf("Cannot create thread %d\n",i);
    exit(1);
}

void thread_f(){

}
```

## Pthread loop spawn




