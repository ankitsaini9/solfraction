import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pubKey: {},
  selectedNfts: [],
};

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setPubKey: (state, action) => {
      state.pubKey = action.payload;
    },
    setSelectedNfts: (state, action) => {
      const index = state.selectedNfts.findIndex(
        (n) => n.mint === action.payload.mint
      );
      if (index !== -1) {
        state.selectedNfts.splice(index, 1);
      } else state.selectedNfts.push(action.payload);
    },
  },
});

export const { setPubKey, setSelectedNfts } = nftSlice.actions;

export default nftSlice.reducer;
