import React from "react";
interface Props {
    title: string;
    disabled: boolean;
    handleToken: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    token: string;
    symbols: string[];
    balances: number[];
    handleInput: (e: React.ChangeEvent<any>) => void;
    value: string | undefined;
}
export declare const InputWithSelection: ({ title, disabled, handleToken, token, symbols, balances, handleInput, value, }: Props) => React.JSX.Element;
export default InputWithSelection;
//# sourceMappingURL=InputWithSelection.d.ts.map