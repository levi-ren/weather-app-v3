import { SVGProps } from "react";
import { ReactComponent as ClearDay } from "../assets/clear-day.svg";
import { ReactComponent as ClearNight } from "../assets/clear-night.svg";
import { ReactComponent as Cloudy } from "../assets/cloudy.svg";
import { ReactComponent as Drizzle } from "../assets/drizzle.svg";
import { ReactComponent as Mist } from "../assets/mist.svg";
import { ReactComponent as NA } from "../assets/not-available.svg";
import { ReactComponent as OvercastDay } from "../assets/overcast-day.svg";
import { ReactComponent as OvercastNight } from "../assets/overcast-night.svg";
import { ReactComponent as RainDay } from "../assets/partly-cloudy-day-rain.svg";
import { ReactComponent as SnowDay } from "../assets/partly-cloudy-day-snow.svg";
import { ReactComponent as PartlyCloudyDay } from "../assets/partly-cloudy-day.svg";
import { ReactComponent as RainNight } from "../assets/partly-cloudy-night-rain.svg";
import { ReactComponent as SnowNight } from "../assets/partly-cloudy-night-snow.svg";
import { ReactComponent as PartlyCloudyNight } from "../assets/partly-cloudy-night.svg";
import { ReactComponent as ThunderStormDay } from "../assets/thunderstorms-day.svg";
import { ReactComponent as ThunderStormNight } from "../assets/thunderstorms-night.svg";

const icons = {
  "01d": ClearDay,
  "01n": ClearNight,
  "02d": PartlyCloudyDay,
  "02n": PartlyCloudyNight,
  "03n": Cloudy,
  "03d": Cloudy,
  "04d": OvercastDay,
  "04n": OvercastNight,
  "09d": Drizzle,
  "09n": Drizzle,
  "10d": RainDay,
  "10n": RainNight,
  "11d": ThunderStormDay,
  "11n": ThunderStormNight,
  "13d": SnowDay,
  "13n": SnowNight,
  "50d": Mist,
  "50n": Mist,
  "n/a": NA,
};

export type WeatherCodes = keyof typeof icons;

interface WeatherIconsProps extends SVGProps<any> {
  code: WeatherCodes;
}

export const WeatherIcons = ({ code, ...rest }: WeatherIconsProps) => {
  const Icon = icons[code];
  return <Icon {...rest} />;
};

export default icons;
