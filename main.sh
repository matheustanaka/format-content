#!/bin/bash

main() {

file=$1
while read line; do
  echo $line

done <example.txt

}

main