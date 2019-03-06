import React from "react";
import { ScrollView, Button, Text } from "react-native";
import { Updates } from "expo";
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showDevice: false };
  }

  render() {
    const {
      screenProps: { device, dispatch },
    } = this.props;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>Settings {device.seenIntro} </Text>

        <Button title="Purge" onPress={() => dispatch({ type: "PURGE" })} />

        <Button
          title="Set default action to 'phone'"
          onPress={() =>
            dispatch({
              type: "SET_DEVICE",
              value: { favoriteAction: "phone" },
            })
          }
        />

        <Button
          title="Set default action to 'whatsapp'"
          onPress={() =>
            dispatch({
              type: "SET_DEVICE",
              value: { favoriteAction: "whatsapp" },
            })
          }
        />

        <Button
          title="Set default action to 'user'"
          onPress={() =>
            dispatch({
              type: "SET_DEVICE",
              value: { favoriteAction: "user" },
            })
          }
        />

        <Button
          title="Show device state"
          onPress={() => this.setState({ showDevice: true })}
        />

        {this.state.showDevice ? (
          <Text>{JSON.stringify(this.props.screenProps.device)}</Text>
        ) : null}

        <Button title="Reload app" onPress={() => Updates.reload()} />
      </ScrollView>
    );
  }

}

export default Home;
