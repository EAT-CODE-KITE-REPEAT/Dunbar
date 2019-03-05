import React from "react";
import { Text } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { connect } from "react-redux";

import About from "./screen.about";
import Home from "./screen.home";
import Contacts from "./screen.contacts";
import User from "./screen.user";
import Settings from "./screen.settings";

const TabsRoutes = {
  Home: { screen: Home, icon: <Text>JKJKJ</Text> },
  Contacts,
  About,
  Settings
};
const Tabs = createBottomTabNavigator(TabsRoutes);

const HomeStackRoutes = {
  Tabs,
  User
};
const HomeStack = createStackNavigator(HomeStackRoutes);

const IntroStack = createStackNavigator(
  {
    About,
    Contacts,
    Tabs
  },
  {
    initialRouteKey: "About",
    navigationOptions: { tabBarVisible: false }
  }
);

class GiveScreenPropsWrapper extends React.Component {
  static router = HomeStack.router;
  render() {
    const { navigation, ...rest } = this.props;

    // why tabs has to be added to the introstack nav? this fucks it up. even though tabs is down in the stack ,its still rendered, weird RN3...
    if (rest.device.seenIntro) {
      console.log("seenintro");
      return <HomeStack navigation={navigation} screenProps={rest} />;
    } else {
      console.log("not seen intro");
      return <IntroStack navigation={navigation} screenProps={rest} />;
    }
  }
}

const MainRoutes = connect(
  store => ({ ...store.data }),
  dispatch => ({ dispatch })
)(GiveScreenPropsWrapper);

const AppContainer = createAppContainer(MainRoutes);

export default AppContainer;
