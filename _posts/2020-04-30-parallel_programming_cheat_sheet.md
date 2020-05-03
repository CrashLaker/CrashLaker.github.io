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
int main(){
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
    for (j = 0; j < size; j++){
        pthread_join(tid[j], NULL);
    }
}

void *foo(void *arg){
    int tid;
    tid=*((int*) arg);
    printf("threadid %d spawned\n", tid);
}
```

## Pthread passing more than 1 argument (multiple arguments)
```c
struct arg_struct{
    int arg1;
    int arg2;
};

int main(){
    int size = 100;
    tid=(pthread_t *) calloc(size,sizeof(pthread_t));
    for (j = 0; j < size; j++){
        struct arg_struct_args;
        args.arg1 = 1;
        args.arg2 = i;
        if (pthread_create(&tid[j], NULL, foo, (void*) &args)){
            printf("Cannot create thread %d\n",i);
            exit(1);
        }
    }
    for (j = 0; j < size; j++){
        pthread_join(tid[j], NULL);
    }
}

void *foo(void *arg){
    struct arg_struct *args = (struct arg_struct *) arg;
    int a = args->arg1;
    int b = args->arg2;
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


