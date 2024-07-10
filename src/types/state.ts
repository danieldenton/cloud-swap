export interface ProviderState {
    connection: any;
    chainId: number;
    account: string;
  }
  
  export interface TokensState {
    contracts: any;
    symbols: string[];
    balances: number[];
  }

  interface Depositing {
    isDepositing: boolean,
    isSuccess: boolean,
    transactionHash: string
  }
  
  interface Swapping {
    isSwapping: boolean;
    isSuccess: boolean;
    transactionHash: string;
  }
  
  interface Withdrawing {
    isWithdrawing: boolean;
    isSuccess: boolean;
    transactionHash: string;
  }
  
  export interface AMMState {
    contract: any;
    shares: number;
    swapping: Swapping;
    withdrawing: Withdrawing;
    depositing: Depositing
  }
  
  interface Addresses {
    rump: { address: string };
    usd: { address: string };
    bloodMoonSwap: { address: string };
    cloudSwap: { address: string };
    dexAggregator: { address: string };
  }
  
  export interface Config {
    [key: number]: Addresses;
  }
  
  export interface RootState {
    provider: ProviderState;
    tokens: TokensState;
    amm: AMMState;
  }
  