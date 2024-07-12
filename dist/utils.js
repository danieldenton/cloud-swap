"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbol = exports.formatAddress = exports.formatHash = exports.formatDate = exports.formatEther = void 0;
var ethers_1 = require("ethers");
var formatEther = function (amount) {
    var formattedEther = ethers_1.utils.formatUnits(amount.toString(), "ether");
    return formattedEther;
};
exports.formatEther = formatEther;
var formatDate = function (date) {
    var formattedDate = new Date(Number(date.toString() + "000")).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    return formattedDate;
};
exports.formatDate = formatDate;
var formatHash = function (hash) {
    var formattedString = hash.slice(0, 5) + "..." + hash.slice(61, 66);
    return formattedString;
};
exports.formatHash = formatHash;
var formatAddress = function (address) {
    var formattedAddy = address.slice(0, 5) + "..." + address.slice(38, 42);
    return formattedAddy;
};
exports.formatAddress = formatAddress;
var getSymbol = function (token, tokens, symbols) {
    if (token === tokens[0].address) {
        return symbols[0];
    }
    else if (token === tokens[1].address) {
        return symbols[1];
    }
    else {
        return "";
    }
};
exports.getSymbol = getSymbol;
//# sourceMappingURL=utils.js.map