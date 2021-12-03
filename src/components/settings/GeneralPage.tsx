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
import { useSettings } from "../../state/hooks";
import { storeBackgroundImg, storeDefaultSearchEngine } from "../../state/actions";
import { BuiltInSearchEngine } from "../../state/model";

export const BackgroundSection = () => {
  const [backgroundURL, setBackgroundURL] = useState<string>("");
  const { state, dispatch } = useSettings();

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

  const onChangeSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(storeDefaultSearchEngine(event.target.value as BuiltInSearchEngine))
  };

  return (
    <>
      <FormControl id="search-engine">
        <FormLabel>Search Engine</FormLabel>
        <Select
          value={state.deafultSearchEngine}
          onChange={onChangeSearch}
        >
          <option value="google">Google</option>
          <option value="bing">Bing</option>
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="ecosia">Ecosia</option>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
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
