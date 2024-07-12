"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
var InputWithoutSelection = function (_a) {
    var balance = _a.balance, shares = _a.shares, handleAmount = _a.handleAmount, tokenAmount = _a.tokenAmount, symbol = _a.symbol;
    return (react_1.default.createElement(Row_1.default, { className: "my-3" },
        react_1.default.createElement(Form_1.default.Text, { className: "text-end my-2 purple fw-bold" }, balance ? "Balance: ".concat(balance) : "Shares: ".concat(shares)),
        react_1.default.createElement(InputGroup_1.default, null,
            react_1.default.createElement(Form_1.default.Control, { type: "number", placeholder: "0.0", min: "0.0", step: "any", id: "token1", onChange: handleAmount, value: tokenAmount === "" ? "" : tokenAmount, className: "bg-light border-primary" }),
            react_1.default.createElement(InputGroup_1.default.Text, { style: { width: "100px" }, className: "justify-content-center purple fw-bold bg-light border-primary" }, symbol))));
};
exports.default = InputWithoutSelection;
//# sourceMappingURL=InputWithoutSelection.js.map