import { providers, Contract, BigNumber } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Dispatch, AMM, Provider, IERC20 } from "../types/interactionTypes";
type ContractRunner = any;
export declare const loadProvider: (dispatch: Dispatch) => providers.Web3Provider;
export declare const loadNetwork: (provider: Web3Provider, dispatch: Dispatch) => Promise<number>;
export declare const loadAccount: (dispatch: Dispatch) => Promise<string>;
export declare const loadTokens: (provider: ContractRunner, chainId: number, dispatch: Dispatch) => Promise<void>;
export declare const loadAMM: (provider: ContractRunner, chainId: number, dispatch: Dispatch) => Promise<Contract>;
export declare const loadBalances: (amm: AMM, tokens: IERC20[], account: string, dispatch: Dispatch) => Promise<void>;
export declare const addLiquidity: (provider: Provider, amm: AMM, tokens: IERC20[], amount1: BigNumber, amount2: BigNumber, dispatch: Dispatch) => Promise<void>;
export declare const removeLiquidity: (provider: Web3Provider, amm: AMM, shares: BigNumber, dispatch: Dispatch) => Promise<void>;
export declare const swap: (provider: Provider, amm: AMM, tokenGive: IERC20, tokenGet: IERC20, amount: BigNumber, dispatch: Dispatch) => Promise<void>;
export declare const loadAllSwaps: (provider: Web3Provider, amm: AMM, dispatch: Dispatch) => Promise<void>;
export {};
//# sourceMappingURL=interactions.d.ts.map