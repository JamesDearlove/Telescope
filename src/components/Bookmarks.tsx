import React from "react";
import {
  Button,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

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
  const hoverBackground = useColorModeValue("gray.200", "gray.600")
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

export const Bookmarks = () => {
  const items = [
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Reddit", url: "https://reddit.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "ABC News", url: "https://abc.net.au/news" },
    { name: "Learn.UQ", url: "https://learn.uq.edu.au" },
    { name: "OzBargain", url: "https://ozbargain.com.au" },
    { name: "Netflix", url: "https://netflix.com" },
    { name: "Disney+", url: "https://disneyplus.com" },
  ];

  return (
    <Center>
      <Stack direction={["column", "row"]} spacing={4} wrap="wrap">
        {items.map((item) => (
          <BookmarkItem key={item.name} {...item} />
        ))}
      </Stack>
    </Center>
  );
};
