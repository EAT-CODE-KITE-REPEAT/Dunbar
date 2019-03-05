import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Icon } from "expo";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import { connect } from "react-redux";

import About from "./screen.about";
import Intro from "./screen.intro";
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

const HomeStack = createStackNavigator({
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
});

const IntroStack = createStackNavigator({
  Intro,
  Contacts,
});

class _AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);

    this.choose(props.device);
  }

  choose = device =>
    this.props.navigation.navigate(
      device.seenIntro ? "MainRoutes" : "IntroStack"
    );

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

}

const AuthLoadingScreen = connect(
  store => ({ ...store.data }),
  dispatch => ({ dispatch })
)(_AuthLoadingScreen);

const MainSwitch = createSwitchNavigator(
  {
    AuthLoadingScreen,
    HomeStack,
    IntroStack,
  },
  {
    initialRouteName: "AuthLoadingScreen",
  }
);

const AppContainer = createAppContainer(MainSwitch);

export default AppContainer;
