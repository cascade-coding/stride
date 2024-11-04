import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./features/log/logSlice";
import journalReducer from "./features/log/journalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      log: logReducer,
      journal: journalReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
