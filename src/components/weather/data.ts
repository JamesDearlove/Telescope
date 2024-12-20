/**
 * BOM Weather component, data layer.
 *
 * This taps into api.weather.bom.gov.au to grab weather information.
 * I wanted to use the BOM API directly because it's pretty accurate and my
 * main source for weather.
 */

const BASE_URL = "https://api.weather.bom.gov.au/v1";

const getData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export const searchLocations = (searchTerm: string) => {
  if (searchTerm.length < 3) {
    return undefined;
  }
  return getData(`locations?search=${searchTerm}`);
};

export const getLocationInfo = (location: string) => {
  if (location === "") {
    return undefined;
  }
  return getData(`locations/${location}`);
};

export const getThreeHourlyForecast = (location: string) => {
  return getData(`locations/${location.slice(0, 6)}/forecasts/3-hourly`);
};

export const getHourlyForecast = (location: string) => {
  return getData(`locations/${location.slice(0, 6)}/forecasts/hourly`);
};

export const getDailyForecast = (location: string) => {
  return getData(`locations/${location.slice(0, 6)}/forecasts/daily`);
};

export const getCurrentObservation = (location: string) => {
  return getData(`locations/${location.slice(0, 6)}/observations`);
};
