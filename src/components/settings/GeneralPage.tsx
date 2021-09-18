import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const OldSettings = () => {
  const [backgroundImg, setBackgroundImg] = useState("");
  const [textColour, setTextColour] = useState("");

  useEffect(() => {
    setBackgroundImg(localStorage.getItem("BackgroundImg") || "");
    setTextColour(localStorage.getItem("TextColour") || "");
  }, []);

  const backgroundImgOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundImg(event.target.value);
  };

  const textColourOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColour(event.target.value);
  };

  const settingsSaveOnClick = () => {
    localStorage.setItem("BackgroundImg", backgroundImg);
    localStorage.setItem("TextColour", textColour);
  };

  return (
    <div className="flex flex-col">
      <h1 className="my-2">Style</h1>
      <Input
        type="text"
        placeholder="Background Image"
        value={backgroundImg}
        onChange={backgroundImgOnChange}
      />
      <Input
        type="text"
        placeholder="Text Colour Override"
        value={textColour}
        onChange={textColourOnChange}
      />
      <Button onClick={settingsSaveOnClick}>Save</Button>
    </div>
  );
};

export const GeneralPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Divider marginY={4} />
      <Box>
        <Text fontSize="xl">Old Settings Panel</Text>
        <OldSettings />
      </Box>
    </>
  );
};
