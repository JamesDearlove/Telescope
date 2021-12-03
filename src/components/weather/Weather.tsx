import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Portal,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useQuery } from "react-query";
import {
  getCurrentObservation,
  getHourlyForecast,
  getLocationInfo,
} from "./data";
import { weatherIcon } from "./Icons";
import { useSettings } from "../../state/hooks";

const WeatherComponent = (props: { location: string }) => {
  const location = props.location;

  const locationQuery = useQuery("weatherLocation", () =>
    getLocationInfo(location)
  );
  const forecastQuery = useQuery("weatherHourly", () =>
    getHourlyForecast(location)
  );
  const observationQuery = useQuery("weatherObservation", () =>
    getCurrentObservation(location)
  );

  const [showDetails, setShowDetails] = useState(false);

  const background = useColorModeValue("gray.100", "gray.700");
  const border = useColorModeValue("gray.300", "gray.800");

  const iconDescriptor: string =
    forecastQuery.data?.data[0]?.icon_descriptor.toString();
  const icon = weatherIcon[iconDescriptor];

  return forecastQuery.isLoading ? (
    <></>
  ) : (
    <Box>
      <Flex alignItems="center" justifyContent="flex-end">
        <Icon
          as={icon}
          w={14}
          h={14}
          margin={1}
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        />
        <Text
          fontSize="xl"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          {observationQuery.data?.data?.temp}&#8451;
        </Text>
      </Flex>
      {showDetails && (
        <Portal>
          <Box
            position="absolute"
            top={20}
            right={48}
            zIndex="overlay"
            bg={background}
            borderColor={border}
            borderWidth="1px"
            borderRadius="md"
            paddingX={4}
            paddingY={2}
          >
            <Text>
              {locationQuery.data?.data?.name},{" "}
              {locationQuery.data?.data?.state}
            </Text>
            <Text>
              Feels Like: {observationQuery.data?.data?.temp_feels_like}&#8451;
            </Text>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export const Weather = () => {
  const { state } = useSettings();

  return state.bomGeohash === null ? (
    <></>
  ) : (
    <WeatherComponent location={state.bomGeohash} />
  );
};
