export declare const provider: import("@reduxjs/toolkit").Slice<{
    connection: null;
    chainId: null;
    account: null;
}, {
    setProvider: (state: import("immer/dist/internal").WritableDraft<{
        connection: null;
        chainId: null;
        account: null;
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    setNetwork: (state: import("immer/dist/internal").WritableDraft<{
        connection: null;
        chainId: null;
        account: null;
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    setAccount: (state: import("immer/dist/internal").WritableDraft<{
        connection: null;
        chainId: null;
        account: null;
    }>, action: {
        payload: any;
        type: string;
    }) => void;
}, "provider">;
export declare const setProvider: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "provider/setProvider">, setNetwork: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "provider/setNetwork">, setAccount: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "provider/setAccount">;
declare const _default: import("redux").Reducer<{
    connection: null;
    chainId: null;
    account: null;
}>;
export default _default;
//# sourceMappingURL=provider.d.ts.map