import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    const { store, dispatch } = this.props;

    return <FlatList data={store.contacts} />;
  }
}

const mapStateToProps = store => ({ store });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
