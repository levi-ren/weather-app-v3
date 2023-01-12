import { Location } from "../api";
import { WeatherIcons } from "../assets/icons";
import { ReactComponent as SunRise } from "../assets/sunrise.svg";
import { ReactComponent as SunSet } from "../assets/sunset.svg";
import { ReactComponent as MinTemp } from "../assets/thermometer-colder.svg";
import { ReactComponent as MaxTemp } from "../assets/thermometer-warmer.svg";
import { dateToLocaleString } from "../utils/helpers";
import { useWeatherQuery } from "../utils/useWeatherQuery";
import { Araw, Oras } from "./datetime";
import { Spinner } from "./spinner";

interface DateTimeProps {
  unix: number;
  timeZone: string;
  timeOnly?: true;
  dateOnly?: true;
  className?: string;
}

const DateTime = (props: DateTimeProps) => {
  const { unix, timeZone, timeOnly, dateOnly, className } = props;
  const dateTime = new Date(unix * 1000);

  const date = dateToLocaleString(dateTime, {
    type: "date",
    timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });

  const [time, meridiem] = dateToLocaleString(dateTime, {
    type: "time",
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).split(" ");

  return (
    <>
      {!dateOnly && (
        <p className={className}>
          {time}
          <span className="text-lg">{meridiem}</span>
        </p>
      )}

      {!timeOnly && <p className="text-center">{date}</p>}
    </>
  );
};

type WeatherProps = { location: Location; units: boolean };

export const Weather = ({ location, units }: WeatherProps) => {
  const { data, isLoading, isError, error, isInitialLoading } = useWeatherQuery(
    location,
    units
  );

  const unit = units ? "F" : "C";

  if (isLoading) {
    if (!isInitialLoading) return <></>;
    return (
      <section
        id="weather loader"
        className="w-full border rounded-lg md:h-[318px] sm:h-[294px]  grid place-items-center h-[393px] glass"
      >
        <Spinner />
      </section>
    );
  }

  if (isError) {
    if (error instanceof Error) {
      return <span>Error: {error.message}</span>;
    }

    return <>Error</>;
  }

  const { weather, forecast } = data;

  return (
    <section
      id="weather"
      className="flex justify-center sm:justify-between w-full border  rounded-lg px-6 py-8 transition-colors duration-500 glass
"
    >
      <div
        id="left"
        className="sm:max-w-[280px] md:max-w-xs w-full sm:block flex flex-col-reverse"
      >
        <div className="flex justify-center">
          <div>
            <p className="text-7xl md:text-8xl font-thin text-center">
              {Math.round(weather.main.temp)}°
              <sup className="text-3xl md:text-5xl font-semibold sm:font-medium">
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
        <hr className="my-4 dark:border-gray-800 border-white transition-colors duration-500" />
        <div className="text-center capitalize">
          <Araw
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="block sm:hidden font-bold text-xl"
            options={{ year: undefined }}
          />
          <Oras
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="block sm:hidden dark:font-semibold text-lg"
            meridiemClasses="text-sm"
          />
          <WeatherIcons
            code={weather.weather[0].icon}
            className="m-auto w-[170px] sm:w-[70px]"
          />
          <p className="text-xl sm:text-lg dark:font-semibold">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <div
        id="right"
        className="sm:max-w-[280px] md:max-w-xs w-full hidden sm:block"
      >
        <div className="text-center">
          <Oras
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="text-9xl sm:text-7xl md:text-8xl font-thin"
            meridiemClasses="text-lg dark:font-semibold"
          />
          <Araw
            unix={Date.now() / 1000}
            timeZone={forecast.timezone}
            className="dark:font-semibold"
          />
        </div>
        <hr className="my-4 dark:border-gray-800 border-white transition-colors duration-500" />
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
