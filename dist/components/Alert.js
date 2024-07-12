"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var AlertComponent_1 = __importDefault(require("./AlertComponent"));
var Alert = function (_a) {
    var title = _a.title, transactionHash = _a.transactionHash, setShowAlert = _a.setShowAlert, isAction = _a.isAction, isSuccess = _a.isSuccess, showAlert = _a.showAlert;
    var alertProps = [
        {
            message: "".concat(title, " Pending..."),
            transactionHash: "",
            variant: "info",
        },
        {
            message: "".concat(title, " Successful"),
            transactionHash: transactionHash,
            variant: "success",
        },
        {
            message: "".concat(title, " Failed"),
            transactionHash: "",
            variant: "danger",
        },
    ];
    var alerts = alertProps.map(function (a, idx) {
        return (react_1.default.createElement(AlertComponent_1.default, { key: idx, message: a.message, transactionHash: a.transactionHash, variant: a.variant, setShowAlert: setShowAlert }));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, isAction ? (react_1.default.createElement(react_1.default.Fragment, null, alerts[0])) : isSuccess && showAlert ? (react_1.default.createElement(react_1.default.Fragment, null, alerts[1])) : !isSuccess && showAlert ? (react_1.default.createElement(react_1.default.Fragment, null, alerts[2])) : null));
};
exports.default = Alert;
