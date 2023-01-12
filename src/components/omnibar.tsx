import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import { fetchLocations, Location } from "../api";
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

  const { data, isFetching } = useQuery({
    queryKey: ["locations", debSearch],
    queryFn: () => fetchLocations(debSearch),
    enabled: !!debSearch,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div id="search" className="w-full relative">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white dark:text-gray-900 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm rounded-lg placeholder-white border outline-gray-600 transition-colors duration-500 glass dark:font-bold"
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
        className={`absolute w-full mt-1  rounded-lg z-10 border divide-gray-100 transition-all duration-300 overflow-x-auto max-h-[40vh] glass backdrop-blur-md bg-opacity-90 dark:bg-opacity-50
        ${(data || search) && focused ? "opacity-100" : "opacity-0 invisible"}`}
      >
        <div className="flex justify-between items-center border-b">
          <p className="p-2 text-sm font-bold dark:font-extrabold">
            Search for: {search}
          </p>
          {isFetching && <Spinner className="" />}
        </div>

        <div className="divide-y">
          {!isFetching &&
            data?.map((loc, i) => (
              <div
                key={`${loc.lat},${loc.lon}`}
                className="w-full px-2 py-4 cursor-pointer dark:hover:bg-gray-300 hover:bg-gray-600 transition-colors dark:font-semibold"
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
      </div>
    </div>
  );
};
