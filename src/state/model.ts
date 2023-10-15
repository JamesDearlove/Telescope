import { Bookmark } from "../components/Bookmarks";

export type State = {
  backgroundImage: string | null;
  bgOption: BgOption | null;
  bookmarks: Bookmark[];
  todoist: TodoistState | null;
  bomGeohash: string | null;
  deafultSearchEngine: BuiltInSearchEngine;
};

export type TodoistState = {
  apiKey: string | null;
  filter: string | null;
};

export type BuiltInSearchEngine = "google" | "bing" | "duckduckgo" | "ecosia";

export type BgOption =
  | "url"
  | "unsplash-landscape"
  | "unsplash-city"
  | "unsplash-space"
  | "unsplash-featured";

export const localStorageKeys = {
  todoistApiKey: "todoist-api-key",
  todoistFilter: "todoist-filter",
  bgOption: "bg-option",
  backgroundImgUrl: "background-image-url",
  bookmarkItems: "bookmark-items",
  bomGeohash: "weather-bom-geohash",
  defaultSearchEngine: "default-search-engine",
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
  const apiKey = localStorage.getItem(localStorageKeys.todoistApiKey);
  const filter = localStorage.getItem(localStorageKeys.todoistFilter);

  if (apiKey === null) {
    return null;
  }

  return { apiKey: apiKey, filter: filter };
};

export const initialState: State = {
  bgOption: localStorage.getItem(localStorageKeys.bgOption) as BgOption ?? "url",
  backgroundImage: localStorage.getItem(localStorageKeys.backgroundImgUrl),
  bookmarks: openBookmarks(),
  todoist: openTodoist(),
  bomGeohash: localStorage.getItem(localStorageKeys.bomGeohash),
  deafultSearchEngine:
    (localStorage.getItem(
      localStorageKeys.defaultSearchEngine
    ) as BuiltInSearchEngine) ?? "google",
};
