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
import { sizeProps } from "./CommandBar";
import { useSettings } from "../state/hooks";
import { BuiltInSearchEngine } from "../state/model";

const isURL = (str: string) => {
  // const expression = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
  const expression =
    /([\w+]+:\/\/)?([\w\d-]+\.)*[\w-]+[.:]\w+([/?=&#.]?[\w-]+)*\/?/gm;
  const regex = new RegExp(expression);
  return str.match(regex) != null;
};

export const SearchEngines: { [key: string]: { name: string; url: string } } = {
  google: {
    name: "Google",
    url: "http://www.google.com/search?q=",
  },
  bing: {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
  },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
  },
  ecoscia: {
    name: "Ecosia",
    url: "https://www.ecosia.org/search?q=",
  },
};

export const Search = () => {
  const [value, setValue] = useState("");
  const [autoComplete, setAutoComplete] = useState("");

  const background = useColorModeValue("gray.100", "gray.700");
  const border = useColorModeValue("gray.200", "gray.800");

  const { state } = useSettings();

  const searchUrl = (engine: BuiltInSearchEngine, searchTerm: string) =>
    SearchEngines[engine].url + searchTerm;

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
        window.location.href = searchUrl(state.deafultSearchEngine, value);
        break;
    }
  };

  const generateOptions = (value: string) => {
    // TODO: Reimplement
    // if (value.startsWith("!")) {
    //   setAutoComplete(`DuckDuckGo Bang: ${value}`);
    //   return;
    // }
    if (isURL(value)) {
      setAutoComplete(`Navigate to ${value}`);
      return;
    }

    switch (value) {
      case "":
        setAutoComplete("");
        break;
      default:
        setAutoComplete(
          `Search with ${
            SearchEngines[state.deafultSearchEngine].name
          }: ${value}`
        );
        break;
    }
  };

  return (
    <>
      <Box>
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
      {autoComplete !== "" && (
        <Portal>
          <Box position="absolute" top={40} width="full">
            <Center>
              <Box
                borderColor={border}
                borderWidth="1px"
                borderRadius="lg"
                // zIndex="overlay"
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
    </>
  );
};
