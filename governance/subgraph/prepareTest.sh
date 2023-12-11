#!/bin/bash

# we need the node_modules folder in the same dir as we spin up the docker container
# otherwise the test can not find the binaries

DIR="./node_modules/"
if [ -d "$DIR" ]; then
  eoch ""
  echo "node_modules dir found in subgraph directory, proceed with test "
  eoch ""
else
 cp -R ../../node_modules/ ./node_modules
fi