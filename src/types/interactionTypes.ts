import { BigNumber } from "ethers";
export type Dispatch = (action: any) => void;

export type Provider = {
  getNetwork: () => Promise<{ chainId: number }>;
  getSigner: () => Promise<{ address: string }>;
};

interface AMMConnect {
  swapToken(tokenGive: string, tokenGet: string, amount: bigint): Promise<any>;
  addLiquidity(amount1: bigint, amount2: bigint): Promise<any>;
  removeLiquidity(shares: bigint): Promise<any>;
}

export type AMM = {
  address: string;
  shares: (address: string) => Promise<number>;
  queryFilter(event: string, num: number, block: number): Promise<any>;
  connect: (signer: any) => AMMConnect;
};

interface IERC20Connect {
  approve: (spender: string, amount: bigint) => Promise<boolean>;
}

export interface IERC20 {
  address: string;
  connect: (signer: { address: string }) => IERC20Connect;
  balanceOf: (account: string) => Promise<number>;
}
