import React from "react";
import { FlatList } from "react-native";

class Home extends React.Component {
  render() {
    const { store, dispatch } = this.props;

    return <FlatList data={store.contacts} />;
  }
}

export default Home;
