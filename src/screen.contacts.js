import React from "react";
import {
  FlatList,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
} from "react-native";
import { Contacts, Permissions, Icon } from "expo";
// weriedkddk  dksksdlfd
//sdfksd
const MINIMUM_SELECTED = 5;

class Import extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selected: [],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  async componentWillMount() {
    if (Platform.OS === "android") {
      const { status, expires, permissions } = await Permissions.askAsync(
        Permissions.CONTACTS
      );
      if (status !== "granted") {
        Alert.alert("Sorry. We need access");
      }
      else {
        this.syncContacts();
      }
    }
  }

  componentDidMount() {
    this.syncContacts();
  }

  syncContacts() {
    Contacts.getContactsAsync()
      .then(({ data }) => {
        console.log("data", data[0]);

        this.setState({
          contacts: data.map(({ id, name, phoneNumbers }) => ({
            id,
            name,
            phone: phoneNumbers && phoneNumbers[0].number,
          })),
        });
      })
      .catch(e => console.warn(e));
  }

  renderItem({ index, item }) {
    const { selected } = this.state;

    const ids = selected ? selected.map(s => s.id) : [];
    const already = ids.includes(item.id);
    // console.log("selected", selected, "ids:", ids, "already", already);

    return (
      <TouchableOpacity
        onPress={() => {
          let newSelected = selected;
          if (already) {
            newSelected = selected.filter(s => s.id !== item.id);
          }
          else {
            newSelected.push(item);
          }

          this.setState({ selected: newSelected });
        }}
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Icon.MaterialCommunityIcons
          size={24}
          style={{ margin: 10 }}
          name={already ? "checkbox-marked-outline" : "checkbox-blank-outline"}
        />
        <View>
          <Text style={{ fontSize: 16 }} key={`key-${index}`}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 12, color: "#AAA" }}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator = () => (
    <View
      style={{ marginHorizontal: 10, height: 1, backgroundColor: "#CCC" }}
    />
  );

  renderHeader = () => {
    const { selected } = this.state;

    return (
      <View>
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
        <View
          style={{ height: 50, marginHorizontal: 10, justifyContent: "center" }}
        >
          <Text>
            {selected && selected.length > 0 ? selected.length : "None"}{" "}
            selected
          </Text>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    const {
      screenProps: { dispatch },
    } = this.props;
    const { selected } = this.state;

    const needMore = selected.length < MINIMUM_SELECTED;
    const howManyMore = MINIMUM_SELECTED - selected.length;
    return (
      <Button
        disabled={needMore}
        title={needMore ? `Select ${howManyMore} more` : "Save"}
        onPress={() => {
          dispatch({ type: "SET_CONTACTS", value: selected });
          dispatch({ type: "SET_DEVICE", value: { seenIntro: true } });
        }}
      />
    );
  };

  renderEmpty = () => <Text>No contacts found</Text>;
  render() {
    const { contacts, selected, search } = this.state;

    const filteredContacts = contacts
      ? search
        ? contacts.filter(
          c => c.name && c.name.toLowerCase().includes(search.toLowerCase())
        )
        : contacts
      : [];

    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <FlatList
          extraData={selected.length}
          data={filteredContacts}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(c, i) => `item-${i}`}
          renderItem={this.renderItem}
        />
        {this.renderFooter()}
      </View>
    );
  }

}
export default Import;
