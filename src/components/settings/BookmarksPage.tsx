import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { bookmarkItems } from "../../settingNames";
import { Bookmark } from "../Bookmarks";

export const BookmarksPage = () => {
  const [items, setItems] = useState<Bookmark[]>([]);
  const [updateStore, setUpdateStore] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const setting = localStorage.getItem(bookmarkItems);
    if (setting && setting !== "") {
      try {
        const bookmarks = JSON.parse(setting || "");
        setItems(bookmarks);
      } catch (exception) {
        console.error(exception);
        toast({
          title: "Bookmark Loading Error",
          description: "Unable to parse bookmarks JSON.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [toast]);

  const saveBookmarks = () => {
    const settingValue = JSON.stringify(items);
    localStorage.setItem(bookmarkItems, settingValue);
    setUpdateStore(false);
  };

  if (updateStore) {
    saveBookmarks();
  }

  const newBookmark = () => {
    setItems([...items, { name: "", url: "" }]);
  };

  const updateName = (rowIndex: number, value: string) => {
    setItems(
      items.map((item, index) => {
        if (index === rowIndex) {
          item.name = value;
        }
        return item;
      })
    );
  };

  const updateUrl = (rowIndex: number, value: string) => {
    setItems(
      items.map((item, index) => {
        if (index === rowIndex) {
          item.url = value;
        }
        return item;
      })
    );
  };

  const updateIcon = (rowIndex: number, value: string) => {
    setItems(
      items.map((item, index) => {
        if (index === rowIndex) {
          item.icon = value;
        }
        return item;
      })
    );
  };

  const deleteItem = (rowIndex: number) => {
    setItems(items.filter((_, index) => index !== rowIndex));
    setUpdateStore(true);
  };

  return (
    <>
      <Text fontSize="md">Here you can add your bookmarked pages.</Text>
      <Table marginY={2} size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Icon URL</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item, index) => (
            <Tr>
              <Td padding={0}>
                <Input
                  size="sm"
                  value={item.name}
                  onChange={(e) => updateName(index, e.target.value)}
                  onBlur={() => saveBookmarks()}
                />
              </Td>
              <Td padding={0}>
                <Input
                  size="sm"
                  value={item.url}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  onBlur={() => saveBookmarks()}
                />
              </Td>
              <Td padding={0}>
                <Input
                  size="sm"
                  value={item.icon}
                  onChange={(e) => updateIcon(index, e.target.value)}
                  onBlur={() => saveBookmarks()}
                />
              </Td>
              <Td padding={0}>
                <Button size="xs" onClick={() => deleteItem(index)}>
                  &times;
                </Button>
              </Td>
            </Tr>
          ))}
          {items.length === 0 && (
            <Tr>
              <Td colSpan={4}>No bookmarks here. Add one below!</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Button size="sm" onClick={() => newBookmark()}>
        Add Bookmark
      </Button>
    </>
  );
};
