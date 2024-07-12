interface Ethereum {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
}

interface Window {
  ethereum: Ethereum;
}

declare module "./utils" {
  export function formatEther(): string;
  export function formatDate(): string;
  export function formatHash(): string;
  export function formatAddress(): string;
  export function getSymbol(): string;
}

declare module "../store/selectors" {
  export function chartSelector(): void;
}

//   declare module '../store/interactions' {
//     export function loadAccount(): void;
//     export function loadBalances(): void;
//     export function swap(): void;
//     export function withdraw(): void;
//   }
