/*
Longpress on a user gets you here (or add new user)

Here you can see more details, add more details, or delete, or see more actions.

In the future, we can create online profiles with connections, which will be interesting!
*/

import React from "react";
import { View, Text } from "react-native";

class User extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Form can be empty (new contact), or full (edit)</Text>
      </View>
    );
  }

}
export default User;
