import { createSelector } from "reselect";
import { LogType } from "./types";

export const selectPreviousLogs = createSelector(
  (state: { log: { logs: LogType[] } }) => state.log.logs,
  (logs): LogType[] => logs.filter((log) => log.latest !== true)
);
