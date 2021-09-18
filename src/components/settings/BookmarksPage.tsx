import React, { useEffect, useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { bookmarkItems } from "../../settingNames";

export const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState("");

  const storeSetting = () => {
    localStorage.setItem(bookmarkItems, bookmarks.replaceAll("\n", ""));
  };

  const onChangeText = (event: any) => {
    setBookmarks(event.target.value);
  };

  useEffect(() => {
    setBookmarks(
      localStorage.getItem(bookmarkItems)?.replaceAll("},", "},\n") || ""
    );
  }, []);

  return (
    <>
      <Textarea
        height="72"
        value={bookmarks}
        onChange={onChangeText}
        onBlur={storeSetting}
      />
    </>
  );
};
