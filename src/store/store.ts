import { configureStore } from "@reduxjs/toolkit";
import provider from "./reducers/provider.ts";
import tokens from "./reducers/tokens.ts";
import amm from "./reducers/amm.ts";

export const store = configureStore({
  reducer: {
    provider,
    tokens,
    amm,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
