
import { ethers } from "ethers";
import { IERC20 } from "./types/interactionTypes";

export const formatEther = (amount: string) => {
  const formattedEther = ethers.formatUnits(amount.toString(), "ether");
  return formattedEther;
};

export const formatDate = (date: number) => {
  const formattedDate = new Date(
    Number(date.toString() + "000")
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate;
};

export const formatHash = (hash: string) => {
  const formattedString = hash.slice(0, 5) + "..." + hash.slice(61, 66);
  return formattedString;
};

export const formatAddress = (address: string) => {
  const formattedAddy = address.slice(0, 5) + "..." + address.slice(38, 42);
  return formattedAddy;
};

export const getSymbol = (token: string, tokens: IERC20[], symbols: string[]) => {
  if (token === tokens[0].address) {
    return symbols[0];
  } else if (token === tokens[1].address) {
    return symbols[1];
  } else {
    return "";
  }
};
