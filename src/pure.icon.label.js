import React from "react";
import { View } from "react-native";

const SIZE = 16;

const PureIconLabel = ({ icon, color }) => {
  return (
    <View
      style={{
        backgroundColor: color || "red",
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
      }}>
      {icon}
    </View>
  );
};

export default PureIconLabel;
