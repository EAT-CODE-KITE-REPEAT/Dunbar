import React from "react";
import * as expo from "expo";

import { inputs, FieldComponent } from "leckr-inputs";
import _DataForm from "react-native-data-forms";

const firebaseConfig = {
  apiKey: "AIzaSyAlDI2KXUKX1RdOMDDNZZb-Jpe5x2Y9I14",
  authDomain: "dunbar-4acff.firebaseapp.com",
  databaseURL: "https://dunbar-4acff.firebaseio.com",
  projectId: "dunbar-4acff",
  storageBucket: "dunbar-4acff.appspot.com",
  messagingSenderId: "599809854716",
};

const googlePlacesConfig = {
  key: "AIzaSyCALdVx7eadLISirPX800rlXUlUcdpX7nY",
};

const DataForm = props => {
  //initialize our input types with the props they need
  const leckrInputs = inputs({
    firebaseConfig,
    googlePlacesConfig,
    expo,
    navigation: props.navigation,
  });

  const inputTypes = {
    ...leckrInputs,
    //add your own custom types
  };

  const allProps = {
    ...props,
    inputTypes,
    FieldComponent,
  };

  return <_DataForm {...allProps} />;
};

export default DataForm;
