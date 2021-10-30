import React from "react";
import { Box, Center, Flex } from "@chakra-ui/react";

import { Search } from "./Search";
import { Weather } from "./weather/Weather";

export const sizeProps = {
  w: "full",
  maxW: {
    base: "100%",
    md: "4xl",
    xl: "4xl",
  },
  marginX: { base: 8, md: 24 },
};

export const CommandBar = () => {
  return (
    <Box w="100%" alignSelf="flex-end">
      <Center>
        <Flex flexDirection="column" {...sizeProps}>
          <Box paddingBottom={2}>
            <Weather />
          </Box>
          <Search />
        </Flex>
      </Center>
    </Box>
  );
};
