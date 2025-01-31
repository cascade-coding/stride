import { createSelector } from "reselect";
import { LogInfoType, JournalInfoType } from "./types";

export const selectPreviousLogs = createSelector(
  (state: { log: { logs: LogInfoType[] } }) => state.log.logs,
  (logs): LogInfoType[] => logs.filter((log) => log.latest !== true)
);

// export const selectPreviousJournals = createSelector(
//   [
//     (state: { journal: { journals: JournalInfoType[] } }) =>
//       state.journal.journals,
//   ],
//   (journals): JournalInfoType[] => [...journals]
// );

export const selectPreviousJournals = createSelector(
  (state: { journal: { journals: JournalInfoType[] } }) =>
    state.journal.journals,
  (journals): JournalInfoType[] => journals.filter((item) => !item.trashedAt)
);
