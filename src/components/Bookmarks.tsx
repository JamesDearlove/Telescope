import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { bookmarkItems } from "../settingNames";

export interface Bookmark {
  name: string;
  url: string;
  icon?: string;
}

const BookmarkItem = (props: Bookmark) => {
  const background = useColorModeValue("gray.100", "gray.700");
  const hoverBackground = useColorModeValue("gray.200", "gray.600");
  const border = useColorModeValue("gray.200", "gray.800");
  const toast = useToast();

  let url: URL;
  try {
    url = new URL(props.url);
  } catch (error) {
    console.error(error);
    toast({
      title: "Bookmark Load Warning",
      description: `Bookmark ${props.name} has invalid URL.`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    return <></>;
  }

  const buttonClick = () => {
    window.location.href = url.toString();
  };

  const icon = props.icon || `http://icons.duckduckgo.com/ip2/${url.host}.ico`

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
          src={icon}
        />
        <Text fontSize="sm">{props.name}</Text>
      </Stack>
    </Button>
  );
};


export const Bookmarks = () => {
  const [items, setItems] = useState<Bookmark[]>();
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
