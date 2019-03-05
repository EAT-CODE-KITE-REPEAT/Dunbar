/*
Information about Dunbar. Example of how it will look (slide through info)

google: dunbar number
https://www.fullcontact.com/blog/maintaining-relationships/

*/
import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: 0,
    };
  }

  render() {
    const { navigation } = this.props;

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
      "In short: Maintain Good Relationships",
    ];

    const sentence = sentences[clicked];
    const last = clicked === sentences.length - 1;
    const fontSize = sentence.length < 5 ? 150 : sentence.length < 50 ? 20 : 16;
    const TouchOrView = last ? View : TouchableOpacity;

    return (
      <TouchOrView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => (last ? null : this.setState({ clicked: clicked + 1 }))}
      >
        <Text style={{ fontSize }}>{sentence}</Text>
        {last ? (
          <Button
            title="Select contacts"
            onPress={() => navigation.navigate("contacts")}
          />
        ) : null}
      </TouchOrView>
    );
  }

}
export default About;
