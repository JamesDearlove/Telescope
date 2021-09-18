import React, { useEffect, useState } from "react";
import { Text, Textarea } from "@chakra-ui/react";
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
      localStorage.getItem(bookmarkItems)?.replaceAll("},", "},\n") ||
        '[{"name": "Example", "url": "https://example.com"}]'
    );
  }, []);

  return (
    <>
      <Text>
        While I'm working on an actual interface, you can add bookmarks using
        JSON here.
      </Text>
      <Textarea
        height="72"
        value={bookmarks}
        onChange={onChangeText}
        onBlur={storeSetting}
      />
    </>
  );
};
