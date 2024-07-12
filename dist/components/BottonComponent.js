"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonComponent = void 0;
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var Spinner_1 = __importDefault(require("react-bootstrap/Spinner"));
var ButtonComponent = function (_a) {
    var spinner = _a.spinner, title = _a.title;
    return (react_1.default.createElement(react_1.default.Fragment, null, spinner ? (react_1.default.createElement(Spinner_1.default, { animation: "border", style: { display: "block", margin: "0 auto", color: "purple" } })) : (react_1.default.createElement(Button_1.default, { type: "submit", className: "fw-bold", style: {
            backgroundColor: "#D8BFD8",
            color: "purple",
            border: "solid purple 2px",
            borderRadius: "5px",
            marginTop: '15px'
        } }, title))));
};
exports.ButtonComponent = ButtonComponent;
exports.default = exports.ButtonComponent;
//# sourceMappingURL=BottonComponent.js.map