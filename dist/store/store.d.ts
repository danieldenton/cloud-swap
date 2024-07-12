export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    provider: {
        connection: null;
        chainId: null;
        account: null;
    };
    tokens: {
        contracts: never[];
        symbols: never[];
        balances: number[];
    };
    amm: {
        contract: null;
        shares: number;
        swaps: never[];
        depositing: {
            isDepositing: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
        swapping: {
            isSwapping: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
        withdrawing: {
            isWithdrawing: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
    };
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<{
    provider: {
        connection: null;
        chainId: null;
        account: null;
    };
    tokens: {
        contracts: never[];
        symbols: never[];
        balances: number[];
    };
    amm: {
        contract: null;
        shares: number;
        swaps: never[];
        depositing: {
            isDepositing: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
        swapping: {
            isSwapping: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
        withdrawing: {
            isWithdrawing: boolean;
            isSuccess: boolean;
            transactionHash: null;
        };
    };
}, import("redux").AnyAction>]>>;
//# sourceMappingURL=store.d.ts.map