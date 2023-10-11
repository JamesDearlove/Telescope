import { Bookmarks } from "./components/Bookmarks";
import { Box, Grid } from "@chakra-ui/react";

import Settings from "./components/settings";
import { TodoItems } from "./components/Todoist";
import { CommandBar } from "./components/CommandBar";

import { useSettings } from "./state/hooks";

function App() {
  const { state } = useSettings();
  const backgroundImg = state.backgroundImage

  const imageStyle =
    backgroundImg !== ""
      ? `url(${backgroundImg}) no-repeat center center fixed`
      : "";

  return (
    <Box h="100vh" background={imageStyle} backgroundSize="cover">
      <Grid
        h="100%"
        templateRows="150px minmax(min-content, 1fr) 175px"
        alignItems="center"
      >
        <CommandBar />
        <TodoItems />
        <Bookmarks />
      </Grid>
      <Settings />
    </Box>
  );
}

export default App;
