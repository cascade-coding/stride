import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { JournalInfoType, JournalType } from "@/lib/types";

interface journalState {
  journals: JournalInfoType[];
  selectedJournal: JournalType | null;
  pageNumber: number;
  totalPageNumber: number;
  pageEnded: boolean;
  initialLoading: boolean;
  showJournalId: string | null;
  journalUpdating: boolean;
}

// Define the initial state using that type
const initialState: journalState = {
  journals: [],
  pageNumber: 1,
  totalPageNumber: 1,
  pageEnded: false,
  initialLoading: true,
  showJournalId: null,
  journalUpdating: false,
  selectedJournal: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addJournals: (state, action: PayloadAction<JournalInfoType[]>) => {
      state.journals.push(...action.payload);
    },

    setShowJournalId: (state, action: PayloadAction<null | string>) => {
      state.showJournalId = action.payload;
    },

    setSelectedJournal: (state, action: PayloadAction<JournalType | null>) => {
      state.selectedJournal = action.payload;
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

    updateJournal: (
      state,
      action: PayloadAction<{
        id: string;
        title: string | null;
        updatedAt: string;
      }>
    ) => {
      const { id, title, updatedAt } = action.payload;

      const journalIndex = state.journals.findIndex(
        (journal) => journal.id === id
      );

      if (journalIndex !== -1) {
        state.journals[journalIndex] = {
          ...state.journals[journalIndex],
          title,
          updatedAt,
        };
      }
    },
  },
});

export const {
  setShowJournalId,
  setSelectedJournal,
  updatePageNumber,
  updateTotalPageNumber,
  updatePageEndedStatus,
  addJournals,
  updateJournal,
} = journalSlice.actions;

export const selectJournal = (state: RootState) => state.journal;

export default journalSlice.reducer;
