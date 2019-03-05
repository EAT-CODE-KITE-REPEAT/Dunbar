import React from "react";
import { Icon } from "expo";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import { connect } from "react-redux";

import About from "./screen.about";
import Home from "./screen.home";
import Contacts from "./screen.contacts";
import User from "./screen.user";
import Settings from "./screen.settings";
import Team from "./screen.team";
import More from "./screen.more";
import Keypad from "./screen.keypad";

const TabsRoutes = {
  Home,
  Contacts,
  Keypad,
  More,
};

const Tabs = createBottomTabNavigator(
  TabsRoutes,

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        const iconNames = {
          Home: "users",
          Contacts: "book",
          Keypad: "ios-keypad",
          More: "bars",
        };

        const iconComponents = {
          Keypad: Icon.Ionicons,
        };

        const IconComponent = iconComponents[routeName]
          ? iconComponents[routeName]
          : Icon.FontAwesome;

        // You can return any component that you like here!
        return (
          <IconComponent
            name={iconNames[routeName]}
            size={25}
            color={tintColor}
          />
        );
      },
      tabBarLabel: () => null,
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    },
  }
);

Tabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    headerTitle: routeName,
    headerTitleStyle: { fontSize: 30 },
  };
};

const HomeStackRoutes = {
  Tabs,
  User: {
    screen: User,
    navigationOptions: () => ({
      headerTitle: "Contact info",
    }),
  },
  Team: {
    screen: Team,
    navigationOptions: () => ({
      headerTitle: "About the creator",
    }),
  },
  About: {
    screen: About,
    navigationOptions: () => ({
      headerTitle: "About the app",
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      headerTitle: "Settings",
    }),
  },
};
const HomeStack = createStackNavigator(HomeStackRoutes);

const IntroStack = createStackNavigator(
  {
    About,
    Contacts,
    Tabs,
  },
  {
    initialRouteKey: "About",
    navigationOptions: { tabBarVisible: false },
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
    }
    else {
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
