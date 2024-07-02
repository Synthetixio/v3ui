declare module '@snx-v3/contracts' {
  // Contracts
  export function importAllErrors(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importCoreProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importAccountProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importUSDProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importOracleManagerProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importMulticall3(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;
  export function importRewardDistributor(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importSpotMarketProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importPerpsMarketProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importPerpsAccountProxy(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  export function importPythERC7412Wrapper(
    chainId?: number,
    preset?: string
  ): Promise<{ address: string; abi: string[] }>;

  // Deployment extras
  export function importExtras(
    chainId?: number,
    preset?: string
  ): Promise<{
    [key: string]: string;
  }>;

  export function importCollateralTokens(
    chainId?: number,
    preset?: string
  ): Promise<
    {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      depositingEnabled: boolean;
      issuanceRatioD18: string;
      liquidationRatioD18: string;
      liquidationRewardD18: string;
      oracleNodeId: string;
      tokenAddress: string;
      minDelegationD18: string;
    }[]
  >;

  export function importMintableTokens(
    chainId?: number,
    preset?: string
  ): Promise<
    {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
    }[]
  >;

  export function importRewardsDistributors(
    chainId?: number,
    preset?: string
  ): Promise<
    {
      address: string;
      name: string;
      poolId: string;
      collateralType: {
        address: string;
        symbol: string;
        name: string;
        decimals: number;
      };
      payoutToken: {
        address: string;
        symbol: string;
        name: string;
        decimals: number;
      };
      rewardManager: string;
      isRegistered: boolean;
    }[]
  >;

  export function importSynthTokens(
    chainId?: number,
    preset?: string
  ): Promise<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
  }>;

  export function importSystemToken(
    chainId?: number,
    preset?: string
  ): Promise<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
  }>;
}
