import React, { useContext, useEffect } from "react";
import { Bookmarks } from "./components/Bookmarks";
import { Box, Grid } from "@chakra-ui/react";

import { backgroundImgUrl } from "./settingNames";
import Settings from "./components/settings";
import { TodoItems } from "./components/Todoist";
import { CommandBar } from "./components/CommandBar";
import { loadSettings, SettingContext, useSetting } from "./state/Settings";

function App() {
  // const backgroundImg = localStorage.getItem(backgroundImgUrl);
  const { state, dispatch } = useSetting();
  const backgroundImg = state.backgroundImage

  useEffect(() => {
    dispatch(loadSettings())
  }, [])

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
