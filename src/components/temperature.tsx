interface TemparatureProps {
  units: boolean;
  setUnits: (e: (b: any) => boolean) => void;
}

export const Temperature = ({ units, setUnits }: TemparatureProps) => {
  return (
    <label
      className="relative mr-5 inline-flex cursor-pointer items-center self-end"
      htmlFor="peer"
    >
      <input
        id="peer"
        type="checkbox"
        onChange={(e) => {
          setUnits((e) => !e);
          localStorage.setItem("unit", `${e.target.checked}`);
        }}
        checked={units}
        className="peer sr-only"
        aria-label="temperature switch"
      />
      <div
        className="peer h-7 w-[3.3rem] rounded-full bg-orange-500 text-center text-sm font-bold  leading-[22px] transition-colors duration-500 after:absolute after:top-0.5 after:left-[2px] after:h-6
        after:w-6 after:rounded-full after:border  after:border-gray-300 after:bg-white after:text-orange-700 after:transition-all after:content-['°C'] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:text-green-800 peer-checked:after:content-['°F'] dark:border-gray-600 dark:bg-orange-700 dark:after:text-orange-500 dark:peer-checked:bg-green-700 dark:peer-checked:after:text-green-500"
      />
    </label>
  );
};
