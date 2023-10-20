#!/usr/bin/env bash

set -u
# Check if INFURA_KEY is set
if [[ -z "${INFURA_KEY}" ]]; then
  echo "Error: INFURA_KEY is not set."
  exit 1
fi

fetch() {
  export CHAIN_NAME=$1
  echo CHAIN_NAME=$CHAIN_NAME

  export CANNON_PACKAGE=$2
  echo CANNON_PACKAGE=$CANNON_PACKAGE

  export CANNON_PRESET=$3
  echo CANNON_PRESET=$CANNON_PRESET

  export DEBUG="cannon:*"

  export CHAIN_ID_HEX=$(curl -s -X POST  -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_chainId"}' "https://$CHAIN_NAME.infura.io/v3/$INFURA_KEY" | jq -r '.result')
  echo CHAIN_ID_HEX=$CHAIN_ID_HEX

  export CHAIN_ID=$(node -e "process.stdout.write(parseInt('$CHAIN_ID_HEX', 16).toString())")
  echo CHAIN_ID=$CHAIN_ID

  rm -rf ./deployments/$CHAIN_NAME
  echo "yarn cannon inspect $CANNON_PACKAGE --preset $CANNON_PRESET --chain-id $CHAIN_ID --write-deployments ./deployments/$CHAIN_NAME"
  yarn cannon inspect $CANNON_PACKAGE --preset $CANNON_PRESET --chain-id $CHAIN_ID --write-deployments ./deployments/$CHAIN_NAME
}

fetch mainnet synthetix:latest main
fetch goerli synthetix:latest main
fetch sepolia synthetix:latest main
fetch optimism-mainnet synthetix:latest main
fetch optimism-goerli synthetix:latest main
fetch base-goerli synthetix:latest competition
