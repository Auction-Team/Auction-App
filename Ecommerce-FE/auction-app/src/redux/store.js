import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import customerReducer from "./slices/customerSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const accountPersistConfig = {
  key: "account",
  version: 1,
  storage,
};
const accountPersistedReducer = persistReducer(
  accountPersistConfig,
  accountReducer
);
export const store = configureStore({
  reducer: {
    account: accountPersistedReducer,
    customer: customerReducer,
  },
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);