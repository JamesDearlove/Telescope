import React from "react";
import { Bookmarks } from "./components/Bookmarks";
import { Search } from "./components/Search";
import Settings from "./components/settings";
import { TodoItems } from "./components/Todoist";
import { Box, Grid } from "@chakra-ui/react";
import { backgroundImgUrl } from "./settingNames";

function App() {
  const backgroundImg = localStorage.getItem(backgroundImgUrl);

  const imageStyle =
    backgroundImg !== ""
      ? `url(${backgroundImg}) no-repeat center center fixed`
      : "";

  return (
    <Box h="100vh" background={imageStyle} backgroundSize="cover">
      <Grid
        h="100%"
        templateRows="180px minmax(min-content, 1fr) 250px"
        alignItems="center"
      >
        <Search />
        <TodoItems />
        <Bookmarks />
      </Grid>
      <Settings />
    </Box>
  );
}

export default App;
