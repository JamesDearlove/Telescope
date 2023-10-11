import {
  Button,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSettings } from "../state/hooks";

export interface Bookmark {
  name: string;
  url: string;
  icon?: string;
}

const BookmarkItem = (props: Bookmark) => {
  const background = useColorModeValue("gray.100", "gray.700");
  const hoverBackground = useColorModeValue("gray.200", "gray.600");
  const border = useColorModeValue("gray.200", "gray.800");

  let url: URL;
  try {
    url = new URL(props.url);
  } catch (error) {
    console.error(error);
    return <></>;
  }

  const buttonClick = () => {
    window.location.href = url.toString();
  };

  const icon = props.icon || `http://icons.duckduckgo.com/ip2/${url.host}.ico`;

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
        <Image boxSize={4} src={icon} />
        <Text fontSize="sm">{props.name}</Text>
      </Stack>
    </Button>
  );
};

export const Bookmarks = () => {
  const { state } = useSettings();
  const items = state.bookmarks;

  return (
    <Center alignSelf="flex-start">
      <Stack
        direction={["column", "row"]}
        spacing={4}
        justifySelf="center"
        wrap="wrap"
        marginX={{ base: 8, sm: 16, lg: 32 }}
      >
        {items?.map((item) => (
          <BookmarkItem key={item.name} {...item} />
        ))}
      </Stack>
    </Center>
  );
};
