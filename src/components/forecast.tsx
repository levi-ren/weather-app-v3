import { Location } from "../api";
import { DailyForecast as DF } from "../interfaces/weather-models";
import { dateToLocaleString } from "../utils/helpers";
import { useWeatherQuery } from "../utils/useWeatherQuery";
import { WeatherIcons } from "./icons";
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
    <div className="glass rounded-lg border p-4 text-center transition-colors duration-500 dark:font-semibold">
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
        className="m-auto w-full max-w-3xl overflow-hidden p-4"
      >
        <div className="flex justify-between gap-4 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="glass  grid h-[230px] min-w-[134px] place-items-center rounded-lg border"
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
    <section
      id="forecasts"
      className="m-auto w-full max-w-3xl  overflow-hidden p-4"
    >
      <div className="flex justify-between gap-4 overflow-x-auto">
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
