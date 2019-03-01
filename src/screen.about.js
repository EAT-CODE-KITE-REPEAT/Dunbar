/*
Information about Dunbar. Example of how it will look (slide through info)

google: dunbar number
https://www.fullcontact.com/blog/maintaining-relationships/

*/

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: 0
    };
  }
  render() {
    const { store, dispatch } = this.props;

    const { clicked } = this.state;

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
      "In short: Maintain Good Relationships"
    ];

    const sentence = sentences[clicked];
    const fontSize = 150 / sentence.length;
    return (
      <TouchableOpacity
        onPress={() =>
          clicked >= sentences.length
            ? null
            : this.setState({ clicked: clicked + 1 })
        }
      >
        <Text style={{ fontSize }}>{sentence}</Text>
      </TouchableOpacity>
    );
  }
}
export default About;
