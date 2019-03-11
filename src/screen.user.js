import React from "react";
import DataForm from "./pure.data.form";
import { Field } from "react-native-data-forms/types";
import { View } from "react-native";
const fields: Field[] = [
  {
    field: "image",
    type: "coverImage",
    //mapFieldsToDB: { url: "image2", thumbUrl: "image" },
  },

  {
    field: "name",
    title: "Name",
  },

  {
    field: "email",
    title: "E-Mail",
  },

  {
    field: "number",
    title: "Phone-number",
    type: "phone",
  },

  {
    field: "note",
    title: "Notes",
    type: "textArea",
  },

  // {
  //   field: "date",
  //   title: "Date",
  //   type: "date",
  // },

  // {
  //   field: "STARTEND",
  //   titles: {
  //     start: "Start",
  //     end: "End",
  //   },
  //   mapFieldsToDB: {
  //     start: "eventAt",
  //     end: "eventEndAt",
  //   },
  //   startSection: true,
  //   type: "dates",
  // },

  // {
  //   startSection: true,
  //   field: "color",
  //   title: "Color",
  //   type: "color",
  // },

  // {
  //   field: "boolean",
  //   title: "Yes or no?",
  //   type: "boolean",
  // },

  // {
  //   startSection: true,
  //   field: "LOCATION",
  //   mapFieldsToDB: {
  //     address: "address",
  //     city: "city",
  //     mapsurl: "mapsurl",
  //     country: "country",
  //     latitude: "latitude",
  //     longitude: "longitude",
  //   },
  //   title: "Address",
  //   type: "location",
  // },

  {
    field: "contactAmount",
    title: "How often do you want to contact?",
    type: "selectOne",
    values: [
      { value: 1, label: "Every day" },
      { value: 2, label: "Every week" },
      { value: 3, label: "Every month" },
    ],
  },

  // {
  //   field: "selectMultiple",
  //   title: "Select multiple options",
  //   type: "selectMultiple",
  //   values: ["option 1 ", "option 2 ", "option 3"],
  // },
];

class User extends React.Component {

  render() {
    const {
      navigation: {
        goBack,
        state: { params },
      },
      screenProps: { dispatch },
    } = this.props;

    if (!params || !params.user) {
      return <View />;
    }

    const values = {
      image: params.user.image?.uri || null,
      name: params.user.name || "",
      email: (params.user.emails && params.user.emails[0].email) || "",
      number:
        (params.user.phoneNumbers && params.user.phoneNumbers[0].number) || "",
      note: params.user.note || "",
      contactAmount: params.user.contactAmount || 0,
    };

    const dispatchPromise = async value => {
      //1map
      let contact = {};

      if (value.image) {
        contact.image = { uri: value.image };
        contact.imageAvailable = true;
      }
      if (value.name) {
        contact.name = value.name;
      }
      if (value.email) {
        contact.emails = [{ email: value.email }];
      }
      if (value.number) {
        contact.phoneNumbers = [{ number: value.number }];
      }
      if (value.contactAmount) {
        contact.contactAmount = value.contactAmount;
      }
      if (value.note) {
        contact.note = value.note;
      }

      contact.id = params.user?.id;

      //2dispatch
      await dispatch({
        type: "UPSERT_USER",
        value: contact,
      });

      // 3 contact api
      // doesn't seem to work yet... also, need to distinguish between updating and creating! also, ios only
      // const updatedId = Contacts.updateContactAsync(contact);
      // console.log("updated ios contact", updatedId);
      return true;
    };

    return (
      <DataForm
        fields={fields}
        submitAll={params && params.createContact}
        onComplete={() => goBack()}
        mutate={dispatchPromise}
        completeButton="Save"
        values={values}
        noNavigationBelow
        {...this.props}
      />
    );
  }

}

export default User;
