import { BigNumber } from "ethers";
export type Dispatch = (action: any) => void;
export type Provider = {
    getNetwork: () => Promise<{
        chainId: number;
    }>;
    getSigner: () => Promise<{
        address: string;
    }>;
};
interface AMMConnect {
    swapToken(tokenGive: string, tokenGet: string, amount: BigNumber): Promise<any>;
    addLiquidity(amount1: BigNumber, amount2: BigNumber): Promise<any>;
    removeLiquidity(shares: BigNumber): Promise<any>;
}
export type AMM = {
    address: string;
    shares: (address: string) => Promise<number>;
    queryFilter(event: string, num: number, block: number): Promise<any>;
    connect: (signer: any) => AMMConnect;
};
interface IERC20Connect {
    approve: (spender: string, amount: string) => Promise<boolean>;
}
export interface IERC20 {
    address: string;
    connect: (signer: {
        address: string;
    }) => IERC20Connect;
    balanceOf: (account: string) => Promise<number>;
}
export {};
//# sourceMappingURL=interactionTypes.d.ts.map