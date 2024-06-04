import { createSlice } from "@reduxjs/toolkit";

export const provider = createSlice({
  name: "tokens",
  initialState: {
    contracts: [],
    symbols: [],
    balances: [0, 0],
  },
  reducers: {
    setContracts: (state, action) => {
      state.connection = action.payload;
    },
  },
});

export const { setContracts } = tokens.actions;

export default tokens.reducer;
