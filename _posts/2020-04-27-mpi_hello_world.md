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

int main(int argc, char** argv) {
    // Initialize the MPI environment
    MPI_Init(NULL, NULL);

    // Get the number of processes
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    // Get the rank of the process
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

    // Get the name of the processor
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    int name_len;
    MPI_Get_processor_name(processor_name, &name_len);

    // Print off a hello world message
    printf("Hello world from processor %s, rank %d out of %d processors\n",
           processor_name, world_rank, world_size);

    printf("Init Recv\n");
    int a;
    MPI_Recv(&a, 1, MPI_INT, 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    printf("ok\n");

    // Finalize the MPI environment.
    MPI_Finalize();
}

```