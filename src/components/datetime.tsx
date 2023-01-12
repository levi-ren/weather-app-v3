import { dateToLocaleString } from "../utils/helpers";

interface DateTimeProps {
  unix: number;
  timeZone: string;
  className?: string;
  options?: Intl.DateTimeFormatOptions;
}
interface AdditionalProps {
  meridiemClasses?: string;
}

export const Araw = ({ unix, timeZone, className, options }: DateTimeProps) => {
  const dateTime = new Date(unix * 1000);
  const date = dateToLocaleString(dateTime, {
    type: "date",
    timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
    ...options,
  });
  return <div className={className}>{date}</div>;
};

export const Oras = (props: DateTimeProps & AdditionalProps) => {
  const { unix, timeZone, className, meridiemClasses } = props;
  const dateTime = new Date(unix * 1000);
  const [time, meridiem] = dateToLocaleString(dateTime, {
    type: "time",
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).split(" ");
  return (
    <div className={className}>
      <p>
        {time}
        <span className={`${meridiemClasses}`}>{meridiem}</span>
      </p>
    </div>
  );
};
