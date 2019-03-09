/*
TEAM INFO (INFO ABOUT ME)
*/
import React from "react";
import { Linking, View, Text } from "react-native";
import Button from "./pure.button";
import { whatsappAction } from "./index.util";

class About extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text>
          This app was created in just 24 hours (within a single week) by one
          person. If you want to learn more about how I do this, visit my
          website.
        </Text>
        <Button
          title="My website"
          onPress={() => Linking.openURL("https://karsens.com/")}
        />

        <Text>
          Do you have feedback or suggestions for the app to improve? Or do you
          just want to see the process and progress of the app? Do you like to
          be more involved? This is all very welcome! Join us on Github.
        </Text>
        <Button
          title="Ideas & Suggestions GitHub Issue"
          onPress={() =>
            Linking.openURL(
              "https://github.com/EAT-CODE-KITE-REPEAT/Dunbar/issues/2/"
            )
          }
        />

        <Text>You can also just send me a message on WhatsApp:</Text>
        <Button
          title="WhatsApp me"
          onPress={() => whatsappAction("31681904650")}
        />
      </View>
    );
  }

}
export default About;
