import React from "react";
import { Button, TouchableOpacity, Text, Platform } from "react-native";

const MyButton = props =>
  Platform.OS === "ios" ? (
    <Button {...props} />
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={[
          { color: "#177ffb", textAlign: "center", margin: 8, fontSize: 18 },
          props.style,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );

export default MyButton;
