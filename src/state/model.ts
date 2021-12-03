import { Bookmark } from "../components/Bookmarks";

export type State = {
  backgroundImage: string | null;
  bookmarks: Bookmark[];
  todoist: TodoistState | null;
  bomGeohash: string | null;
};

export type TodoistState = {
  apiKey: string | null;
  filter: string | null;
};

export const localStorageKeys = {
  todoistApiKey: "todoist-api-key",
  todoistFilter: "todoist-filter",
  backgroundImgUrl: "background-image-url",
  bookmarkItems: "bookmark-items",
  bomGeohash: "weather-bom-geohash",
};

const openBookmarks = (): Bookmark[] => {
  const setting = localStorage.getItem(localStorageKeys.bookmarkItems);

  if (setting && setting !== "") {
    try {
      const bookmarks = JSON.parse(setting || "") as Bookmark[];
      return bookmarks;
    } catch (exception) {
      console.error(exception);
    }
  }
  return [];
};

const openTodoist = (): TodoistState | null => {
  const apiKey = localStorage.getItem(localStorageKeys.todoistApiKey)
  const filter = localStorage.getItem(localStorageKeys.todoistFilter)

  if (apiKey === null) {
    return null
  }

  return { apiKey: apiKey, filter: filter}
}

export const initialState: State = {
  backgroundImage: localStorage.getItem(localStorageKeys.backgroundImgUrl),
  bookmarks: openBookmarks(),
  todoist: openTodoist(),
  bomGeohash: localStorage.getItem(localStorageKeys.bomGeohash),
};
