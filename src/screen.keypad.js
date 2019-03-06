import React from "react";
import {
  Linking,
  Button,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { Icon } from "expo";
const { width } = Dimensions.get("screen");

const FONTSIZE = 33;
const MARGIN = 10;
const SIZE = width / 3 - MARGIN * 5;

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
        marginHorizontal: MARGIN,
        marginVertical: MARGIN / 2,
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
      <View style={{ width: SIZE, height: SIZE, margin: MARGIN }} />
    );

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 80, marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: FONTSIZE }}>{number}</Text>
          {this.renderButtonOrContact(number)}
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
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
      </ScrollView>
    );
  }

}
export default Keypad;
