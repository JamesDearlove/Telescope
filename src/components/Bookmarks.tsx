import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { bookmarkItems } from "../settingNames";

interface ItemProps {
  name: string;
  url: string;
}

const BookmarkItem = (props: ItemProps) => {
  const url = new URL(props.url);

  const buttonClick = () => {
    window.location.href = url.toString();
  };

  const background = useColorModeValue("gray.100", "gray.700");
  const hoverBackground = useColorModeValue("gray.200", "gray.600");
  const border = useColorModeValue("gray.200", "gray.800");

  return (
    <Button
      bg={background}
      borderColor={border}
      borderWidth={1}
      onClick={buttonClick}
      w={24}
      h={20}
      _hover={{
        background: hoverBackground,
      }}
    >
      <Stack direction="column" alignItems="center">
        <Image
          boxSize={4}
          src={`http://icons.duckduckgo.com/ip2/${url.host}.ico`}
          alt={`${props.name} icon`}
        />
        <Text fontSize="sm">{props.name}</Text>
      </Stack>
    </Button>
  );
};

export interface Bookmark {
  name: string;
  url: string;
}

export const Bookmarks = () => {
  const [items, setItems] = useState<Bookmark[]>();

  useEffect(() => {
    const setting = localStorage.getItem(bookmarkItems);
    if (setting && setting !== "") {
      const bookmarks = JSON.parse(setting || "");
      setItems(bookmarks);
    }
  }, []);

  return (
    <Center>
      <Stack direction={["column", "row"]} spacing={4} wrap="wrap">
        {items?.map((item) => (
          <BookmarkItem key={item.name} {...item} />
        ))}
      </Stack>
    </Center>
  );
};
