import React from "react";
import expo from "expo";

import { inputs, FieldComponent } from "leckr-inputs";
import _DataForm from "react-native-data-forms";

//this is needed for image upload
const firebaseConfig = {
  apiKey: "?",
  authDomain: "?",
  databaseURL: "?",
  projectId: "?",
  storageBucket: "?",
  messagingSenderId: "?",
};

//this is needed for the location type
const googlePlacesConfig = {
  key: "?",
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
