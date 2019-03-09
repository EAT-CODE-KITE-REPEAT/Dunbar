import React from "react";
import { Icon } from "expo";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

const defaultIconComponent = Icon.Entypo;

const PAGES = [
  {
    screen: "About",
    title: "About the app",
    icon: "info",
  },

  {
    screen: "Team",
    title: "Feedback & Team",
    icon: "users",
    iconComponent: Icon.FontAwesome,
  },

  {
    screen: "Settings",
    title: "Settings",
    icon: "settings",
    iconComponent: Icon.MaterialIcons,
  },
];

class More extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: 0,
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={PAGES}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={({ item, index }) => {
            const IconComponent = item.iconComponent
              ? item.iconComponent
              : defaultIconComponent;
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}
                style={{
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  width: "100%",
                  height: 40,
                  alignItems: "center",
                }}
                key={`i-${index}`}
              >
                <IconComponent
                  name={item.icon}
                  size={24}
                  style={{ marginHorizontal: 10 }}
                />
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{ backgroundColor: "#ccc", height: 1, width: "100%" }}
            />
          )}
        />
      </View>
    );
  }

}
export default More;
