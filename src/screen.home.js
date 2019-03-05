import React from "react";
import { FlatList, View, Text } from "react-native";
import UserCard from "./pure.user.card";

class Home extends React.Component {

  renderItem = ({ item }) => <UserCard user={item} />;
  renderEmpty = () => <Text>No contacts yet!</Text>;
  render() {
    const {
      screenProps: { contacts },
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={3}
          keyExtractor={item => item.id}
          data={contacts}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }

}

export default Home;
