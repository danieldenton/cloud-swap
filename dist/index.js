"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
require("bootstrap/dist/css/bootstrap.css");
var App_tsx_1 = __importDefault(require("./components/App.tsx"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var react_redux_1 = require("react-redux");
var store_ts_1 = require("./store/store.ts");
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_redux_1.Provider, { store: store_ts_1.store },
        react_1.default.createElement(App_tsx_1.default, null))));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map