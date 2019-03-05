import React from "react";
import {
  Dimensions,
  Linking,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { WebBrowser } from "expo";

const { width } = Dimensions.get("screen");
const MARGIN = 10;
const SIZE = width / 3 - MARGIN * 2;
const IMAGE_SIZE = SIZE * 1;

const openUrl = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      WebBrowser.openBrowserAsync(url);
    }
  });
};

const formattedPhoneNumber = phone => phone.replace(/[- )(]/g, "");
// todo : add PureIconLabel in the mix using user.suggestions
// an array of suggestions which are icons and activitynames

const PureUserCard = props => {
  const { user } = props;

  const imageOrName = user.image ? (
    <Image
      source={{ uri: user.image }}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
      }}
    />
  ) : (
    <Text>{user.name}</Text>
  );
  return (
    <TouchableOpacity
      style={{
        margin: MARGIN,
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        openUrl(
          `https://api.whatsapp.com/send?phone=${formattedPhoneNumber(
            user.phone
          )}`
        );
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

      {user.notes ? <Text>{user.notes}</Text> : null}
    </TouchableOpacity>
  );
};

export default PureUserCard;
