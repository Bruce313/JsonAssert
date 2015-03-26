package main

import (
	"fmt"
	"io/ioutil"
	"os"
)


func main () {
	const PATH := "./data.json"
	fi, err := os.Open(PATH)
	defer fi.Close()

	if (nil != err) {
		panic(err)
	}

	fd, err := ioutil.ReadAll(fi)
	fmt.Println(string(fd))
}