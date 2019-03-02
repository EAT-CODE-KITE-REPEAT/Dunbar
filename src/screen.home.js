import React from "react";
import { FlatList, View, Text } from "react-native";

class Home extends React.Component {
  render() {
    const { contacts, dispatch } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>JKLAJLKASDJLKFJDFKLAJ</Text>
        <FlatList data={contacts} />
      </View>
    );
  }
}

export default Home;
