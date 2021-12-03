import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useSetting } from "../../state/hooks";
import { storeBackgroundImg } from "../../state/actions";

export const BackgroundSection = () => {
  const [backgroundURL, setBackgroundURL] = useState<string>("");
  const { state, dispatch } = useSetting();

  useEffect(() => {
    setBackgroundURL(state.backgroundImage ?? "");
  }, [state.backgroundImage]);

  const storeSettings = () => {
    dispatch(storeBackgroundImg(backgroundURL));
  };

  const onChangeBackgroundURL = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundURL(event.target.value);
  };

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
