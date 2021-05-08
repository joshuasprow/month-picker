// Data Studio Year-Month format is YYYYMM
export const encodeMonthKey = (date: Date) => {
  // JS months are 0-based
  const month = date.getMonth() + 1;

  const mm = month.toString().padStart(2, "0");
  const yyyy = date.getFullYear().toString();

  return yyyy + mm;
};

export const formatMonthKey = (key: string) => {
  const yyyy = key.substring(0, 4);
  const mm = key.substring(4);

  const date = new Date(parseInt(yyyy), parseInt(mm));

  return new Intl.DateTimeFormat("en-us", {
    month: "short",
    year: "numeric",
  }).format(date);
};
