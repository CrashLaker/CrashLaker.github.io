---
layout: post
title: "Install OHPC"
comments: true
date: "2020-04-27 03:46:20.555000+00:00"
categories:  [hpc]
tags:  [openhpc, ohpc, hpc]
---



Simple
```bash

```


```bash
yum -y install http://build.openhpc.community/OpenHPC:/1.3/updates/CentOS_7/x86_64/ohpc-release-1.3-2.el7.x86_64.rpm

#Development Tools
yum -y install ohpc-autotools EasyBuild-ohpc hwloc-ohpc spack-ohpc valgrind-ohpc

# FOSS Compilers
#yum -y install gnu-compilers-ohpc gnu7-compilers-ohpc llvm4-compilers-ohpc llvm5-compilers-ohpc
yum -y install gnu-compilers-ohpc gnu7-compilers-ohpc llvm5-compilers-ohpc

# MPI Stacks with GNU (OpenMPI)
yum -y install openmpi3-gnu7-ohpc mpich-gnu7-ohpc openmpi-gnu-ohpc openmpi-gnu7-ohpc mpich-gnu-ohpc mvapich2-gnu-ohpc mvapich2-gnu7-ohpc

# Performance Tools
yum -y install ohpc-gnu7-perf-tools

# Default LMOD
yum -y install lmod-defaults-gnu7-openmpi3-ohpc

# 3rd parties
yum -y install ohpc-gnu7-io-libs ohpc-gnu7-mpich-parallel-libs ohpc-gnu7-mvapich2-parallel-libs x ohpc-gnu7-parallel-libs ohpc-gnu7-perf-tools ohpc-gnu7-python-libs ohpc-gnu7-runtimes ohpc-gnu7-serial-libs

#Compiler Intel and Libs:

# MPI Stacks with Intel
#yum -y install intel-compilers-devel-ohpc intel-mpi-devel-ohpc

# MPI Stacks with Intel
#yum -y install openmpi3-intel-ohpc openmpi-intel-ohpc mpich-intel-ohpc mvapich2-intel-ohpc

# Performance Tools
#yum -y install ohpc-intel-perf-tools

# 3rd parties
#yum -y install ohpc-intel-io-libs ohpc-intel-mpich-parallel-libs ohpc-intel-mvapich2-parallel-libs ohpc-intel-openmpi3-parallel-libs ohpc-intel-impi-parallel-libs ohpc-intel-perf-tools ohpc-intel-python-libs ohpc-intel-runtimes ohpc-intel-serial-libs

```
