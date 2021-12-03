import { Bookmark } from "../components/Bookmarks";
import { localStorageKeys, State, TodoistState } from "./model";

enum ActionTypes {
  LOAD_SETTINGS = "LOAD_SETTINGS",
  SAVE_BACKGROUNDIMG = "SAVE_BACKGROUNDIMG",
  SAVE_BOOKMARKS = "SAVE_BOOKMARKS",
  SAVE_TODOIST = "SAVE_TODOIST",
  CLEAR_TODOIST = "CLEAR_TODOIST",
  SAVE_BOMGEOHASH = "SAVE_BOMGEOHASH",
}

export type Action =
  | { type: ActionTypes.LOAD_SETTINGS }
  | { type: ActionTypes.CLEAR_TODOIST }
  | { type: ActionTypes; payload: { value: any } };

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

/**
 * Stores bookmarks in LocalStorage.
 * @param bookmarks An array of Bookmarks to store.
 */
export const storeBookmarks = (bookmarks: Bookmark[]): Action => ({
  type: ActionTypes.SAVE_BOOKMARKS,
  payload: {
    value: bookmarks,
  },
});

/**
 * Stores the Todoist setting state in LocalStorage.
 * @param values The TodoistState you want to store.
 */
export const storeTodoist = (values: TodoistState): Action => ({
  type: ActionTypes.SAVE_TODOIST,
  payload: {
    value: values,
  },
});

/**
 * Stores a Bom Geohash in LocalStorage.
 * @param value The geohash to store. Null to remove.
 */
export const storeBomGeohash = (value: string | null): Action => ({
  type: ActionTypes.SAVE_BOMGEOHASH,
  payload: {
    value: value,
  },
});

/**
 * Removes Todoist information from LocalStorage.
 */
export const clearTodoist = (): Action => ({
  type: ActionTypes.CLEAR_TODOIST,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.LOAD_SETTINGS:
      return {
        ...state,
        backgroundImage:
          localStorage.getItem(localStorageKeys.backgroundImgUrl) ?? "",
      };

    case ActionTypes.SAVE_BACKGROUNDIMG:
      localStorage.setItem(
        localStorageKeys.backgroundImgUrl,
        action.payload.value
      );
      return {
        ...state,
        backgroundImage: action.payload.value,
      };

    case ActionTypes.SAVE_BOOKMARKS:
      const settingValue = JSON.stringify(action.payload.value);
      localStorage.setItem(localStorageKeys.bookmarkItems, settingValue);
      return {
        ...state,
        bookmarks: action.payload.value,
      };

    case ActionTypes.SAVE_TODOIST:
      localStorage.setItem(
        localStorageKeys.todoistApiKey,
        action.payload.value.apiKey
      );
      localStorage.setItem(
        localStorageKeys.todoistFilter,
        action.payload.value.filter
      );
      return { ...state, todoist: action.payload.value };

    case ActionTypes.CLEAR_TODOIST:
      localStorage.removeItem(localStorageKeys.todoistApiKey);
      localStorage.removeItem(localStorageKeys.todoistFilter);
      return { ...state, todoist: null };

    case ActionTypes.SAVE_BOMGEOHASH:
      if (action.payload.value === null) {
        localStorage.removeItem(localStorageKeys.bomGeohash);
      } else {
        localStorage.setItem(localStorageKeys.bomGeohash, action.payload.value);
      }
      return { ...state, bomGeohash: action.payload.value };

    default:
      throw new Error("Invalid state action.");
  }
};
