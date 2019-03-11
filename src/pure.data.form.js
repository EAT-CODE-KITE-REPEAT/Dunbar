import React from "react";
import * as expo from "expo";

import { inputs, FieldComponent } from "leckr-inputs";
import _DataForm from "react-native-data-forms";

const firebaseConfig = require("./firebase.json");

const googlePlacesConfig = require("./google.json");

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
