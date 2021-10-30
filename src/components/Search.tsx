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
  const border = useColorModeValue("gray.200", "gray.800");

  const sizeProps = {
    w: "full",
    maxW: {
      base: "100%",
      md: "2xl",
      xl: "4xl",
    },
    marginX: { base: 16, sm: 32, md: 32, lg: 48 },
  };

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
        <Box {...sizeProps}>
          <form onSubmit={onSubmit}>
            <InputGroup size="lg">
              <Input
                type="text"
                placeholder="What's next?"
                borderColor={border}
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
                  borderColor={border}
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
          <Box position="absolute" top={32} width="full">
            <Center>
              <Box
                borderColor={border}
                borderWidth="1px"
                borderRadius="lg"
                zIndex="overlay"
                px={4}
                py={2}
                bg={background}
                {...sizeProps}
              >
                <Text fontSize="md">{autoComplete}</Text>
              </Box>
            </Center>
          </Box>
        </Portal>
      )}
    </Box>
  );
};
