import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Portal,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const isURL = (str: string) => {
  // const expression = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
  const expression =
    /([\w+]+:\/\/)?([\w\d-]+\.)*[\w-]+[.:]\w+([/?=&#.]?[\w-]+)*\/?/gm;
  const regex = new RegExp(expression);
  return str.match(regex) != null;
};

export const Search = () => {
  const [value, setValue] = useState("");
  const [autoComplete, setAutoComplete] = useState("");

  const background = useColorModeValue("gray.100", "gray.700");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    generateOptions(event.target.value.toString());
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isURL(value)) {
      if (value.includes("http") || value.includes("https")) {
        window.location.href = value;
        return;
      } else {
        window.location.href = `http://${value}`;
        return;
      }
    }

    switch (value) {
      case "":
        break;
      default:
        window.location.href = `https://duckduckgo.com/?q=${value}`;
        break;
    }
  };

  const generateOptions = (value: string) => {
    if (value.startsWith("!")) {
      setAutoComplete(`DuckDuckGo Bang: ${value}`);
      return;
    }
    if (isURL(value)) {
      setAutoComplete(`Navigate to ${value}`);
      return;
    }

    switch (value) {
      case "":
        setAutoComplete("");
        break;
      default:
        setAutoComplete(`Search: ${value}`);
        break;
    }
  };

  return (
    <Box>
      <Center>
        <Box w="full" maxW="4xl">
          <form onSubmit={onSubmit}>
            <InputGroup size="lg">
              <Input
                type="text"
                placeholder="What's next?"
                autoFocus
                value={value}
                onChange={onTextChange}
                bg={background}
              />
              <InputRightElement>
                <Button
                  h="full"
                  type="submit"
                  bg="transparent"
                  borderLeftRadius={0}
                >
                  Go
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>
      </Center>
      {autoComplete !== "" && (
        <Portal>
          <Center>
            <Box
              position="absolute"
              borderWidth="1px"
              borderRadius="lg"
              zIndex="overlay"
              top={32}
              px={4}
              py={2}
              w="full"
              maxW="4xl"
              bg={background}
            >
              <Text>{autoComplete}</Text>
            </Box>
          </Center>
        </Portal>
      )}
    </Box>
  );
};
