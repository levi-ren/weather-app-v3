import { WeatherCodes } from "../components/icons";
import { default as countryCodes } from "../utils/country-codes.json";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: WeatherCodes;
}

interface CurrentForecast {
  clouds: number;
  dew_point: number;
  uvi: number;
  visibility: number;
}
export interface WeatherData {
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: keyof typeof countryCodes;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  coord: { lat: number; lon: number };
}
export interface DailyForecast {
  dt: number;
  feels_like: {
    day: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: { day: number; eve: number; max: number; min: number; morn: number };
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface ForecastData {
  current: CurrentForecast;
  daily: DailyForecast[];
  lat: number;
  lon: number;
  timezone: string;
}

export interface CurrentWeather {
  weather: WeatherData;
  forecast: ForecastData;
}
