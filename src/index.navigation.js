import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Icon } from "expo";
import { screens } from "leckr-inputs";

import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";

import { connect } from "react-redux";
import Button from "./pure.button";

import Intro from "./screen.intro";
import Home from "./screen.home";
import Contacts from "./screen.contacts";
import User from "./screen.user";
import Settings from "./screen.settings";
import Team from "./screen.team";
import More from "./screen.more";
import Keypad from "./screen.keypad";

const giveRedux = screen =>
  connect(
    store => ({ ...store.data }),
    dispatch => ({ dispatch })
  )(screen);

const IntroStack = createStackNavigator({
  Intro,
  Contacts: { screen: props => <Contacts isIntro {...props} /> },
});

const Tabs = createBottomTabNavigator(
  {
    Home,
    Contacts,
    Keypad,
    More,
  },
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

const HomeStack = createStackNavigator({
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
    screen: () => <Intro isAbout />,
    //NB: Should eventually use About screen with more info.
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
  ...screens,
});

//** Default NavigationOptions */
Tabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  const contactsButton = (
    <Button onPress={() => navigation.getParam("switchEdit")} title="Edit" />
  );
  return {
    headerTitle: routeName,
    // NB: Doesn't work yet because can't pass params from nested navs :( see guide
    //headerRight: routeName === "Contacts" ? contactsButton : null,
    headerTitleStyle: { fontSize: 30 },
  };
};

HomeStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    headerTitle: routeName,
    headerTitleStyle: { fontSize: 30 },
  };
};

class NavLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    const device = props.screenProps?.device;
    this.navigateToRoutes(device);
  }

  navigateToRoutes = device =>
    this.props.navigation.navigate(
      device.seenIntro ? "HomeStack" : "IntroStack"
    );

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

}

const MainSwitch = createSwitchNavigator({
  NavLoadingScreen,
  HomeStack,
  IntroStack,
});

class MainSwitchWrapper extends React.Component {

  /**
   * This wrapper is needed to pass the redux store/dispatcher to the screenProps of the MainSwitch (the main nav). The static router makes it possible to keep this component a nav by using a pointer.
   */
  static router = MainSwitch.router;
  render() {
    const { navigation, ...rest } = this.props;
    return <MainSwitch navigation={navigation} screenProps={rest} />;
  }

}

const AppContainer = createAppContainer(giveRedux(MainSwitchWrapper));

export default AppContainer;
