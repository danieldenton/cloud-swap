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
exports.Withdraw = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var ethers_1 = require("ethers");
var Card_1 = __importDefault(require("react-bootstrap/Card"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var interactions_1 = require("../store/interactions");
var InputWithoutSelection_1 = __importDefault(require("./InputWithoutSelection"));
var BottonComponent_1 = __importDefault(require("./BottonComponent"));
var Alert_1 = __importDefault(require("./Alert"));
var Withdraw = function () {
    var _a = (0, react_1.useState)(0), amount = _a[0], setAmount = _a[1];
    var _b = (0, react_1.useState)(false), showAlert = _b[0], setShowAlert = _b[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var provider = (0, react_redux_1.useSelector)(function (state) { return state.provider.connection; });
    var account = (0, react_redux_1.useSelector)(function (state) { return state.provider.account; });
    var tokens = (0, react_redux_1.useSelector)(function (state) { return state.tokens.contracts; });
    var balances = (0, react_redux_1.useSelector)(function (state) { return state.tokens.balances; });
    var amm = (0, react_redux_1.useSelector)(function (state) { return state.amm.contract; });
    var shares = (0, react_redux_1.useSelector)(function (state) { return state.amm.shares; });
    var isWithdrawing = (0, react_redux_1.useSelector)(function (state) { return state.amm.withdrawing.isWithdrawing; });
    var isSuccess = (0, react_redux_1.useSelector)(function (state) { return state.amm.withdrawing.isSuccess; });
    var transactionHash = (0, react_redux_1.useSelector)(function (state) { return state.amm.withdrawing.transactionHash; });
    var handleInput = function (e) {
        var inputValue = parseInt(e.target.value);
        setAmount(inputValue);
    };
    var handleWithdraw = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _shares;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (amount === 0) {
                        window.alert("You need to enter an amount to withdraw");
                        return [2 /*return*/];
                    }
                    setShowAlert(false);
                    _shares = ethers_1.ethers.parseUnits(amount.toString(), "ether");
                    return [4 /*yield*/, (0, interactions_1.removeLiquidity)(provider, amm, _shares, dispatch)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, interactions_1.loadBalances)(amm, tokens, account, dispatch)];
                case 2:
                    _a.sent();
                    setShowAlert(true);
                    setAmount(0);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Card_1.default, { style: {
                maxWidth: "500px",
                backgroundColor: "#87CEEB",
                border: "solid 2px purple",
                borderRadius: "10px",
                height: "398px",
            }, className: "mx-auto px-4" }, account ? (react_1.default.createElement(Form_1.default, { onSubmit: handleWithdraw, style: { maxWidth: "450px", margin: "50px auto" } },
            react_1.default.createElement(InputWithoutSelection_1.default, { balance: null, shares: shares, handleAmount: handleInput, tokenAmount: amount, symbol: "Shares" }),
            react_1.default.createElement(Row_1.default, null,
                react_1.default.createElement(BottonComponent_1.default, { spinner: isWithdrawing, title: "Withdraw" })),
            react_1.default.createElement("hr", null),
            react_1.default.createElement(Row_1.default, null,
                react_1.default.createElement("p", { className: "purple" },
                    react_1.default.createElement("strong", null, "RUMP Balance: "),
                    balances[0]),
                react_1.default.createElement("p", { className: "purple" },
                    react_1.default.createElement("strong", null, "USD Balance: "),
                    balances[1])))) : (react_1.default.createElement("p", { className: "d-flex justify-content-center align-items-center", style: { height: "300px" } }, "Please connect wallet"))),
        react_1.default.createElement(Alert_1.default, { title: "Withdraw", transactionHash: transactionHash, setShowAlert: setShowAlert, isAction: isWithdrawing, isSuccess: isSuccess, showAlert: showAlert })));
};
exports.Withdraw = Withdraw;
exports.default = exports.Withdraw;
