type Device = {
  whatsappOrCall: string
};

type Reducer = {
  device: Device,
  version: number
};

const initReducer: Reducer = {
  device: {
    cycleSpeed: 15,
    alert: true
  },
  recent: [],
  favorites: [],
  version: 0
};

export const fullReducer = (state: Reducer = initReducer, action) => {
  //todo: see if i can write a more elegant and simple reducer! more like an ORM woulde be sick
  //get inspired: https://github.com/tommikaikkonen/redux-orm

  switch (action.type) {
    case "SET_DEVICE": {
      return {
        ...state,
        device: { ...state.device, ...action.value }
      };
    }

    case "SET_VERSION": {
      return { ...state, version: action.value };
    }

    case "PURGE": {
      return { ...initReducer, version: state.version };
    }

    default:
      return state;
  }
};
