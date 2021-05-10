import {
  FieldsByConfigId,
  FieldType,
  FilterInteractionData,
  InteractionType,
  ObjectFormat,
  sendInteraction,
} from "@google/dscc";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select, { SelectProps } from "@material-ui/core/Select";
import React, { FC, useEffect, useState } from "react";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL } from "./config";

const validateDimensionField = (fieldsMap: FieldsByConfigId): Error | null => {
  const fields = fieldsMap[CONFIG_DIM_ID];

  if (!fields) {
    return new Error(`No fields with ID "${CONFIG_DIM_ID}`);
  }
  if (fields.length === 0) {
    return new Error(`"${CONFIG_DIM_ID}" fields have 0 elements`);
  }

  const [field] = fields;

  if (field.type !== FieldType.TEXT) {
    return new Error(
      `Dimension field is of type "${field.type}".\n` +
        `It must be"${FieldType.TEXT}" to work correctly.`
    );
  }

  return null;
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

export const MonthSelect: FC<{ data: ObjectFormat }> = ({ data }) => {
  const [error, setError] = useState<Error | null>(null);

  const months = data.tables.DEFAULT.map((row) => row[CONFIG_DIM_ID][0]);

  const handleChange: SelectProps["onChange"] = (event) => {
    const dimensionId = data.fields[CONFIG_DIM_ID][0].id;
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

  useEffect(() => {
    setError(validateDimensionField(data.fields));
  }, [data.fields]);

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
