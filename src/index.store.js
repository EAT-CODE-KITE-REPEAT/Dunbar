import { AsyncStorage } from "react-native";
import { createStore, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import { fullReducer } from "./index.reducer";

const config = {
  key: "v1",
  storage: AsyncStorage,
  whitelist: ["data"]
};

const reducers = {
  data: fullReducer
};

const rootReducer = persistCombineReducers(config, reducers);
const store = createStore(rootReducer, compose());
const persistor = persistStore(store);

export { store, persistor };
