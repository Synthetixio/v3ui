# Accessing Synthetix V3 through Decentralized Frontends

Explore various methods to access the Synthetix V3 UI via decentralized frontends. The method you choose may depend on
your technical proficiency and preferences:

## 1. Brave Browser

- Navigate to [liquidity.synthetix.eth](http://liquidity.synthetix.eth/) using Brave Browser.
- Brave will automatically route you via their public gateway.
- For additional details, check out [Brave's IPFS Support page](https://brave.com/ipfs-support/).

## 2. Eth Limo

- Access via [liquidity.synthetix.eth.limo](https://liquidity.synthetix.eth.limo/) using any browser.
- Eth Limo acts as a privacy-centric ENS gateway, resolving Ethereum Name Service (ENS) records and the corresponding IPFS/IPNS/Skynet content (Web 3.0). This gateway simplifies access and hosting of static sites built with a mix of IPFS/IPNS/Arweave and ENS for both users and dApp developers.
- Learn more about Eth Limo at [https://eth.limo/](https://eth.limo/).

## 3. Run the Synthetix IPFS Node

- Download and run the [Synthetix IPFS Node](https://github.com/Synthetixio/synthetix-node?ref=blog.synthetix.io) to
  connect to the IPFS cluster.
- Once the IPFS node is running, you'll be able to access the V3 UI along with various ecosystem frontends.
- Running a Synthetix IPFS Node allows you to directly contribute to the decentralization, reliability, performance, and
  censorship-resistance of the frontends within the Synthetix Ecosystem.
- Download the node and learn more on [GitHub](https://github.com/Synthetixio/synthetix-node?ref=blog.synthetix.io).

## 4. Locally (Recommended for Technical Users)

- Make sure you have NodeJS available

  ```sh
  node -v
  v18.18.0
  yarn -v
  ```

- Clone the V3 UI repository

  ```sh
  git clone git@github.com:Synthetixio/v3ui.git
  cd v3ui
  ```

- Check you have `yarn` installed

  ```sh
  yarn -v
  3.6.0

  # if not available, install it globally with npm:
  npm install -g yarn
  ```

- Install dependencies

  ```sh
  yarn install
  ```

- Run local dev server
  ```sh
  yarn workspace "@snx-v3/liquidity" start
  ```
