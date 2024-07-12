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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swap = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var ethers_1 = require("ethers");
var Card_1 = __importDefault(require("react-bootstrap/Card"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var interactions_1 = require("../store/interactions");
var InputWithSelection_1 = __importDefault(require("./InputWithSelection"));
var BottonComponent_1 = __importDefault(require("./BottonComponent"));
var Alert_1 = __importDefault(require("./Alert"));
var Swap = function () {
    var _a = (0, react_1.useState)(""), inputToken = _a[0], setInputToken = _a[1];
    var _b = (0, react_1.useState)(""), outputToken = _b[0], setOutputToken = _b[1];
    var _c = (0, react_1.useState)(""), inputTokenAddress = _c[0], setInputTokenAddress = _c[1];
    var _d = (0, react_1.useState)(""), outputTokenAddress = _d[0], setOutputTokenAddress = _d[1];
    var _e = (0, react_1.useState)(""), inputAmount = _e[0], setInputAmount = _e[1];
    var _f = (0, react_1.useState)(""), outputAmount = _f[0], setOutputAmount = _f[1];
    var _g = (0, react_1.useState)(0), price = _g[0], setPrice = _g[1];
    var _h = (0, react_1.useState)(""), fee = _h[0], setFee = _h[1];
    var _j = (0, react_1.useState)(false), showAlert = _j[0], setShowAlert = _j[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var provider = (0, react_redux_1.useSelector)(function (state) { return state.provider.connection; });
    var account = (0, react_redux_1.useSelector)(function (state) { return state.provider.account; });
    var tokens = (0, react_redux_1.useSelector)(function (state) { return state.tokens.contracts; });
    var symbols = (0, react_redux_1.useSelector)(function (state) { return state.tokens.symbols; });
    var balances = (0, react_redux_1.useSelector)(function (state) { return state.tokens.balances; });
    var amm = (0, react_redux_1.useSelector)(function (state) { return state.amm.contract; });
    var isSwapping = (0, react_redux_1.useSelector)(function (state) { return state.amm.swapping.isSwapping; });
    var isSuccess = (0, react_redux_1.useSelector)(function (state) { return state.amm.swapping.isSuccess; });
    var transactionHash = (0, react_redux_1.useSelector)(function (state) { return state.amm.swapping.transactionHash; });
    var handleInputToken = function (e) {
        var target = e.target;
        setInputToken(target.innerHTML);
    };
    var handleOutputToken = function (e) {
        var target = e.target;
        setOutputToken(target.innerHTML);
    };
    var handleInput = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _token1Amount, result, _token2Amount, _fee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!outputToken) {
                        window.alert("Please select a token");
                        return [2 /*return*/];
                    }
                    if (inputToken === outputToken) {
                        window.alert("Invalid token pair");
                        return [2 /*return*/];
                    }
                    if (inputToken === "RUMP") {
                        setInputTokenAddress(tokens[0].address);
                        setOutputTokenAddress(tokens[1].address);
                    }
                    else {
                        setInputTokenAddress(tokens[1].address);
                        setOutputTokenAddress(tokens[0].address);
                    }
                    if (!(e.target.value === "0" || e.target.value === "")) return [3 /*break*/, 1];
                    setOutputAmount("");
                    return [3 /*break*/, 3];
                case 1:
                    setInputAmount(e.target.value);
                    _token1Amount = ethers_1.ethers.parseUnits(e.target.value, "ether");
                    return [4 /*yield*/, amm.calculateTokenSwap(inputTokenAddress, outputTokenAddress, _token1Amount)];
                case 2:
                    result = _a.sent();
                    _token2Amount = ethers_1.ethers.formatUnits(result[0].toString(), "ether");
                    _fee = ethers_1.ethers.formatUnits(result[1].toString(), "ether");
                    setOutputAmount(_token2Amount);
                    setFee(_fee);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSwap = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _inputAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setShowAlert(false);
                    if (inputToken === outputToken) {
                        window.alert("Invalid token pair");
                        return [2 /*return*/];
                    }
                    _inputAmount = ethers_1.ethers.parseUnits(inputAmount, "ether");
                    if (!(inputToken === "RUMP")) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, interactions_1.swap)(provider, amm, tokens[0], tokens[1], _inputAmount, dispatch)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, interactions_1.swap)(provider, amm, tokens[1], tokens[0], _inputAmount, dispatch)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, interactions_1.loadBalances)(amm, tokens, account, dispatch)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, getPrice()];
                case 6:
                    _a.sent();
                    setShowAlert(true);
                    return [2 /*return*/];
            }
        });
    }); };
    var getPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (inputToken === outputToken) {
                        setPrice(0);
                        return [2 /*return*/];
                    }
                    if (!(inputToken === "RUMP")) return [3 /*break*/, 3];
                    _a = setPrice;
                    return [4 /*yield*/, amm.token2Balance()];
                case 1:
                    _b = (_e.sent());
                    return [4 /*yield*/, amm.token1Balance()];
                case 2:
                    _a.apply(void 0, [_b / (_e.sent())]);
                    return [3 /*break*/, 6];
                case 3:
                    _c = setPrice;
                    return [4 /*yield*/, amm.token1Balance()];
                case 4:
                    _d = (_e.sent());
                    return [4 /*yield*/, amm.token2Balance()];
                case 5:
                    _c.apply(void 0, [_d / (_e.sent())]);
                    _e.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (inputToken && outputToken) {
            getPrice();
        }
    }, [inputToken, outputToken]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Card_1.default, { style: {
                maxWidth: "500px",
                backgroundColor: "#87CEEB",
                border: "solid 2px purple",
                borderRadius: "10px",
                height: "398px",
            }, className: "mx-auto px-4" }, account ? (react_1.default.createElement(Form_1.default, { onSubmit: handleSwap, style: { maxWidth: "450px", margin: "50px auto" } },
            react_1.default.createElement(InputWithSelection_1.default, { title: "Input", disabled: !inputToken, handleToken: handleInputToken, token: inputToken, symbols: symbols, balances: balances, handleInput: handleInput, value: undefined }),
            react_1.default.createElement(InputWithSelection_1.default, { title: "Output", disabled: true, handleToken: handleOutputToken, token: outputToken, symbols: symbols, balances: balances, handleInput: handleInput, value: outputAmount }),
            react_1.default.createElement(Row_1.default, null,
                react_1.default.createElement(BottonComponent_1.default, { spinner: isSwapping, title: "Swap" }),
                isSwapping ? (react_1.default.createElement(react_1.default.Fragment, null)) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Form_1.default.Text, { className: "purple fw-bold" },
                        "Exchange Rate: ",
                        price),
                    react_1.default.createElement(Form_1.default.Text, { className: "purple fw-bold" },
                        ".03% Fee: ",
                        fee)))))) : (react_1.default.createElement("p", { className: "d-flex justify-content-center align-items-center", style: { height: "300px" } }, "Please connect wallet"))),
        react_1.default.createElement(Alert_1.default, { title: "Swap", transactionHash: transactionHash, setShowAlert: setShowAlert, isAction: isSwapping, isSuccess: isSuccess, showAlert: showAlert })));
};
exports.Swap = Swap;
exports.default = exports.Swap;
