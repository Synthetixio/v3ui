#!/bin/bash

set -a 
source .env
set +a

echo "Loaded Environment Variables:"
env | grep "NEXT"