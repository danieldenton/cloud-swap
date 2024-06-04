import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const provider = createSlice({
  name: "provider",
  initialState: {
    connection: null,
    chainId: null,
    account: null,
  },
  reducers: {
    setProvider: (state, action) => {
      state.connection = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setProvider, setAccount } = provider.actions;

export default provider.reducer;
