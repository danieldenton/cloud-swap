"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charts = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var Table_1 = __importDefault(require("react-bootstrap/Table"));
var react_apexcharts_1 = __importDefault(require("react-apexcharts"));
var selectors_1 = require("../store/selectors");
var Loading_1 = __importDefault(require("./Loading"));
var interactions_1 = require("../store/interactions");
var Chart_config_1 = require("./Chart.config");
var utils_1 = require("../utils");
require("./../App.css");
var Charts = function () {
    var _a;
    var dispatch = (0, react_redux_1.useDispatch)();
    var provider = (0, react_redux_1.useSelector)(function (state) { return state.provider.connection; });
    var tokens = (0, react_redux_1.useSelector)(function (state) { return state.tokens.contracts; });
    var symbols = (0, react_redux_1.useSelector)(function (state) { return state.tokens.symbols; });
    var amm = (0, react_redux_1.useSelector)(function (state) { return state.amm.contract; });
    var chart = (0, react_redux_1.useSelector)(selectors_1.chartSelector);
    (0, react_1.useEffect)(function () {
        if (provider && amm) {
            (0, interactions_1.loadAllSwaps)(provider, amm, dispatch);
        }
    }, [provider, amm, dispatch]);
    var tabledSwaps = (_a = chart === null || chart === void 0 ? void 0 : chart.swaps) === null || _a === void 0 ? void 0 : _a.map(function (swap, idx) {
        return (react_1.default.createElement("tr", { key: idx },
            react_1.default.createElement("td", null, (0, utils_1.formatHash)(swap.hash)),
            react_1.default.createElement("td", null, (0, utils_1.getSymbol)(swap.args.tokenGive, tokens, symbols)),
            react_1.default.createElement("td", null, (0, utils_1.formatEther)(swap.args.tokenGiveAmount)),
            react_1.default.createElement("td", null, (0, utils_1.getSymbol)(swap.args.tokenGet, tokens, symbols)),
            react_1.default.createElement("td", null, (0, utils_1.formatEther)(swap.args.tokenGetAmount)),
            react_1.default.createElement("td", null, (0, utils_1.formatAddress)(swap.args.swapCaller)),
            react_1.default.createElement("td", null, (0, utils_1.formatDate)(swap.args.timestamp))));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, provider && amm ? (react_1.default.createElement("div", null,
        react_1.default.createElement(react_apexcharts_1.default, { options: Chart_config_1.options, series: chart ? chart.series : Chart_config_1.series, type: "line", width: "100%", height: "100%" }),
        react_1.default.createElement("hr", null),
        react_1.default.createElement(Table_1.default, { bordered: true },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Transaction string"),
                    react_1.default.createElement("th", null, "Token Give"),
                    react_1.default.createElement("th", null, "Amount Give"),
                    react_1.default.createElement("th", null, "Token Get"),
                    react_1.default.createElement("th", null, "Amount Get"),
                    react_1.default.createElement("th", null, "User"),
                    react_1.default.createElement("th", null, "Time"))),
            react_1.default.createElement("tbody", null, tabledSwaps)))) : (react_1.default.createElement(Loading_1.default, null))));
};
exports.Charts = Charts;
exports.default = exports.Charts;
//# sourceMappingURL=Charts.js.map