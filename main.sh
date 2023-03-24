#!/bin/bash

main() {

file=$1
while read line; do
  eval $line

done <example.txt

}

main