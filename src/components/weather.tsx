import { Location } from "../api";
import { ReactComponent as SunRise } from "../assets/sunrise.svg";
import { ReactComponent as SunSet } from "../assets/sunset.svg";
import { ReactComponent as MinTemp } from "../assets/thermometer-colder.svg";
import { ReactComponent as MaxTemp } from "../assets/thermometer-warmer.svg";
import { useWeatherQuery } from "../utils/useWeatherQuery";
import { Araw, Oras } from "./datetime";
import { WeatherIcons } from "./icons";
import { Spinner } from "./spinner";

interface DateTimeProps {
  unix: number;
  timeZone: string;
  timeOnly?: true;
  dateOnly?: true;
  className?: string;
}

type WeatherProps = { location: Location; units: boolean };

export const Weather = ({ location, units }: WeatherProps) => {
  const { data, isLoading, isError, isInitialLoading, isFetching } =
    useWeatherQuery(location, units);

  const unit = units ? "F" : "C";

  if (isLoading || isFetching) {
    if (!isInitialLoading && !isFetching) {
      return <></>;
    }
    return (
      <section
        id="weather loader"
        className="glass grid h-[449px] w-full place-items-center  rounded-lg border sm:h-[293px] md:h-[317px]"
      >
        <Spinner />
      </section>
    );
  }

  if (isError) {
    return <></>;
  }

  const { weather, forecast } = data;

  return (
    <section
      id="weather"
      className="glass flex w-full justify-center rounded-lg  border px-6 py-8 transition-colors duration-500 sm:justify-between
"
    >
      <div
        id="left"
        className="flex w-full flex-col-reverse sm:block sm:max-w-[280px] md:max-w-xs"
      >
        <div className="flex justify-center">
          <div>
            <p className="text-center text-7xl font-thin md:text-8xl">
              {Math.round(weather.main.temp)}°
              <sup className="text-3xl font-semibold sm:font-medium md:text-5xl">
                {unit}
              </sup>
            </p>
            <p className="dark:font-semibold">
              but feels like... {Math.round(weather.main.feels_like)}°{unit}
            </p>
          </div>
          <div className="flex flex-col justify-between dark:font-semibold">
            <div className="flex items-center">
              <MaxTemp width={40} fill="white" />
              {Math.round(weather.main.temp_max) + 1}°{unit}
            </div>
            <div className="flex items-center" title="Minimum Temparature">
              <MinTemp width={40} />
              {Math.round(weather.main.temp_min) - 1}°{unit}
            </div>
          </div>
        </div>
        <hr className="my-4 border-white transition-colors duration-500 dark:border-gray-800" />
        <div className="text-center capitalize">
          <Araw
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="block text-xl font-bold sm:hidden"
            options={{ year: undefined }}
          />
          <Oras
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="block text-lg dark:font-semibold sm:hidden"
            meridiemClasses="text-sm"
          />
          <WeatherIcons
            code={weather.weather[0].icon}
            className="m-auto w-[170px] sm:w-[70px]"
          />
          <p className="text-xl dark:font-semibold sm:text-lg">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <div
        id="right"
        className="hidden w-full sm:block sm:max-w-[280px] md:max-w-xs"
      >
        <div className="text-center">
          <Oras
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="text-9xl font-thin sm:text-7xl md:text-8xl"
            meridiemClasses="text-lg dark:font-semibold"
          />
          <Araw
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="dark:font-semibold"
          />
        </div>
        <hr className="my-4 border-white transition-colors duration-500 dark:border-gray-800" />
        <div className="flex items-center justify-around">
          <div>
            <SunRise width={70} className="m-auto" />
            <Oras
              unix={weather.sys.sunrise}
              timeZone={forecast.timezone}
              className="text-lg dark:font-semibold"
              meridiemClasses="text-sm"
            />
          </div>
          <div>
            <SunSet width={70} className="m-auto" />
            <Oras
              unix={weather.sys.sunset}
              timeZone={forecast.timezone}
              className="text-lg dark:font-semibold"
              meridiemClasses="text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
