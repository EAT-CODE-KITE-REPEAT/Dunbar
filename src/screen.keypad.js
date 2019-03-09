import React from "react";
import {
  Linking,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
  Text,
} from "react-native";
import { Icon } from "expo";
import Button from "./pure.button";

const { height, width } = Dimensions.get("screen");

const FONTSIZE = 33;
const MARGIN_HORIZONTAL = 10;
const MARGIN_VERTICAL = 5;

const SIZE_VERTICAL = height / 6 - MARGIN_VERTICAL * 9;
const SIZE_HORIZONTAL = width / 3 - MARGIN_HORIZONTAL * 5;
const SIZE = SIZE_VERTICAL < SIZE_HORIZONTAL ? SIZE_VERTICAL : SIZE_HORIZONTAL;

const openURL = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
    else {
      Alert.alert("Cannot open this");
    }
  });
};

class Keypad extends React.Component {

  constructor(props) {
    super(props);
    this.state = { number: null };
  }

  renderButtonOrContact = number => {
    const { navigation } = this.props;
    const numberIsContact = false;

    let contactName;
    if (numberIsContact) {
      contactName = "Wouter";
    }

    return number ? (
      numberIsContact ? (
        <Text>{contactName}</Text>
      ) : (
        <Button
          title="Add number"
          onPress={() =>
            navigation.navigate("User", {
              user: { phoneNumbers: [{ number }] },
              createContact: true,
            })
          }
        />
      )
    ) : null;
  };

  renderNumpad = ({ value, index, onPress, backgroundColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginHorizontal: MARGIN_HORIZONTAL,
        marginVertical: MARGIN_VERTICAL,
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        backgroundColor: backgroundColor || "#DDD",
      }}
      key={`index-${index}`}
    >
      <Text style={{ fontSize: FONTSIZE, fontWeight: "500" }}>{value}</Text>
    </TouchableOpacity>
  );

  render() {
    const { number } = this.state;

    const callIcon = <Icon.Ionicons name="ios-call" size={40} color="white" />;
    const backspaceIcon = (
      <Icon.Ionicons name="ios-backspace" size={40} color="#CCC" />
    );
    const emptyThing = (
      <View style={{ width: SIZE, height: SIZE, margin: MARGIN_HORIZONTAL }} />
    );

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ height: 80, marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: FONTSIZE }}>{number}</Text>
          {this.renderButtonOrContact(number)}
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            width: "80%",
            // alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", "0", "#"].map((value, index) =>
            this.renderNumpad({
              value,
              index,
              onPress: () => {
                const newNumber = this.state.number
                  ? this.state.number + value.toString()
                  : value.toString();
                this.setState({ number: newNumber });
              },
            })
          )}
          {emptyThing}
          {this.renderNumpad({
            value: callIcon,
            index: "call",
            backgroundColor: "lime",
            onPress: () => openURL(`tel:${this.state.number}`),
          })}

          {this.state.number
            ? this.renderNumpad({
              value: backspaceIcon,
              index: "backspace",
              backgroundColor: "transparent",
              onPress: () =>
                this.setState({
                  number: this.state.number.substring(
                    0,
                    this.state.number.length - 1
                  ),
                }),
            })
            : emptyThing}
        </View>
      </View>
    );
  }

}
export default Keypad;
