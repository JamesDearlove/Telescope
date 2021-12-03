import { backgroundImgUrl, bookmarkItems } from "../settingNames";
import { Bookmark } from "../components/Bookmarks";

export type State = {
  backgroundImage: string | null;
  bookmarks: Bookmark[];
};

const openBookmarks = (): Bookmark[] => {
  const setting = localStorage.getItem(bookmarkItems);

  if (setting && setting !== "") {
    try {
      const bookmarks = JSON.parse(setting || "") as Bookmark[];
      return bookmarks;
    } catch (exception) {
      console.error(exception);

      // toast({
      //   title: "Bookmark Loading Error",
      //   description: "Unable to parse bookmarks JSON.",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
    }
  }
  return [];
};

export const initialState: State = {
  backgroundImage: localStorage.getItem(backgroundImgUrl) ?? null,
  bookmarks: openBookmarks(),
};
