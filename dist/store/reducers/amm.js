"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFail = exports.withdrawSuccess = exports.withdrawRequest = exports.swapFail = exports.swapSuccess = exports.swapRequest = exports.depositFail = exports.depositSuccess = exports.depositRequest = exports.swapsLoaded = exports.sharesLoaded = exports.setContract = exports.amm = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.amm = (0, toolkit_1.createSlice)({
    name: "amm",
    initialState: {
        contract: null,
        shares: 0,
        swaps: [],
        depositing: {
            isDepositing: false,
            isSuccess: false,
            transactionHash: null,
        },
        swapping: {
            isSwapping: false,
            isSuccess: false,
            transactionHash: null,
        },
        withdrawing: {
            isWithdrawing: false,
            isSuccess: false,
            transactionHash: null,
        },
    },
    reducers: {
        setContract: function (state, action) {
            state.contract = action.payload;
        },
        sharesLoaded: function (state, action) {
            state.shares = action.payload;
        },
        swapsLoaded: function (state, action) {
            state.swaps = action.payload;
        },
        depositRequest: function (state) {
            state.depositing.isDepositing = true;
            state.depositing.isSuccess = false;
            state.depositing.transactionHash = null;
        },
        depositSuccess: function (state, action) {
            state.depositing.isDepositing = false;
            state.depositing.isSuccess = true;
            state.depositing.transactionHash = action.payload;
        },
        depositFail: function (state) {
            state.depositing.isDepositing = false;
            state.depositing.isSuccess = false;
            state.depositing.transactionHash = null;
        },
        swapRequest: function (state) {
            state.swapping.isSwapping = true;
            state.swapping.isSuccess = false;
            state.swapping.transactionHash = null;
        },
        swapSuccess: function (state, action) {
            state.swapping.isSwapping = false;
            state.swapping.isSuccess = true;
            state.swapping.transactionHash = action.payload;
        },
        swapFail: function (state) {
            state.swapping.isSwapping = false;
            state.swapping.isSuccess = false;
            state.swapping.transactionHash = null;
        },
        withdrawRequest: function (state) {
            state.withdrawing.isWithdrawing = true;
            state.withdrawing.isSuccess = false;
            state.withdrawing.transactionHash = null;
        },
        withdrawSuccess: function (state, action) {
            state.withdrawing.isWithdrawing = false;
            state.withdrawing.isSuccess = true;
            state.withdrawing.transactionHash = action.payload;
        },
        withdrawFail: function (state) {
            state.withdrawing.isWithdrawing = false;
            state.withdrawing.isSuccess = false;
            state.withdrawing.transactionHash = null;
        },
    },
});
exports.setContract = (_a = exports.amm.actions, _a.setContract), exports.sharesLoaded = _a.sharesLoaded, exports.swapsLoaded = _a.swapsLoaded, exports.depositRequest = _a.depositRequest, exports.depositSuccess = _a.depositSuccess, exports.depositFail = _a.depositFail, exports.swapRequest = _a.swapRequest, exports.swapSuccess = _a.swapSuccess, exports.swapFail = _a.swapFail, exports.withdrawRequest = _a.withdrawRequest, exports.withdrawSuccess = _a.withdrawSuccess, exports.withdrawFail = _a.withdrawFail;
exports.default = exports.amm.reducer;
