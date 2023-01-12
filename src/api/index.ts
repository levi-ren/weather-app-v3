import axios from "axios";
import { CurrentWeather } from "../interfaces/weather-models";
import countryCodes from "../utils/country-codes.json";

const base = import.meta.env.PROD
  ? "http://13.215.46.207:443"
  : "http://localhost:3001";

axios.defaults.baseURL = `${base}/api`;

export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: keyof typeof countryCodes;
  state: string;
}

export const fetchLocations = async (search: string) => {
  const { data } = await axios.get<Location[]>("/locations", {
    params: { search },
  });
  return data;
};

export const fetchWeather = async (loc: Location, units: boolean) => {
  const { lat, lon } = loc;
  const { data } = await axios.get<CurrentWeather>("/weather", {
    params: { lat, lon, units: !units ? "metric" : "imperial" },
  });
  return data;
};
