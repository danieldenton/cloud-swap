import { RootState, Swap } from "../types/state";
export declare const chartSelector: ((state: RootState) => {
    swaps: Swap[];
    series: {
        name: string;
        data: any[];
    }[];
} | undefined) & import("reselect").OutputSelectorFields<(args_0: Swap[], args_1: any) => {
    swaps: Swap[];
    series: {
        name: string;
        data: any[];
    }[];
} | undefined, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
//# sourceMappingURL=selectors.d.ts.map