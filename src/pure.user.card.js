import React from "react";
import {
  Dimensions,
  Linking,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Text,
} from "react-native";
import ActionSheet from "react-native-super-actionsheet";
import { whatsappAction } from "./index.util";

const { width } = Dimensions.get("screen");
const MARGIN = 10;
const SIZE = width / 3 - MARGIN * 2;
const IMAGE_SIZE = SIZE * 1;

const openExternal = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
    else {
      Alert.alert("Cannot open this");
    }
  });
};

const formattedPhoneNumber = phone => phone.replace(/[- )(]/g, "");

const unfavoriteAction = (user, dispatch) => {
  dispatch({ type: "REMOVE_FAVORITES", value: [user] });
};

const PureUserCard = props => {
  const {
    index,
    user,
    screenProps: { device, dispatch },
    navigate,
  } = props;

  this.actionSheet = Array;

  const phone = user.phoneNumbers && user.phoneNumbers[0].number;

  const imageOrName = user.imageAvailable ? (
    <Image
      source={{ uri: user.image.uri }}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
      }}
    />
  ) : (
    <Text>{user.name}</Text>
  );

  const callAction = () => openExternal(`tel:${formattedPhoneNumber(phone)}`);
  const userAction = () => navigate("User", { user });

  let n = 0;

  let buttons = [];

  if (phone) {
    buttons = buttons.concat([
      { index: n++, title: "Call", onPress: callAction },
      { index: n++, title: "Whatsapp", onPress: () => whatsappAction(phone) },
    ]);
  }

  buttons = buttons.concat([
    { index: n++, title: "Profile", onPress: userAction },
    {
      index: n++,
      title: "Remove from this list",
      onPress: () => unfavoriteAction(user, dispatch),
      destructive: true,
    },
    { index: n++, title: "Cancel", cancel: true },
  ]);

  return (
    <TouchableOpacity
      style={{
        margin: MARGIN,
        width: SIZE,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      onPress={() => this.actionSheet[index].show()}
      onLongPress={() => {
        if (device.favoriteAction === "phone") {
          callAction();
        }
        else if (device.favoriteAction === "user") {
          userAction();
        }
        else {
          whatsappAction(phone);
        }
      }}
    >
      <View
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#CCC",
        }}
      >
        {imageOrName}
      </View>

      <ActionSheet
        reference={ref => (this.actionSheet[index] = ref)}
        data={buttons}
      />

      {user.note ? <Text>{user.note}</Text> : null}
    </TouchableOpacity>
  );
};

export default PureUserCard;
