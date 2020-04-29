---
layout: post
title: "MPI Hello World"
comments: true
date: "2020-04-27 04:22:47.480000+00:00"
categories:  [hpc]
tags:  [mpi]
---


```bash
$ mpirun --allow-run-as-root --oversubscribe -n 2 ./a.out
Hello world from processor docker, rank 0 out of 2 processors
Init Recv
Hello world from processor docker, rank 1 out of 2 processors
Init Recv
```

```bash
#!/bin/bash

mpicc main.c -o main
mpirun --allow-run-as-root --oversubscribe -n 2 main
```

```c
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#define VERBOSE 1
char hostname[1000];
#define VB(a) if (VERBOSE) { printf("[%s] ", hostname); printf a ; fflush(stdout); }


int main(int argc, char** argv) {

    int provided;
    // Initialize the MPI environment
    MPI_Init(NULL, NULL);
    //MPI_Init_thread( 0, 0, MPI_THREAD_MULTIPLE, &provided );
    //VB(("provided %d\n", provided)); // 3

    // Get the number of processes
    int size;
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Get the rank of the process
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Get the name of the processor
    int name_len;
    MPI_Get_processor_name(hostname, &name_len);

    // Print off a hello world message
    printf("Hello world from processor %s, rank %d out of %d processors\n",
           hostname, rank, size);

    // Finalize the MPI environment.
    MPI_Finalize();
}

```