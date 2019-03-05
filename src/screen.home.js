import React from "react";
import { TouchableOpacity, FlatList, View, Text } from "react-native";
import UserCard from "./pure.user.card";

class Home extends React.Component {
  renderItem = ({ item, index }) => <UserCard user={item} />;
  render() {
    const {
      screenProps: { contacts }
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>HOME</Text>
        <FlatList
          numColumns={3}
          keyExtractor={item => item.id}
          data={contacts}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Home;
