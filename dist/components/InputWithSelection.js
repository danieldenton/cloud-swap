"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputWithSelection = void 0;
var react_1 = __importDefault(require("react"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
var Dropdown_1 = __importDefault(require("react-bootstrap/Dropdown"));
var DropdownButton_1 = __importDefault(require("react-bootstrap/DropdownButton"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var InputWithSelection = function (_a) {
    var title = _a.title, disabled = _a.disabled, handleToken = _a.handleToken, token = _a.token, symbols = _a.symbols, balances = _a.balances, handleInput = _a.handleInput, value = _a.value;
    return (react_1.default.createElement(Row_1.default, { className: "my-3" },
        react_1.default.createElement("div", { className: "d-flex justify-content-between" },
            react_1.default.createElement(Form_1.default.Label, { className: "purple fw-bold" },
                react_1.default.createElement("strong", null, title)),
            react_1.default.createElement(Form_1.default.Text, { className: "purple fw-bold" },
                "Balance:",
                " ",
                token === symbols[0]
                    ? balances[0]
                    : token === symbols[1]
                        ? balances[1]
                        : 0)),
        react_1.default.createElement(InputGroup_1.default, null,
            title === "Input" ? (react_1.default.createElement(Form_1.default.Control, { type: "number", placeholder: "0.0", min: "0.0", step: "any", onChange: function (e) { return handleInput(e); }, disabled: disabled, className: "bg-light border-primary purple" })) : (react_1.default.createElement(Form_1.default.Control, { type: "number", placeholder: "0.0", min: "0.0", step: "any", value: value, disabled: disabled, className: "bg-light border-primary purple" })),
            react_1.default.createElement(DropdownButton_1.default, { variant: "outline-primary purple fw-bold", title: token ? token : "Select Token" },
                react_1.default.createElement(Dropdown_1.default.Item, { onClick: function (e) { return handleToken(e); } }, "RUMP"),
                react_1.default.createElement(Dropdown_1.default.Item, { onClick: function (e) { return handleToken(e); } }, "USD")))));
};
exports.InputWithSelection = InputWithSelection;
exports.default = exports.InputWithSelection;
//# sourceMappingURL=InputWithSelection.js.map