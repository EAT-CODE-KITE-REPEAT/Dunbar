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
import { WebBrowser } from "expo";
import ActionSheet from "react-native-super-actionsheet";
const { width } = Dimensions.get("screen");
const MARGIN = 10;
const SIZE = width / 3 - MARGIN * 2;
const IMAGE_SIZE = SIZE * 1;

const openExternal = url => {
  console.log("Url?", url);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
    else {
      Alert.alert("Cannot open this");
    }
  });
};

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
  const { user, device, navigate } = props;

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

  const callAction = () =>
    openExternal(`tel:${formattedPhoneNumber(user.phone)}`);
  const whatsappAction = () =>
    openUrl(
      `https://api.whatsapp.com/send?phone=${formattedPhoneNumber(user.phone)}`
    );
  const userAction = () => navigate("User");

  return (
    <TouchableOpacity
      style={{
        margin: MARGIN,
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => this.actionSheet.show()}
      onLongPress={() => {
        if (device.favoriteAction === "phone") {
          callAction();
        }
        else if (device.favoriteAction === "user") {
          userAction();
        }
        else {
          whatsappAction();
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
        reference={ref => (this.actionSheet = ref)}
        data={[
          { index: 0, title: "Call", onPress: callAction },
          { index: 1, title: "Whatsapp", onPress: whatsappAction },
          { index: 2, title: "Profile", onPress: userAction },
          { index: 3, title: "Cancel", cancel: true },
        ]}
      />

      {user.notes ? <Text>{user.notes}</Text> : null}
    </TouchableOpacity>
  );
};

export default PureUserCard;
