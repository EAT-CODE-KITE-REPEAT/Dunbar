/*
TEAM INFO (INFO ABOUT ME)
*/
import React from "react";
import { Linking, View, Text, Button } from "react-native";

class About extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text>
          This app was created in a sprint of 5 days. Read more about it here:
        </Text>
        <Button
          title="My website"
          onPress={() => Linking.openURL("https://karsens.com/")}
        />
      </View>
    );
  }

}
export default About;
