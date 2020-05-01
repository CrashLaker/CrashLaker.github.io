---
layout: post
title: "Golang Cheat Sheet"
categories: [programming]
tags: [golang]
comments: true
date: "2020-04-14 03:55:21.892000+00:00"
---

https://www.reddit.com/r/golang/comments/b0gro0/most_efficient_method_for_maintaining_a_sorted/

```go
package main

import (
	"fmt"
	"sort"
)

func InsertSorted(s []int, e int) []int {
	i := sort.Search(len(s), func(i int) bool { return s[i] > e })
	s = append(s, 0)
	copy(s[i+1:], s[i:])
	s[i] = e
	return s
}   

func main() {
	s := []int{1,2,3,4,6,7,8,9}
	s = InsertSorted(s,5)
	fmt.Println(s)
}
```



```go
package main

import "fmt"

func main() {

	s := []int{1,2,3,4,5,6,7,8,9,10}
	fmt.Println(s)
	
	
	s = append(s,0)
	fmt.Println(s)
	copy(s[6:], s[5:])
	
	fmt.Println(s)
}
[1 2 3 4 5 6 7 8 9 10]
[1 2 3 4 5 6 7 8 9 10 0]
copy(s[6:], s[5:])
[1 2 3 4 5 6 6 7 8 9 10]
copy(s[1:], s[0:])
[1 1 2 3 4 5 6 7 8 9 10]
```

