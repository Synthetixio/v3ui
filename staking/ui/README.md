
# ****Accessing Synthetix V3 through Decentralized Frontends****

Explore various methods to access the Synthetix V3 UI via decentralized frontends. The method you choose may depend on your technical proficiency and preferences:

### ****1. Brave Browser****

-   Navigate to [liquidity.synthetix.eth](http://liquidity.synthetix.eth/) using Brave Browser.
-   Brave will automatically route you via their public gateway.
-   For additional details, check out [Brave's IPFS Support page](https://brave.com/ipfs-support/).

### ****2. Run the Synthetix IPFS Node****

-   Download and run the [Synthetix IPFS Node](https://github.com/Synthetixio/synthetix-node?ref=blog.synthetix.io) to connect to the IPFS cluster.
-   Once the IPFS node is running, you'll be able to access the V3 UI along with various ecosystem frontends.
-   Running a Synthetix IPFS Node allows you to directly contribute to the decentralization, reliability, performance, and censorship-resistance of the frontends within the Synthetix Ecosystem.
-   Download the node and learn more on [GitHub](https://github.com/Synthetixio/synthetix-node?ref=blog.synthetix.io).

### ****3. Locally (Recommended for Technical Users)****

-  Clone the V3 UI repository and run it locally. See the steps below for details:

> npx cannon synthetix-periphery:1.0.0 --fund-addresses 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
> 
>yarn start
>
>You may need to "reset account" in MetaMask in subsequent development sessions.

