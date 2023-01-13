import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Location } from "./api";
import day from "./assets/day.svg";
import night from "./assets/night.svg";
import { Citetation } from "./components/citetation";
import { Forecast } from "./components/forecast";
import { Omnibar } from "./components/omnibar";
import { Socials } from "./components/socials";
import { Temperature } from "./components/temperature";
import { Toast } from "./components/toast";
import { Weather } from "./components/weather";
import { dateToLocaleString } from "./utils/helpers";
import { useWeatherQuery } from "./utils/useWeatherQuery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: Infinity,
      retry: 0,
      onError: () => {
        toast.error(<Toast />, { toastId: 1 });
      },
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

  const [, meridiem] = useMemo(() => {
    return dateToLocaleString(new Date(), {
      type: "time",
      timeZone: data?.forecast.timezone,
      hour12: true,
    }).split(" ");
  }, [data?.forecast.timezone]);

  return (
    <main id="app" className={`${meridiem === "PM" && "dark"} relative`}>
      <ToastContainer theme="dark" hideProgressBar />

      <img
        alt="Day Background"
        src={day}
        className="visible fixed inset-0 h-screen w-full opacity-100 transition-all duration-500 dark:invisible dark:opacity-0"
      />
      <img
        alt="Night Background"
        src={night}
        className="invisible fixed inset-0 h-screen w-full opacity-0 transition-all duration-500 dark:visible dark:opacity-100"
      />

      <div className="m-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-4 p-2">
        <Socials />
        <div className="flex w-full flex-col justify-center gap-4">
          <Omnibar setLocation={setLocation} />

          <Temperature units={units} setUnits={setUnits} />

          <Weather location={location} units={units} />
          <Forecast location={location} units={units} />
        </div>

        <Citetation />
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
