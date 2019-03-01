import React from "react";
import { View, Image, Text } from "react-native";

const SIZE = 100;
const IMAGE_SIZE = SIZE * 0.8;

// todo : add PureIconLabel in the mix using user.suggestions
// an array of suggestions which are icons and activitynames

export default (PureUserCard = props => {
  const { user } = props;

  const imageOrName = user.image ? (
    <Image
      source={{ uri: user.image }}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2
      }}
    />
  ) : (
    <Text>{user.name}</Text>
  );
  return (
    <View
      style={{
        width: SIZE,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE / 2,
          backgroundColor: "#CCC"
        }}
      >
        {imageOrName}
      </View>

      {user.notes ? <Text>{user.notes}</Text> : null}
    </View>
  );
});
