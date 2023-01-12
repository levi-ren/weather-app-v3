import { useQuery } from "@tanstack/react-query";
import { fetchWeather, Location } from "../api";

export const useWeatherQuery = (location: Location, units: boolean) =>
  useQuery({
    queryKey: ["weather", location, units],
    queryFn: () => fetchWeather(location, units),
    enabled: Object.hasOwn(location, "name"),
  });
