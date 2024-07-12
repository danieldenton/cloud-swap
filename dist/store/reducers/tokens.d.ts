export declare const tokens: import("@reduxjs/toolkit").Slice<{
    contracts: never[];
    symbols: never[];
    balances: number[];
}, {
    setContracts: (state: import("immer/dist/internal").WritableDraft<{
        contracts: never[];
        symbols: never[];
        balances: number[];
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    setSymbols: (state: import("immer/dist/internal").WritableDraft<{
        contracts: never[];
        symbols: never[];
        balances: number[];
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    balancesLoaded: (state: import("immer/dist/internal").WritableDraft<{
        contracts: never[];
        symbols: never[];
        balances: number[];
    }>, action: {
        payload: any;
        type: string;
    }) => void;
}, "tokens">;
export declare const setContracts: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "tokens/setContracts">, setSymbols: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "tokens/setSymbols">, balancesLoaded: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "tokens/balancesLoaded">;
declare const _default: import("redux").Reducer<{
    contracts: never[];
    symbols: never[];
    balances: number[];
}>;
export default _default;
//# sourceMappingURL=tokens.d.ts.map