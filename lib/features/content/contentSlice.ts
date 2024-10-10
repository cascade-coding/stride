import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

// Define a type for the slice state
interface ContentState {
  value: null | "Empty" | "Current_Log" | "Existing_Log" | "Journal";
  count: number;
}

// Define the initial state using that type
const initialState: ContentState = {
  value: null,
  count: 10,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentType: (
      state,
      action: PayloadAction<typeof initialState.value>
    ) => {
      state.value = action.payload;
      state.count += 10;
    },
  },
});

export const { setContentType } = contentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContent = (state: RootState) => state.content;

export default contentSlice.reducer;
