export const dateToLocaleString = (
  date: Date,
  { type, ...options }: Intl.DateTimeFormatOptions & { type: "date" | "time" }
) =>
  type === "date"
    ? date.toLocaleDateString(navigator.language, options)
    : date.toLocaleTimeString(navigator.language, options);
