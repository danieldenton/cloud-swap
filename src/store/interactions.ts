import { ethers, BigNumber } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { setProvider, setNetwork, setAccount } from "./reducers/provider.ts";
import { setContracts, setSymbols, balancesLoaded } from "./reducers/tokens.ts";
import {
  setContract,
  sharesLoaded,
  swapsLoaded,
  depositRequest,
  depositSuccess,
  depositFail,
  swapRequest,
  swapSuccess,
  swapFail,
  withdrawRequest,
  withdrawSuccess,
  withdrawFail,
} from "./reducers/amm.ts";
import TOKEN_ABI from "../abis/Token.json";
import AMM_ABI from "../abis/AMM.json";
import { Dispatch, AMM, Provider, IERC20 } from "../types/interactionTypes";
import config from "../config.json";

export const loadProvider = (dispatch: Dispatch) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(setProvider(provider));
  return provider;
};
export const loadNetwork = async (
  provider: Web3Provider,
  dispatch: Dispatch
) => {
  const { chainId } = await provider.getNetwork();
  dispatch(setNetwork(chainId));
  return chainId;
};

export const loadAccount = async (dispatch: Dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch(setAccount(account));
  return account;
};

export const loadTokens = async (
  provider: Web3Provider,
  chainId: number,
  dispatch: Dispatch
) => {
  const rump = new ethers.Contract(
    config[chainId].rump.address,
    TOKEN_ABI,
    provider
  );
  const usd = new ethers.Contract(
    config[chainId].usd.address,
    TOKEN_ABI,
    provider
  );
  dispatch(setContracts([rump, usd]));
  dispatch(setSymbols([await rump.symbol(), await usd.symbol()]));
};

export const loadAMM = async (
  provider: Web3Provider,
  chainId: number,
  dispatch: Dispatch
) => {
  const amm = new ethers.Contract(
    config[chainId].amm.address,
    AMM_ABI,
    provider
  );
  dispatch(setContract(amm));
  return amm;
};

export const loadBalances = async (
  amm: AMM,
  tokens: IERC20,
  account: string,
  dispatch: Dispatch
) => {
  const balance1 = await tokens[0].balanceOf(account);
  const balance2 = await tokens[1].balanceOf(account);
  dispatch(
    balancesLoaded([
      ethers.utils.formatUnits(balance1.toString(), "ether"),
      ethers.utils.formatUnits(balance2.toString(), "ether"),
    ])
  );

  const shares = await amm.shares(account);
  dispatch(sharesLoaded(ethers.utils.formatUnits(shares.toString(), "ether")));
};

export const addLiquidity = async (
  provider: Provider,
  amm: AMM,
  tokens: IERC20,
  amounts: BigNumber[],
  dispatch: Dispatch
) => {
  try {
    dispatch(depositRequest());
    const signer = await provider.getSigner();

    let transaction: any;
    transaction = await tokens[0]
      .connect(signer)
      .approve(amm.address, amounts[0]);
    await transaction.wait();
    transaction = await tokens[1]
      .connect(signer)
      .approve(amm.address, amounts[1]);
    await transaction.wait();
    transaction = await amm
      .connect(signer)
      .addLiquidity(amounts[0], amounts[1]);
    await transaction.wait();
    dispatch(depositSuccess(transaction.hash));
  } catch (error) {
    dispatch(depositFail());
  }
};

export const removeLiquidity = async (provider, amm, shares, dispatch) => {
  try {
    dispatch(withdrawRequest());

    const signer = await provider.getSigner();

    let transaction = await amm.connect(signer).removeLiquidity(shares);
    await transaction.wait();
    dispatch(withdrawSuccess(transaction.hash));
  } catch (error) {
    dispatch(withdrawFail());
  }
};

export const swap = async (
  provider: Provider,
  amm: AMM,
  tokenGive: IERC20,
  tokenGet: IERC20,
  amount: BigNumber,
  dispatch: Dispatch
) => {
  try {
    dispatch(swapRequest());
    let transaction: any;
    const signer = await provider.getSigner();

    transaction = await tokenGive.connect(signer).approve(amm.address, amount);
    await transaction.wait();

    transaction = await amm
      .connect(signer)
      .swapToken(tokenGive.address, tokenGet.address, amount);

    await transaction.wait();

    dispatch(swapSuccess(transaction.hash));
  } catch (error) {
    dispatch(swapFail());
  }
};

export const loadAllSwaps = async (
  provider: Web3Provider,
  amm: AMM,
  dispatch: Dispatch
) => {
  const block = await provider.getBlockNumber();

  const swapStream = await amm.queryFilter("Swap", 0, block);
  const swaps = swapStream.map((event: any) => {
    return { hash: event.transactionHash, args: event.args };
  });
  dispatch(swapsLoaded(swaps));
};
