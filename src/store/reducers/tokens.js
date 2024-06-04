import { createSlice } from "@reduxjs/toolkit";

export const provider = createSlice({
  name: "token",
  initialState: {
    connection: null,
    chainId: null,
    account: null,
  },
  reducers: {
    setContract: (state, action) => {
      state.connection = action.payload;
    },
    setNetwork: (state, action) => {
      state.chainId = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setProvider, setNetwork, setAccount } = token.actions;

export default token.reducer;