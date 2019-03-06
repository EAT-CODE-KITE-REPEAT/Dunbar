import React from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
// import Image from "./wrapper.super.image";
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
      { text: "150" },
      {
        text:
          "According to Robin Dunbar, that's the amount of people you can maintain stable relationships with.",
        image: require("./img/dunbar.jpg"),
      },
      { text: "The app aims to" },
      {
        text: "Stimulate real interactions",
        image: require("./img/realinteractions.jpg"),
      },
      {
        text: "Stimulate real activities",
        image: require("./img/realactivities.jpg"),
      },
      {
        text: "Stimulate ongoing relationships",
        image: require("./img/ongoingrelationship.jpg"),
      },
      {
        text: "Find mutual interests",
        image: require("./img/mutualinterest.jpg"),
      },
      {
        text: "Stimulate fewer but stronger connections",
        image: require("./img/fewerstronger.jpg"),
      },
      {
        text: "Stimulate spending less time on your phone",
        image: require("./img/screentime.jpg"),
      },
      {
        text: "In short: Maintain Good Relationships",
        image: require("./img/maintaingoodrelationships.jpg"),
      },
    ];

    const item = sentences[clicked];
    const last = clicked === sentences.length - 1;
    const fontSize =
      item.text.length < 5 ? 150 : item.text.length < 50 ? 20 : 16;
    const TouchOrView = last ? View : TouchableOpacity;

    return (
      <TouchOrView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => (last ? null : this.setState({ clicked: clicked + 1 }))}
      >
        {item.image ? (
          <Image
            source={item.image}
            style={{ width: "100%" }}
            resizeMode="contain"
          />
        ) : null}

        <View style={{ position: "absolute", top: 150 }}>
          <Text style={{ fontSize }}>{item.text}</Text>
        </View>

        {last ? (
          <Button
            title="Select contacts"
            onPress={() => navigation.navigate("Contacts")}
          />
        ) : null}
      </TouchOrView>
    );
  }

}
export default About;
