import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { LogType } from "@/lib/types";

interface logState {
  logs: LogType[];
}

// Define the initial state using that type
const initialState: logState = {
  logs: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<LogType[]>) => {
      state.logs = action.payload;
    },

    setLatestLog: (state, action: PayloadAction<LogType>) => {
      state.logs.push(action.payload);
    },

    updateLog: (state, action: PayloadAction<LogType>) => {
      const { id } = action.payload;
      const index = state.logs.findIndex((log) => log.id === id);

      if (index !== -1) {
        state.logs[index] = {
          ...state.logs[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setLogs, setLatestLog, updateLog } = logSlice.actions;

export const selectLog = (state: RootState) => state.log;

export default logSlice.reducer;
