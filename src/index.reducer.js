type Device = {
  favoriteAction: string,
  seenIntro: boolean,
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

    case "SET_CONTACTS": {
      return { ...state, contacts: action.value };
    }

    case "PURGE": {
      return {
        ...initReducer,
        device: { ...initReducer.device, version: state.device.version },
      };
    }

    default:
      return state;
  }
};
