import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  subRedditName: string;
}

const initialState: InitialState = {
  subRedditName: "worldnews",
};

const subRedditSlice = createSlice({
  name: "subReddit",
  initialState,
  reducers: {
    selectSubReddit: (state, action: PayloadAction<string>) => {
      state.subRedditName = action.payload;
    },
  },
});

export default subRedditSlice.reducer;
export const { selectSubReddit } = subRedditSlice.actions;
