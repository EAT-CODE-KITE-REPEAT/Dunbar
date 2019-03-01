/*
1. Include About screen here 
2. Require contact access. Make user search and select contacts, minimum 5.
3. Completed: show Home
*/
import React from "react";
import { View, Text } from "react-native";

class Intro extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Needed contact access. Allow</Text>
      </View>
    );
  }
}
export default Intro;
