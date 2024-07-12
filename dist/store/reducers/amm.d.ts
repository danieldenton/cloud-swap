export declare const amm: import("@reduxjs/toolkit").Slice<{
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
}, {
    setContract: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    sharesLoaded: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    swapsLoaded: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    depositRequest: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
    depositSuccess: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    depositFail: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
    swapRequest: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
    swapSuccess: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    swapFail: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
    withdrawRequest: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
    withdrawSuccess: (state: import("immer/dist/internal").WritableDraft<{
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
    }>, action: {
        payload: any;
        type: string;
    }) => void;
    withdrawFail: (state: import("immer/dist/internal").WritableDraft<{
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
    }>) => void;
}, "amm">;
export declare const setContract: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/setContract">, sharesLoaded: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/sharesLoaded">, swapsLoaded: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/swapsLoaded">, depositRequest: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/depositRequest">, depositSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/depositSuccess">, depositFail: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/depositFail">, swapRequest: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/swapRequest">, swapSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/swapSuccess">, swapFail: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/swapFail">, withdrawRequest: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/withdrawRequest">, withdrawSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "amm/withdrawSuccess">, withdrawFail: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"amm/withdrawFail">;
declare const _default: import("redux").Reducer<{
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
}>;
export default _default;
//# sourceMappingURL=amm.d.ts.map