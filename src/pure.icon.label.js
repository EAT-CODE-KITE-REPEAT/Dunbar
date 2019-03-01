import React from "react";
import { View } from "react-native";

const SIZE = 16;

export default (PureIconLabel = ({ icon, color }) => {
  return (
    <View
      style={{
        backgroundColor: color || "red",
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
      }}
    >
      {icon}
    </View>
  );
});
