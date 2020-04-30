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
if (pthread_create(&tid, NULL, bar, NULL)){
    printf("Cannot create thread %d\n",i);
    exit(1);
}

void bar(){

}
```

## Pthread loop spawn
```c
int size = 100;
tid=(pthread_t *) calloc(size,sizeof(pthread_t));
for (j = 0; j < size; j++){
    int *arg = malloc(sizeof(*arg));
    *arg = j;
    if (pthread_create(&tid[j], NULL, foo, arg)){
        printf("Cannot create thread %d\n",i);
        exit(1);
    }
}
```

## MPI_Send static array
```c
int table[100];
...
int i,j;

if (rank == 0){
    for (i = 0 ; i < 100; i++){
        table[i] = i;
    }
    MPI_Send(&table, 100, MPI_INT, 1, 0, MPI_COMM_WORLD);
}

if (rank == 1){
    MPI_Status status;
    MPI_Recv(&table, 100, MPI_INT, 0, 0, MPI_COMM_WORLD, &status);
    for (i = 0 ; i < 100; i++){
        printf("%d\n", table[i]);
    }
}
```


