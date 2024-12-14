import { useEffect, useState } from "react";
import { Box, Grid, Link, Text } from "@chakra-ui/react";

import Settings from "./components/settings";
import { Bookmarks } from "./components/Bookmarks";
import Todoist from "./components/Todoist";
import { CommandBar } from "./components/CommandBar";

import { useSettings } from "./state/hooks";
import { BackgroundInfo, getBgUrl } from "./services/background";

function App() {
  const { state } = useSettings();
  const bgOption = state.bgOption;

  const [bgInfo, setBgInfo] = useState<BackgroundInfo>();
  const [backgroundImg, setBackgroundImg] = useState("");

  useEffect(() => {
    if (bgOption === "url") {
      setBgInfo(undefined);
      setBackgroundImg(state.backgroundImage ?? "");
    } else {
      getBgUrl(bgOption)
        .then((result) => {
          setBgInfo(result);
          setBackgroundImg(result?.bgUrl ?? "");
        })
        .catch(() => {
          setBgInfo(undefined);
          setBackgroundImg("");
        });
    }
  }, [state, bgOption]);

  const imageStyle =
    backgroundImg && backgroundImg !== ""
      ? `url(${backgroundImg}) no-repeat center center fixed`
      : "";

  return (
    <Box h="100vh" w="100vw" background={imageStyle} backgroundSize="cover">
      <Grid
        h="100%"
        templateRows="150px minmax(min-content, 1fr) 175px"
        alignItems="center"
      >
        <CommandBar />
        <Todoist />
        <Bookmarks />
      </Grid>
      <Box bottom={8} left={8} position="absolute">
        {bgInfo && (
          <Text>
            Photo by <Link href={bgInfo.authorLink}>{bgInfo.author}</Link> on{" "}
            <Link href={bgInfo.linkUrl}>Unsplash</Link>
          </Text>
        )}
      </Box>
      <Settings />
    </Box>
  );
}

export default App;
