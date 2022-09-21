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
        (n) => n.image === action.payload
      );
      if (index !== -1) {
        state.selectedNfts = state.selectedNfts.filter(
          (n) => n.image !== action.payload
        );
      } else state.selectedNfts.push({ image: action.payload, isActive: true });
    },
  },
});

export const { setPubKey, setSelectedNfts } = nftSlice.actions;

export default nftSlice.reducer;
