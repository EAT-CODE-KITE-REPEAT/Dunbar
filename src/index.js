import React from "react";
import { View, Text } from "react-native";
import { connect, Provider } from "react-redux";
import { store, persistor } from "./index.store";
import { PersistGate } from "redux-persist/es/integration/react";

import { createAppContainer, createStackNavigator } from "react-navigation";

import C from "./index.constants";

import about from "./screen.about";
import home from "./screen.home";
import importscreen from "./screen.import";
import user from "./screen.user";

const HomeStack = createStackNavigator({
  about,
  import: importscreen,
  home,
  user
});

const mapStateToProps = store => ({ ...store });
const mapDispatchToProps = dispatch => ({ dispatch });

const ConnectedHomeStack = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeStack);

const AppContainer = createAppContainer(ConnectedHomeStack);

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
