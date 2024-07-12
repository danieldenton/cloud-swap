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
    isDepositing: boolean;
    isSuccess: boolean;
    transactionHash: string;
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
export interface Swap {
    hash: string;
    rate: any;
    args: {
        swapCaller: string;
        tokenGive: string;
        tokenGet: string;
        tokenGiveAmount: string;
        tokenGetAmount: string;
        timestamp: number;
        token1Balance: number;
        token2Balance: number;
    };
}
export interface AMMState {
    contract: any;
    shares: number;
    swaps: Swap[];
    swapping: Swapping;
    withdrawing: Withdrawing;
    depositing: Depositing;
}
interface Addresses {
    rump: {
        address: string;
    };
    usd: {
        address: string;
    };
    bloodMoonSwap: {
        address: string;
    };
    cloudSwap: {
        address: string;
    };
    dexAggregator: {
        address: string;
    };
}
export interface Config {
    [key: number]: Addresses;
}
export interface RootState {
    provider: ProviderState;
    tokens: TokensState;
    amm: AMMState;
}
export {};
//# sourceMappingURL=state.d.ts.map