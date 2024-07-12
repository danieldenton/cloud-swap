import React from "react";
interface Props {
    balance: number | null;
    shares: number | null;
    handleAmount: (e: React.ChangeEvent<any>) => void;
    tokenAmount: number | string;
    symbol: string;
}
declare const InputWithoutSelection: ({ balance, shares, handleAmount, tokenAmount, symbol, }: Props) => React.JSX.Element;
export default InputWithoutSelection;
//# sourceMappingURL=InputWithoutSelection.d.ts.map