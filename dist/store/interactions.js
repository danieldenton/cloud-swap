"use strict";
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
exports.loadAllSwaps = exports.swap = exports.removeLiquidity = exports.addLiquidity = exports.loadBalances = exports.loadAMM = exports.loadTokens = exports.loadAccount = exports.loadNetwork = exports.loadProvider = void 0;
var ethers_1 = require("ethers");
var provider_1 = require("./reducers/provider");
var tokens_1 = require("./reducers/tokens");
var amm_1 = require("./reducers/amm");
var Token_json_1 = __importDefault(require("../abis/Token.json"));
var AMM_json_1 = __importDefault(require("../abis/AMM.json"));
var sepoliaConfig_json_1 = __importDefault(require("../sepoliaConfig.json"));
var localhostConfig_json_1 = __importDefault(require("../localhostConfig.json"));
var config;
var loadProvider = function (dispatch) {
    var provider = new ethers_1.providers.Web3Provider(window.ethereum);
    dispatch((0, provider_1.setProvider)(provider));
    return provider;
};
exports.loadProvider = loadProvider;
var loadNetwork = function (provider, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var chainId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.getNetwork()];
            case 1:
                chainId = (_a.sent()).chainId;
                dispatch((0, provider_1.setNetwork)(chainId));
                return [2 /*return*/, chainId];
        }
    });
}); };
exports.loadNetwork = loadNetwork;
var loadAccount = function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, window.ethereum.request({
                    method: "eth_requestAccounts",
                })];
            case 1:
                accounts = _a.sent();
                account = ethers_1.ethers.utils.getAddress(accounts[0]);
                dispatch((0, provider_1.setAccount)(account));
                return [2 /*return*/, account];
        }
    });
}); };
exports.loadAccount = loadAccount;
var loadTokens = function (provider, chainId, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var rump, usd, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                config = chainId === 11155111 ? sepoliaConfig_json_1.default : localhostConfig_json_1.default;
                rump = new ethers_1.Contract(config[chainId].rump.address, Token_json_1.default, provider);
                usd = new ethers_1.Contract(config[chainId].usd.address, Token_json_1.default, provider);
                dispatch((0, tokens_1.setContracts)([rump, usd]));
                _a = dispatch;
                _b = tokens_1.setSymbols;
                return [4 /*yield*/, rump.symbol()];
            case 1:
                _c = [_d.sent()];
                return [4 /*yield*/, usd.symbol()];
            case 2:
                _a.apply(void 0, [_b.apply(void 0, [_c.concat([_d.sent()])])]);
                return [2 /*return*/];
        }
    });
}); };
exports.loadTokens = loadTokens;
var loadAMM = function (provider, chainId, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var amm;
    return __generator(this, function (_a) {
        config = chainId === 11155111 ? sepoliaConfig_json_1.default : localhostConfig_json_1.default;
        amm = new ethers_1.Contract(config[chainId].amm.address, AMM_json_1.default, provider);
        dispatch((0, amm_1.setContract)(amm));
        return [2 /*return*/, amm];
    });
}); };
exports.loadAMM = loadAMM;
var loadBalances = function (amm, tokens, account, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var balance1, balance2, shares;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tokens[0].balanceOf(account)];
            case 1:
                balance1 = _a.sent();
                return [4 /*yield*/, tokens[1].balanceOf(account)];
            case 2:
                balance2 = _a.sent();
                dispatch((0, tokens_1.balancesLoaded)([
                    ethers_1.utils.formatUnits(balance1.toString(), "ether"),
                    ethers_1.utils.formatUnits(balance2.toString(), "ether"),
                ]));
                return [4 /*yield*/, amm.shares(account)];
            case 3:
                shares = _a.sent();
                dispatch((0, amm_1.sharesLoaded)(ethers_1.utils.formatUnits(shares.toString(), "ether")));
                return [2 /*return*/];
        }
    });
}); };
exports.loadBalances = loadBalances;
var addLiquidity = function (provider, amm, tokens, amount1, amount2, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var signer, transaction, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                dispatch((0, amm_1.depositRequest)());
                return [4 /*yield*/, provider.getSigner()];
            case 1:
                signer = _a.sent();
                transaction = void 0;
                return [4 /*yield*/, tokens[0]
                        .connect(signer)
                        .approve(amm.address, amount1.toString())];
            case 2:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 3:
                _a.sent();
                return [4 /*yield*/, tokens[1]
                        .connect(signer)
                        .approve(amm.address, amount2.toString())];
            case 4:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 5:
                _a.sent();
                return [4 /*yield*/, amm.connect(signer).addLiquidity(amount1, amount2)];
            case 6:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 7:
                _a.sent();
                dispatch((0, amm_1.depositSuccess)(transaction.hash));
                return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                dispatch((0, amm_1.depositFail)());
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.addLiquidity = addLiquidity;
var removeLiquidity = function (provider, amm, shares, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var signer, transaction, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                dispatch((0, amm_1.withdrawRequest)());
                return [4 /*yield*/, provider.getSigner()];
            case 1:
                signer = _a.sent();
                return [4 /*yield*/, amm.connect(signer).removeLiquidity(shares)];
            case 2:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 3:
                _a.sent();
                dispatch((0, amm_1.withdrawSuccess)(transaction.hash));
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                dispatch((0, amm_1.withdrawFail)());
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeLiquidity = removeLiquidity;
var swap = function (provider, amm, tokenGive, tokenGet, amount, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, signer, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                dispatch((0, amm_1.swapRequest)());
                transaction = void 0;
                return [4 /*yield*/, provider.getSigner()];
            case 1:
                signer = _a.sent();
                return [4 /*yield*/, tokenGive
                        .connect(signer)
                        .approve(amm.address, amount.toString())];
            case 2:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 3:
                _a.sent();
                return [4 /*yield*/, amm
                        .connect(signer)
                        .swapToken(tokenGive.address, tokenGet.address, amount)];
            case 4:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 5:
                _a.sent();
                dispatch((0, amm_1.swapSuccess)(transaction.hash));
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                dispatch((0, amm_1.swapFail)());
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.swap = swap;
var loadAllSwaps = function (provider, amm, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var block, swapStream, swaps;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.getBlockNumber()];
            case 1:
                block = _a.sent();
                return [4 /*yield*/, amm.queryFilter("Swap", 0, block)];
            case 2:
                swapStream = _a.sent();
                swaps = swapStream.map(function (event) {
                    return { hash: event.transactionHash, args: event.args };
                });
                dispatch((0, amm_1.swapsLoaded)(swaps));
                return [2 /*return*/];
        }
    });
}); };
exports.loadAllSwaps = loadAllSwaps;
//# sourceMappingURL=interactions.js.map