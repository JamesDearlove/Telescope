import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getLocationInfo, searchLocations } from "../weather/data";
import { useQuery } from "react-query";
import { useCombobox } from "downshift";
import { useSettings } from "../../state/hooks";
import { storeBomGeohash } from "../../state/actions";

interface DropdownComboboxProps {
  isDisabled: boolean;
  formLabel?: string;
  formHelpText?: string;
  selectedItem: any;
  setSelectedItem: React.Dispatch<any>;
  defaultText: string;
}

const DropdownCombobox = (props: DropdownComboboxProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const searchQuery = useQuery(["weatherLocationSearch", searchTerm], () =>
    searchLocations(searchTerm || "")
  );

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
    setInputValue,
  } = useCombobox({
    items: searchQuery.data?.data || [],
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue || "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSelectedItem(selectedItem);
    },
  });

  useEffect(() => {
    setInputValue(props.defaultText);
  }, [props.defaultText, setInputValue]);

  const onSelectedItem = (selectedItem: any) => {
    props.setSelectedItem(selectedItem);
    setInputValue(`${selectedItem?.name}, ${selectedItem?.state}`);
    closeMenu();
  };

  const border = useColorModeValue("gray.200", "gray.600");
  const hover = useColorModeValue("gray.200", "gray.600");

  return (
    <FormControl>
      {props.formLabel && (
        <FormLabel {...getLabelProps()}>{props.formLabel}</FormLabel>
      )}
      <div {...getComboboxProps()}>
        <Input
          isDisabled={props.isDisabled}
          onFocus={openMenu}
          {...getInputProps()}
        />
      </div>

      <Box {...getMenuProps()}>
        {isOpen && searchQuery.data?.data?.length > 0 && (
          <Box
            marginTop={1}
            borderColor={border}
            borderWidth={1}
            borderRadius={8}
            // TODO: Fix up the z-index issue.
          >
            {searchQuery.data?.data
              ?.slice(0, 5)
              .map((item: any, index: number) => (
                <Text
                  backgroundColor={highlightedIndex === index ? hover : ""}
                  paddingX={4}
                  paddingY={1}
                  borderRadius={4}
                  key={`${item}${index}`}
                  {...getItemProps({ item: item.name, index })}
                >
                  {item.name}, {item.state} {item.postcode}
                </Text>
              ))}
          </Box>
        )}
      </Box>

      {props.formHelpText && (
        <FormHelperText>{props.formHelpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export const WeatherPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [storedLocation, setStoredLocation] = useState("");
  const { state, dispatch } = useSettings();

  const onChangeEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);
    if (!event.target.checked) {
      dispatch(storeBomGeohash(null));
    }
  };

  const onLocationSelected = (selected: any) => {
    setSelectedLocation(selected);
    dispatch(storeBomGeohash(selected?.geohash));
  };

  useEffect(() => {
    const loadData = async () => {
      const geohash = state.bomGeohash;

      if (geohash) {
        const res = await getLocationInfo(geohash || "");
        setStoredLocation(`${res.data?.name}, ${res.data?.state}`);
      }

      setEnabled(geohash !== null);
    };

    loadData();
  }, [state.bomGeohash]);

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

      <DropdownCombobox
        isDisabled={!enabled}
        formLabel="Location"
        // formHelpText="Search for a location from the BoM's available locations."
        selectedItem={selectedLocation}
        setSelectedItem={onLocationSelected}
        defaultText={storedLocation}
      />
    </>
  );
};
