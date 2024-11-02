import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { LogEntry, LogInfoType, LogType, Tag } from "@/lib/types";

interface logState {
  logs: LogInfoType[];
  selectedLog: LogType | null;
  pageNumber: number;
  totalPageNumber: number;
  pageEnded: boolean;
  initialLoading: boolean;
  showLogId: string | null;
  entryUpdating: boolean;
  tags: Tag[];
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
  tags: [],
  selectedLog: null,
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
      state.selectedLog = action.payload;
    },

    updateEntry: (state, action: PayloadAction<LogEntry>) => {
      if (!state.selectedLog) return;

      // Find the index of the entry with the given entryId
      const entryIndex = state.selectedLog.entries?.findIndex(
        (entry) => entry.id === action.payload.id
      );

      if (
        entryIndex !== undefined &&
        entryIndex !== -1 &&
        state.selectedLog.entries
      ) {
        state.selectedLog.entries[entryIndex] = {
          ...state.selectedLog.entries[entryIndex],
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

    removeEntry: (state, action: PayloadAction<string>) => {
      const log = state.selectedLog;
      if (log && log.entries) {
        log.entries = log.entries.filter(
          (entry) => entry.id !== action.payload
        );
      }
    },

    addTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags.push(...action.payload);
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
  addTags,
  updateEntry,
  removeEntry,
} = logSlice.actions;

export const selectLog = (state: RootState) => state.log;

export default logSlice.reducer;
