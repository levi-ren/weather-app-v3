import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { fetchLocations, Location } from "../api";
import { ReactComponent as Magnify } from "../assets/magnify.svg";
import countryCodes from "../utils/country-codes.json";
import { useDebounce } from "../utils/useDebounce";
import { Spinner } from "./spinner";

type OmnibarProps = {
  setLocation: (e: Location) => void;
};
export const Omnibar = ({ setLocation }: OmnibarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const debSearch = useDebounce(search);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["locations", debSearch],
    queryFn: () => fetchLocations(debSearch),
    enabled: !!debSearch,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div id="search" className="relative w-full">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative ">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Magnify className="z-10 h-5 w-5 text-white dark:text-gray-900" />
        </div>
        <input
          ref={inputRef}
          type="search"
          id="default-search"
          className={`glass block w-full rounded-lg border p-4 pl-10 text-sm placeholder-white outline-gray-600 transition-colors  duration-500  dark:font-bold`}
          placeholder="Search City, State, Country"
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocused(false);
            }, 100)
          }
          autoComplete="off"
        />
      </div>
      <div
        className={`glass absolute z-10  mt-1 max-h-[40vh] w-full divide-gray-100 overflow-x-auto rounded-lg border bg-opacity-90 backdrop-blur-md transition-all duration-300 dark:bg-opacity-50
        ${
          (data || search) && focused && !isError
            ? "opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between ">
          <p className="p-2 text-sm font-bold dark:font-extrabold">
            Search for: {search}
          </p>
          {isFetching && <Spinner className="" />}
        </div>

        {!isFetching && data && (
          <div className="divide-y">
            {data.map((loc, i) => (
              <div
                key={`${loc.lat},${loc.lon}`}
                className="w-full cursor-pointer px-2 py-4 transition-colors first:border-t hover:bg-gray-600 dark:font-semibold dark:hover:bg-gray-300"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = `${loc.name}${
                      loc.state ? `, ${loc.state}` : ""
                    }, ${countryCodes[loc.country]}`;
                  }
                  setLocation(loc);
                }}
              >
                {loc.name}
                {loc.state && `, ${loc.state}`}, {countryCodes[loc.country]}
              </div>
            ))}
          </div>
        )}
        {!isFetching && data && data.length === 0 && (
          <em className="block p-4 text-center dark:font-semibold">
            --- No Results Found ---
          </em>
        )}
      </div>
    </div>
  );
};
