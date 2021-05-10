import React, { FC, useState } from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select, { SelectProps } from "@material-ui/core/Select";
import {
  FilterInteractionData,
  InteractionType,
  ObjectFormat,
  sendInteraction,
} from "@google/dscc";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL } from "./config";

const parseMonthKey = (key: string): { year: number; month: number } => {
  let yyyy = "";
  let mm = "";

  if (key.includes("-")) {
    [yyyy, mm] = key.split("-");
  } else {
    yyyy = key.substring(0, 4);
    mm = key.substring(4, 6);
  }

  const year = parseInt(yyyy);
  const month = parseInt(mm) - 1;

  if (isNaN(year) || isNaN(month)) {
    throw new Error(`failed to parse month key: ${key}`);
  }

  return { year, month };
};

const monthFormatter = new Intl.DateTimeFormat(navigator.language, {
  month: "short",
  year: "numeric",
});

const formatMonth = (key: string) => {
  const { year, month } = parseMonthKey(key);

  const date = new Date(year, month);

  return monthFormatter.format(date);
};

export const MonthSelect: FC<{ data: ObjectFormat }> = ({ data }) => {
  const [error, setError] = useState<Error | null>(null);

  const dimensionId = data.fields[CONFIG_DIM_ID][0].id;
  const rows = data.tables.DEFAULT;

  const months = rows.map((row) => row[CONFIG_DIM_ID][0]);

  const handleChange: SelectProps["onChange"] = (event) => {
    const key = event.target.value;

    if (typeof key !== "string") {
      setError(
        new Error(
          `event.target.value: expected "string", got "${typeof key}", value="${key}"`
        )
      );
      return;
    }

    const interactionData: FilterInteractionData = {
      concepts: [dimensionId],
      values: [[key]],
    };

    if (LOCAL) {
      setError(new Error("It's local dammit!"));
      return;
    }

    sendInteraction(CONFIG_INT_ID, InteractionType.FILTER, interactionData);
  };

  if (error) throw error;

  return (
    <FormControl margin="dense" variant="outlined">
      <InputLabel id="month-picker-label">Month</InputLabel>
      <Select
        defaultValue={months[0]}
        labelId="month-picker-label"
        label="Month"
        onChange={handleChange}
      >
        {months.map((month) => {
          const m = month.toString();
          return (
            <MenuItem key={m} value={m}>
              {formatMonth(m)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
