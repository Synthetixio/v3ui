#!/bin/bash

set -a 
source .env
set +a

echo "Loaded Environment Variables:"
env | grep "INFURA"
env | grep "BOARDROOM"
env | grep "WC_"