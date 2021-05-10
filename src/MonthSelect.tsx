import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const months = [
  "2020-05-01",
  "2020-04-01",
  "2020-03-01",
  "2020-02-01",
  "2021-01-01",
  "2020-12-01",
  "2020-11-01",
];

const formatMonth = (month: string) => {
  const [yyyy, mm] = month.split("-");

  const date = new Date(parseInt(yyyy), parseInt(mm) - 1);
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
};

export const MonthSelect = () => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="month-picker-label">Month</InputLabel>
      <Select defaultValue={months[0]} labelId="month-picker-label">
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {formatMonth(month)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
