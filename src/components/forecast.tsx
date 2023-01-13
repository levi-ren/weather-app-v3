import { Location } from "../api";
import { WeatherIcons } from "../assets/icons";
import { DailyForecast as DF } from "../interfaces/weather-models";
import { dateToLocaleString } from "../utils/helpers";
import { useWeatherQuery } from "../utils/useWeatherQuery";
import { Spinner } from "./spinner";

interface IForecastProps {
  weather: DF;
  timeZone: string;
  unit: string;
}

const DailyForecast = ({ weather, timeZone, unit }: IForecastProps) => {
  const [weekday, date] = dateToLocaleString(new Date(weather.dt * 1000), {
    type: "date",
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: timeZone,
  }).split(", ");

  return (
    <div className="text-center p-4 border rounded-lg transition-colors duration-500 glass dark:font-semibold">
      <p>{weekday}</p>
      <p>{date}</p>
      <WeatherIcons code={weather.weather[0].icon} width={100} />
      <p>{weather.weather[0].main}</p>
      <p>
        {Math.round(weather.temp.max)}°{unit} / {Math.round(weather.temp.min)}°
        {unit}
      </p>
    </div>
  );
};

type ForecastProps = { location: Location; units: boolean };

export const Forecast = ({ location, units }: ForecastProps) => {
  const { data, isLoading, isError, isInitialLoading, isFetching } =
    useWeatherQuery(location, units);

  const unit = units ? "F" : "C";

  if (isLoading || isFetching) {
    if (!isInitialLoading && !isFetching) {
      return <></>;
    }
    return (
      <section
        id="forecasts loader"
        className="p-4 overflow-hidden w-full max-w-3xl"
      >
        <div className="flex justify-between overflow-x-auto gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border  rounded-lg h-[230px] grid place-items-center min-w-[134px] glass"
            >
              <Spinner />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return <></>;
  }

  const { forecast } = data;

  return (
    <section id="forecasts" className="p-4 overflow-hidden w-full max-w-3xl">
      <div className="flex justify-between overflow-x-auto gap-4">
        {forecast.daily.slice(1, 6).map((weather, i) => (
          <DailyForecast
            key={i}
            weather={weather}
            timeZone={forecast.timezone}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
};
