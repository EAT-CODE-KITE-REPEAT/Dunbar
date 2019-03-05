import React from "react";
import { View, Text } from "react-native";

class About extends React.Component {

  render() {
    const sentences = [
      "150",
      "According to Robin Dunbar, that's the amount of people you can maintain stable relationships with.",
      "The app aims to",
      "Stimulate real interactions",
      "Stimulate real activities",
      "Stimulate ongoing relationships",
      "Find mutual interests",
      "Stimulate fewer but stronger connections",
      "Stimulate spending less time on your phone",
      "In short: Maintain Good Relationships",
    ];

    return (
      <View style={{ flex: 1 }}>
        <Text>{sentences.map(s => s)}</Text>
      </View>
    );
  }

}
export default About;
