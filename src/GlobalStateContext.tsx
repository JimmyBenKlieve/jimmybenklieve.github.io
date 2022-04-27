import React from 'react';

type ThemeName = 'system' | 'light' | 'dark' | 'time';

export interface IGlobalState {
  theme: ThemeName;
};

type IGlobalNextState = React.SetStateAction<Partial<IGlobalState & { [x: string]: any }>>;

export type DispatchGlobalState = React.Dispatch<IGlobalNextState>;

export const globalStateReducer = (state: IGlobalState, action: IGlobalNextState) => {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  };
};

export const getInitialState = () => {
  return {
    theme: (window.localStorage.getItem('theme') ?? 'system') as ThemeName,
  };
};

const GlobalStateContext = React.createContext<[IGlobalState, React.Dispatch<IGlobalNextState>]>(null);

export default GlobalStateContext;
