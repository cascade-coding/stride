import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { LogType } from "@/lib/types";

interface logState {
  logs: LogType[];
  pageNumber: number;
  totalPageNumber: number;
  pageEnded: boolean;
  initialLoading: boolean;
  showLogId: string | null;
  entryUpdating: boolean;
}

// Define the initial state using that type
const initialState: logState = {
  logs: [],
  pageNumber: 1,
  totalPageNumber: 1,
  pageEnded: false,
  initialLoading: true,
  showLogId: null,
  entryUpdating: false,
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
      state.showLogId = action.payload.id;
    },

    addLogs: (state, action: PayloadAction<LogType[]>) => {
      state.logs.push(...action.payload);
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

    updatePageNumber: (state) => {
      state.pageNumber += 1;
    },

    updateTotalPageNumber: (state, action: PayloadAction<number>) => {
      state.totalPageNumber = action.payload;
    },

    updatePageEndedStatus: (state, action: PayloadAction<boolean>) => {
      state.pageEnded = action.payload;
    },

    setInitialLoading: (state, action: PayloadAction<boolean>) => {
      state.initialLoading = action.payload;
    },

    setShowLogId: (state, action: PayloadAction<string | null>) => {
      state.showLogId = action.payload;
    },

    setEntryUpdating: (state, action: PayloadAction<boolean>) => {
      state.entryUpdating = action.payload;
    },
  },
});

export const {
  setLogs,
  setLatestLog,
  addLogs,
  updateLog,
  updatePageNumber,
  updateTotalPageNumber,
  updatePageEndedStatus,
  setInitialLoading,
  setShowLogId,
  setEntryUpdating,
} = logSlice.actions;

export const selectLog = (state: RootState) => state.log;

export default logSlice.reducer;
