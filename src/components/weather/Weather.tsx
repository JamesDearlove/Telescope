import { useState } from "react";
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
  getDailyForecast,
  getHourlyForecast,
  getLocationInfo,
} from "./data";
import { getIcon } from "./Icons";
import { useSettings } from "../../state/hooks";
import { sizeProps } from "../CommandBar";

const WeatherComponent = (props: { location: string }) => {
  const location = props.location;

  const locationQuery = useQuery("weatherLocation", () =>
    getLocationInfo(location)
  );
  const dailyQuery = useQuery("weatherDaily", () => getDailyForecast(location));
  const forecastQuery = useQuery("weatherHourly", () =>
    getHourlyForecast(location)
  );
  const observationQuery = useQuery("weatherObservation", () =>
    getCurrentObservation(location)
  );

  const [showDetails, setShowDetails] = useState(false);

  const background = useColorModeValue("gray.100", "gray.700");
  const border = useColorModeValue("gray.300", "gray.800");

  const isNight = dailyQuery.data?.data[0].now.is_night ?? false;

  // TODO: Check if this location is the most accurate for weather icons.
  //       Alternative: use daily icon.
  const iconDescriptor: string =
    forecastQuery.data?.data[0]?.icon_descriptor.toString();
  const icon = getIcon(iconDescriptor, isNight);

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
          <Flex justifyContent="center">
            <Flex flexDirection="row-reverse" {...sizeProps}>
              <Box
                position="fixed"
                top={24}
                display="block"
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
                  Feels Like: {observationQuery.data?.data?.temp_feels_like}
                  &#8451;
                </Text>
                <Text>{dailyQuery.data?.data[0].short_text}</Text>
                <Text>
                  Chance of any rain: {dailyQuery.data?.data[0].rain?.chance}%
                </Text>
              </Box>
            </Flex>
          </Flex>
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
