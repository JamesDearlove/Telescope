import React, { createContext, useContext, useReducer } from "react";
import { backgroundImgUrl } from "../settingNames";

interface State {
  backgroundImage: string;
}

const initialState: State = {
  backgroundImage: localStorage.getItem(backgroundImgUrl) ?? "",
};

enum ActionTypes {
  LOAD_SETTINGS = "LOAD_SETTINGS",
  SAVE_SETTING = "SAVE_SETTING",
}

type Action =
  | { type: ActionTypes.LOAD_SETTINGS }
  | { type: ActionTypes.SAVE_SETTING; payload: { key: string; value: string } };

export const loadSettings = (): Action => ({
  type: ActionTypes.LOAD_SETTINGS,
});

// TODO: Not pleased with this implementation. Solutions:
// a. Change action types specifically for each setting
// b. Pass along the state key
export const storeBackgroundImg = (url: string): Action => ({
  type: ActionTypes.SAVE_SETTING,
  payload: {
    key: backgroundImgUrl,
    value: url,
  },
});

type Store = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const SettingContext = createContext<Store>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOAD_SETTINGS:
      return {
        ...state,
        backgroundImage: localStorage.getItem(backgroundImgUrl) ?? "",
      };
    case ActionTypes.SAVE_SETTING:
      localStorage.setItem(action.payload.key, action.payload.value);
      return {
        ...state,
        backgroundImage: action.payload.value,
      };
    default:
      throw new Error("Invalid state action.");
  }
};

export const SettingProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => useContext(SettingContext);
