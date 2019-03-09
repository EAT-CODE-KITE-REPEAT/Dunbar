import { Linking } from "react-native";

const formattedWhatsappNumber = phone => {
  const formatted = phone.replace(/[- )(]/g, "");

  //should only be done if user lives in the netherlands, but fine for PoC
  const noZero =
    formatted[0] === "0"
      ? "31" + formatted.substring(1, formatted.length)
      : formatted;

  return noZero;
};

const whatsappAction = phone =>
  Linking.openURL(`whatsapp://send?phone=${formattedWhatsappNumber(phone)}`);

export { whatsappAction };
