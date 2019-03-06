import React from "react";
import {
  FlatList,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
} from "react-native";
import { Contacts, Permissions, Icon } from "expo";
import FAB from "./pure.floating.action.button";
import KeyboardSpacer from "react-native-keyboard-spacer";
// weriedkddk  dksksdlfd
//sdfksd
const MINIMUM_SELECTED = 5;

class ContactsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: props.isIntro || false,
      contacts: [],
      selected: [],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      switchEdit: () => this.setState({ isEditing: !this.state.isEditing }),
    });
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== "granted") {
      Alert.alert("Sorry. We need access");
    }
    else {
      this.syncContacts();
    }
  }

  syncContacts() {
    Contacts.getContactsAsync()
      .then(({ data }) => {
        this.setState({
          contacts: data,
        });
      })
      .catch(e => console.warn(e));
  }

  renderItem({ index, item }) {
    const { selected, isEditing } = this.state;
    const {
      navigation: { navigate },
      screenProps: { contacts },
    } = this.props;

    const favIds = contacts ? contacts.map(f => f.id) : [];
    const isFav = favIds.includes(item.id);

    const ids = selected ? selected.map(s => s.id) : [];
    const already = ids.includes(item.id);

    const switchSelection = () => {
      let newSelected = selected;
      if (already) {
        newSelected = selected.filter(s => s.id !== item.id);
      }
      else {
        newSelected.push(item);
      }

      this.setState({ selected: newSelected });
    };

    const goToUser = () => navigate("User", { user: item });

    const phone = item.phoneNumbers && item.phoneNumbers[0].number;

    return (
      <TouchableOpacity
        onPress={isEditing ? switchSelection : goToUser}
        style={{
          height: 50,

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {isEditing ? (
            <Icon.MaterialCommunityIcons
              size={24}
              style={{ margin: 10 }}
              name={
                already ? "checkbox-marked-outline" : "checkbox-blank-outline"
              }
            />
          ) : null}
          <View>
            <Text style={{ fontSize: 16 }} key={`key-${index}`}>
              {item.name || (item.emails && item.emails[0].email)}
            </Text>
            <Text style={{ fontSize: 12, color: "#AAA" }}>{phone}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {isFav ? <Icon.AntDesign name="star" size={24} color="gold" /> : null}
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator = () => (
    <View
      style={{ marginHorizontal: 10, height: 1, backgroundColor: "#CCC" }}
    />
  );

  renderSearchBar = () => (
    <View
      style={{
        height: 35,
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: "row",
        backgroundColor: "#DDD",
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Icon.Ionicons
        style={{ margin: 5 }}
        color="#AAA"
        name="ios-search"
        size={24}
      />
      <TextInput
        style={{ flex: 1, height: 35 }}
        placeholder="Search"
        onChangeText={search => this.setState({ search })}
      />
    </View>
  );

  renderHeader = () => {
    const { selected, isEditing } = this.state;
    return (
      <View>
        {this.renderSearchBar()}

        {isEditing ? (
          <View
            style={{
              height: 50,
              marginHorizontal: 10,
              justifyContent: "center",
            }}
          >
            <Text>
              {selected && selected.length > 0 ? selected.length : "None"}{" "}
              selected
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  addFavorites = () => {
    const {
      isIntro,
      screenProps: { dispatch },
      navigation: { navigate },
    } = this.props;
    const { selected } = this.state;

    dispatch({ type: "ADD_FAVORITES", value: selected });
    if (isIntro) {
      dispatch({ type: "SET_DEVICE", value: { seenIntro: true } });
      navigate("HomeStack");
    }
    this.setState({ selected: [] });
  };

  removeFavorites = () => {
    const {
      screenProps: { dispatch },
    } = this.props;
    const { selected } = this.state;

    dispatch({ type: "REMOVE_FAVORITES", value: selected });
    this.setState({ selected: [] });
  };

  deleteContacts = () => {
    const { selected } = this.state;

    //remove all contacts you selected from your contact list, and also from favorites
    this.removeFavorites();

    Promise.all(
      selected.map(contact => Contacts.removeContactAsync(contact.id))
    ).then(() => {
      this.syncContacts();
    });
  };

  renderFooter = () => {
    const { isIntro } = this.props;
    const { selected } = this.state;

    const needMore = selected.length < MINIMUM_SELECTED;
    const howManyMore = MINIMUM_SELECTED - selected.length;

    const content = isIntro ? (
      <Button
        disabled={needMore}
        title={needMore ? `Select ${howManyMore} more` : "Save"}
        onPress={this.addFavorites}
      />
    ) : selected.length > 0 ? (
      <View>
        <FAB
          text="Favorite"
          backgroundColor="green"
          onPress={this.addFavorites}
        />
        <FAB
          text="Unfavorite"
          position={1}
          backgroundColor="yellow"
          icon="minus"
          IconFont={Icon.FontAwesome}
          iconColor="black"
          onPress={this.removeFavorites}
        />
        {Platform.OS === "ios" ? (
          <FAB
            text="Remove"
            position={2}
            icon="trash"
            IconFont={Icon.Entypo}
            backgroundColor="red"
            onPress={this.deleteContacts}
          />
        ) : null}
      </View>
    ) : null;

    const keyboardSpacer = <KeyboardSpacer topSpacing={-48} />; // -48 for navigation
    return (
      <View>
        {content}
        {keyboardSpacer}
      </View>
    );
  };

  renderEmpty = () => (
    <Text style={{ textAlign: "center", fontSize: 16 }}>No contacts found</Text>
  );

  renderListFooter = () => {
    const { search, contacts } = this.state;
    const spacer = <View style={{ height: 80 }} />;
    return search ? (
      spacer
    ) : (
      <View>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          {contacts.length} contacts
        </Text>
        {spacer}
      </View>
    );
  };

  render() {
    const { contacts, selected, search, isEditing } = this.state;
    const { isIntro } = this.props;

    const filteredContacts = contacts
      ? search
        ? contacts.filter(
          c => c.name && c.name.toLowerCase().includes(search.toLowerCase())
        )
        : contacts
      : [];

    return (
      <View style={{ flex: 1 }}>
        {!isIntro ? (
          <Button
            onPress={() => this.setState({ isEditing: !this.state.isEditing })}
            title="Edit"
          />
        ) : null}
        {this.renderHeader()}
        <FlatList
          extraData={[selected.length, isEditing]}
          data={filteredContacts}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderListFooter}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(c, i) => `item-${i}`}
          renderItem={this.renderItem}
        />
        {this.renderFooter()}
      </View>
    );
  }

}
export default ContactsScreen;
