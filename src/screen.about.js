import React from "react";
import { View, Text } from "react-native";

class About extends React.Component {

  render() {
    const sentences = [
      "150",
      "According to Robin Dunbar, that's the amount of people you can maintain stable relationships with.",
      "With this app we aim to:",
      "Stimulate real interactions",
      "Stimulate real activities",
      "Stimulate ongoing relationships",
      "Find mutual interests",
      "Find new friends through your friends friends",
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
