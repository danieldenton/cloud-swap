"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var provider_ts_1 = __importDefault(require("./reducers/provider.ts"));
var tokens_ts_1 = __importDefault(require("./reducers/tokens.ts"));
var amm_ts_1 = __importDefault(require("./reducers/amm.ts"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        provider: provider_ts_1.default,
        tokens: tokens_ts_1.default,
        amm: amm_ts_1.default,
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
});
