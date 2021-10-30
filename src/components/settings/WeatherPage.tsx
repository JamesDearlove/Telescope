import React, { useEffect, useState } from "react";
import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react";
import { bomGeohash } from "../../settingNames";

export const WeatherPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [geoHash, setGeohash] = useState<string>("");

  const storeSettings = () => {
    localStorage.setItem(bomGeohash, geoHash);
  };

  const onChangeEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem(bomGeohash);
    } else {
      storeSettings();
    }
  };

  const onChangeGeohash = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeohash(event.target.value);
  };

  useEffect(() => {
    const geohash = localStorage.getItem(bomGeohash);

    setGeohash(geohash || "");
    setEnabled(geohash !== null);
  }, []);

  return (
    <>
      <Text fontSize="md">
        The weather integration fetches weather data from the Australian Burearu
        of Meteorology (BoM). More providers coming soon.
      </Text>
      <FormControl id="enabled" display="flex" alignItems="center" marginY="2">
        <Switch
          id="enabled-switch"
          size="lg"
          isChecked={enabled}
          onChange={onChangeEnabled}
        />
        <FormLabel htmlFor="enabled-switch" mb="0" ml="3">
          Enable Weather
        </FormLabel>
      </FormControl>
      <Divider marginBottom="2" />

      <FormControl id="api-key" isDisabled={!enabled}>
        <FormLabel>BoM Geohash</FormLabel>
        <Input
          value={geoHash || ""}
          onChange={onChangeGeohash}
          onBlur={storeSettings}
          maxLength={6}
        />
        <FormHelperText>
          Temporary, requires your 6 character geohash from{" "}
          <Link
            href="https://weather.bom.gov.au"
            color="blue.300"
            target="_blank"
          >
            weather.bom.gov.au
          </Link>
          . If your geohash is longer than 6 characters, you can remove any additional characters.
        </FormHelperText>
      </FormControl>
    </>
  );
};
