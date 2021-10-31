/**
 * BOM Weather component, data layer.
 *
 * This taps into api.weather.bom.gov.au to grab weather information.
 * I wanted to use the BOM API directly because it's pretty accurate and my 
 * main source for weather.
 */
import axios from "axios";

const BASE_URL = "https://api.weather.bom.gov.au/v1/";

const getData = async (endpoint: string, params?: any) => {
  const response = await axios.get(endpoint, {
    baseURL: BASE_URL,
    params: params,
  });

  if (response.status === 200) {
    return await response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const searchLocations = (searchTerm: string) => {
  return getData("locations", { search: searchTerm })
};

export const getLocationInfo = (location: string) => {
  return getData(`locations/${location}`)
}

export const getThreeHourlyForecast = (location: string) => {
  return getData(`locations/${location}/forecasts/3-hourly`)
};

export const getHourlyForecast = (location: string) => {
  return getData(`locations/${location}/forecasts/hourly`)
};

export const getDailyForecast = (location: string) => {
  return getData(`locations/${location}/forecasts/daily`)
}

export const getCurrentObservation = (location: string) => {
  return getData(`locations/${location}/observations`)
};
