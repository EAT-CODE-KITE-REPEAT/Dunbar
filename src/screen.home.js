import React from "react";
import { FlatList, View, Text } from "react-native";
import UserCard from "./pure.user.card";

class Home extends React.Component {

  renderItem = ({ item, index }) => (
    <UserCard
      index={index}
      screenProps={this.props.screenProps}
      navigate={this.props.navigation.navigate}
      user={item}
    />
  );

  renderEmpty = () => <Text>No contacts yet!</Text>;
  render() {
    const {
      screenProps: {
        contacts,
        device: { hasEdited },
      },
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {contacts.length === 0 ? (
          this.renderEmpty()
        ) : (
          <FlatList
            extraData={[contacts.length, hasEdited]}
            numColumns={3}
            keyExtractor={item => item.id}
            data={contacts}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }

}

export default Home;
