import { State } from "./model";

enum ActionTypes {
  LOAD_SETTINGS = "LOAD_SETTINGS",
  SAVE_BACKGROUNDIMG = "SAVE_BACKGROUNDIMG",
}

const localStorageKeys = {
  todoistApiKey: "todoist-api-key",
  todoistFilter: "todoist-filter",
  backgroundImgUrl: "background-image-url",
  bookmarkItems: "bookmark-items",
  bomGeohash: "weather-bom-geohash",
};

export type Action =
  | { type: ActionTypes.LOAD_SETTINGS }
  | { type: ActionTypes; payload: { value: string } };

/**
 * Loads settings from LocalStorage
 */
export const loadSettings = (): Action => ({
  type: ActionTypes.LOAD_SETTINGS,
});

/**
 * Stores the background image url to LocalStorage.
 * @param url URL to set background image to
 */
export const storeBackgroundImg = (url: string): Action => ({
  type: ActionTypes.SAVE_BACKGROUNDIMG,
  payload: {
    value: url,
  },
});

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOAD_SETTINGS:
      return {
        ...state,
        backgroundImage:
          localStorage.getItem(localStorageKeys.backgroundImgUrl) ?? "",
      };
    case ActionTypes.SAVE_BACKGROUNDIMG:
      localStorage.setItem(localStorageKeys.backgroundImgUrl, action.payload.value);
      return {
        ...state,
        backgroundImage: action.payload.value,
      };
    default:
      throw new Error("Invalid state action.");
  }
};
