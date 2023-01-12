import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Location } from "./api";
import { Forecast } from "./components/forecast";
import { Omnibar } from "./components/omnibar";
import { Weather } from "./components/weather";
import { dateToLocaleString } from "./utils/helpers";
import { useWeatherQuery } from "./utils/useWeatherQuery";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Main = () => {
  const [location, setLocation] = useState<Location>({} as Location);
  const storageUnit: boolean = JSON.parse(
    localStorage.getItem("unit") || "true"
  );
  const [units, setUnits] = useState(storageUnit);

  const { data } = useWeatherQuery(location, units);

  const [, meridiem] = dateToLocaleString(new Date(), {
    type: "time",
    timeZone: data?.forecast.timezone,
    hour12: true,
  }).split(" ");

  return (
    <main id="app" className={`${meridiem === "PM" && "dark"}`}>
      <div className="bg-day dark:bg-night transition-all duration-500 bg-no-repeat bg-cover bg-fixed">
        <div className="max-w-7xl m-auto flex flex-col items-center justify-center min-h-screen p-2 gap-4">
          <Omnibar setLocation={setLocation} />

          <label className="relative inline-flex items-center mr-5 cursor-pointer self-end">
            <input
              type="checkbox"
              onChange={(e) => {
                setUnits((p) => !p);
                localStorage.setItem("unit", `${e.target.checked}`);
              }}
              checked={units}
              className="sr-only peer"
            />
            <div
              className="transition-colors duration-500 w-[3.3rem] h-7 bg-orange-500 rounded-full peer dark:bg-orange-700  peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:content-['°F'] after:content-['°C'] text-sm font-bold dark:peer-checked:after:text-green-500
        peer-checked:after:text-green-800 leading-[22px] after:text-orange-700  dark:after:text-orange-500 text-center after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-700"
            />
          </label>

          <Weather location={location} units={units} />
          <Forecast location={location} units={units} />
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
