type Device = {
  favoriteAction: string,
  seenIntro: boolean,
  hasEdited: number,
  version: number,
};

type Contact = Object;

type Reducer = {
  device: Device,
  contacts: Contact,
};

const initReducer: Reducer = {
  device: {
    favoriteAction: "phone",
    seenIntro: false,
    version: 0,
    hasEdited: 0,
  },
  contacts: [],
};

export const fullReducer = (state: Reducer = initReducer, action) => {
  //todo: see if i can write a more elegant and simple reducer! more like an ORM woulde be sick
  //get inspired: https://github.com/tommikaikkonen/redux-orm

  switch (action.type) {
    case "SET_DEVICE": {
      return {
        ...state,
        device: { ...state.device, ...action.value },
      };
    }

    case "ADD_FAVORITES": {
      const contacts = state.contacts;
      const ids = contacts.map(c => c.id);
      action.value.forEach(contact =>
        !ids.includes(contact.id) ? contacts.push(contact) : null
      );
      return { ...state, contacts };
    }

    case "REMOVE_FAVORITES": {
      const currentContacts = state.contacts;
      const removeIds = action.value.map(c => c.id);
      const contactsRemoved = currentContacts.filter(
        contact => !removeIds.includes(contact.id)
      );
      return { ...state, contacts: contactsRemoved };
    }

    case "UPSERT_USER": {
      console.log("upserst User", action.value);
      const currentContacts = state.contacts;
      const currentIds = currentContacts.map(c => c.id);

      const isUpdate = action.value.id && currentIds.includes(action.value.id);
      const updateIndex = isUpdate && currentIds.indexOf(action.value.id);

      let newContacts = currentContacts;
      if (isUpdate) {
        newContacts[updateIndex] = {
          ...newContacts[updateIndex],
          ...action.value,
        };
      }
      else {
        newContacts.push(action.value);
      }

      return {
        ...state,
        contacts: newContacts,
        device: { ...state.device, hasEdited: state.device.hasEdited + 1 },
      };
    }

    case "PURGE": {
      return {
        ...initReducer,
        //purge everything, except for the versionnumber!
        device: { ...initReducer.device, version: state.device.version },
      };
    }

    default:
      return state;
  }
};
