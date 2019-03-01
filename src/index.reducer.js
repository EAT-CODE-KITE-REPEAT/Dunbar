type Device = {
  cycleSpeed: number,
  alert: boolean
};

type Place = {
  lat: number,
  long: number,
  text: string
};

type Journey = {
  id: number,
  from: Place,
  to: Place,
  moment: Date
};

type Reducer = {
  device: Device,
  recent: Journey[],
  favorites: Journey[],
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
  switch (action.type) {
    case "SET_DEVICE": {
      return {
        ...state,
        device: { ...state.device, ...action.value }
      };
    }
    case "ADD_FAV": {
      return {
        ...state,
        favorites: [...state.favorites, action.value]
      };
    }
    case "REMOVE_FAV": {
      return {
        ...state,
        favorites: state.favorites.filter(s => s.id !== action.value)
      };
    }

    case "ADD_RECENT": {
      return {
        ...state,
        recent: [...state.recent, action.value]
      };
    }
    case "REMOVE_RECENT": {
      return {
        ...state,
        recent: state.recent.filter(s => s.id !== action.value)
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
