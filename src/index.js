import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./index.store";
import AppContainer from "./index.navigation";

const Main = props => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <AppContainer {...props} />
      </Provider>
    </PersistGate>
  );
};

export default Main;
