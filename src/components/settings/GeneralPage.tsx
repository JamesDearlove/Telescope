import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { backgroundImgUrl } from "../../settingNames";

export const BackgroundSection = () => {
  const [backgroundURL, setBackgroundURL] = useState<string>("");

  const storeSettings = () => {
    localStorage.setItem(backgroundImgUrl, backgroundURL);
  };

  const onChangeBackgroundURL = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundURL(event.target.value);
  };

  useEffect(() => {
    setBackgroundURL(localStorage.getItem(backgroundImgUrl) || "");
  }, []);

  return (
    <>
      <FormControl id="background-type">
        <FormLabel>Background</FormLabel>
        <Select placeholder="URL" disabled={true} />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl id="background-url">
        <FormLabel>Background URL</FormLabel>
        <Input
          value={backgroundURL || ""}
          onChange={onChangeBackgroundURL}
          onBlur={storeSettings}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
    </>
  );
};

export const GeneralPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <BackgroundSection />
      <Button mt="2" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </>
  );
};
