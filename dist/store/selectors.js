"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartSelector = void 0;
var reselect_1 = require("reselect");
var tokens = function (state) { return state.tokens.contracts; };
var swaps = function (state) { return state.amm.swaps; };
exports.chartSelector = (0, reselect_1.createSelector)(swaps, tokens, function (swaps, tokens) {
    if (!tokens[0] || !tokens[1]) {
        return;
    }
    swaps = swaps.filter(function (s) {
        return s.args.tokenGet === tokens[0].address ||
            s.args.tokenGet === tokens[1].address;
    });
    swaps = swaps.filter(function (s) {
        return s.args.tokenGive === tokens[0].address ||
            s.args.tokenGive === tokens[1].address;
    });
    var decorateSwap = function (swap) {
        var rate = swap.args.token2Balance / swap.args.token1Balance;
        rate = Math.round(rate * 100000) / 100000;
        return __assign(__assign({}, swap), { rate: rate });
    };
    swaps = swaps.map(function (s) { return decorateSwap(s); });
    var prices = swaps.map(function (s) { return s.rate; });
    swaps = swaps.sort(function (a, b) { return b.args.timestamp - a.args.timestamp; });
    return {
        swaps: swaps,
        series: [
            {
                name: "Rate",
                data: prices,
            },
        ],
    };
});
