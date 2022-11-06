import React, { createContext, useReducer } from "react";
import { Action, reducer } from "./actions";
import { initialState, State } from "./model";

type Store = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const SettingContext = createContext<Store>({
  state: initialState,
  dispatch: () => {},
});

interface SettingProviderProps {
  children?: React.ReactNode
}

export const SettingProvider: React.FC<SettingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
};
