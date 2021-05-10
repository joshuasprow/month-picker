import {
  FilterInteractionData,
  InteractionType,
  ObjectRow,
  sendInteraction,
} from "@google/dscc";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select, { SelectProps } from "@material-ui/core/Select";
import React, { FC, useEffect, useState } from "react";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL } from "./config";
import { ErrorBox } from "./ErrorBox";

const sendInteractionData = ({
  dimensionId,
  key,
}: {
  dimensionId: string;
  key: string;
}) => {
  const interactionData: FilterInteractionData = {
    concepts: [dimensionId],
    values: [[key]],
  };

  if (LOCAL) return;

  sendInteraction(CONFIG_INT_ID, InteractionType.FILTER, interactionData);
};

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

export const MonthSelect: FC<{ dimensionId: string; table: ObjectRow[] }> = ({
  dimensionId,
  table,
}) => {
  const [error, setError] = useState<Error | null>(null);

  const months = table.map((row) => row[CONFIG_DIM_ID][0]);
  const defaultMonth = months[0];

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

    sendInteractionData({ dimensionId, key });
  };

  useEffect(() => {
    sendInteractionData({ dimensionId, key: defaultMonth.toString() });
  }, []);

  if (error) return <ErrorBox error={error} />;

  return (
    <FormControl margin="dense" variant="outlined">
      <InputLabel id="month-picker-label">Month</InputLabel>
      <Select
        defaultValue={defaultMonth}
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
