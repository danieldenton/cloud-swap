import { RootState } from "./types/state";

interface Ethereum {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, callback: () => void) => void;
}

interface Window {
  ethereum: Ethereum;
}