import React from "react";
import { Button, View, Text } from "react-native";
import { Updates } from "expo";
class Home extends React.Component {
  render() {
    const {
      screenProps: { device, dispatch }
    } = this.props;

    console.log("device", device);
    return (
      <View style={{ flex: 1 }}>
        <Text>Settings {device.seenIntro} </Text>

        <Button title="Purge" onPress={() => dispatch({ type: "PURGE" })} />

        <Button
          title="Set default action to 'phone'"
          onPress={() =>
            dispatch({
              type: "SET_DEVICE",
              value: { whatsappOrPhone: "phone" }
            })
          }
        />

        <Button
          title="Set default action to 'whatsapp'"
          onPress={() =>
            dispatch({
              type: "SET_DEVICE",
              value: { whatsappOrPhone: "whatsapp" }
            })
          }
        />

        <Button title="Reload app" onPress={() => Updates.reload()} />
      </View>
    );
  }
}

export default Home;
