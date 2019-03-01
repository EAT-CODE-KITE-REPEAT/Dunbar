import React from "react";
import { View, Text } from "react-native";
import { connect, Provider } from "react-redux";
import { store, persistor } from "./index.store";
import { PersistGate } from "redux-persist/es/integration/react";

import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import C from "./index.constants";

import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import about from "./screen.about";
import home from "./screen.home";
import intro from "./screen.intro";
import user from "./screen.user";

const HomeStack = createStackNavigator({
  home,
  about,
  intro,
  user
});

const mapStateToProps = store => ({ ...store });
const mapDispatchToProps = dispatch => ({ dispatch });

const ConnectedHomeStack = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeStack);

const Main = props => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ConnectedHomeStack {...props} />
      </Provider>
    </PersistGate>
  );
};

export default Main;
