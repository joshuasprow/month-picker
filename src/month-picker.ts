import * as dscc from "@google/dscc";
import { CONFIG_DIM_ID, LOCAL } from "./config";

const MONTH_PICKER_ID = "month-picker";

const handleInteraction = (monthKey: string) => {
  console.log({ monthKey });

  if (LOCAL) return;

  dscc.sendInteraction("interactionId", dscc.InteractionType.FILTER, {
    concepts: [CONFIG_DIM_ID],
    values: [[monthKey]],
  });
};

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

export const createMonthPicker = (data: dscc.ObjectFormat) => {
  const rows = data.tables.DEFAULT;

  const selectId = MONTH_PICKER_ID;
  const select = document.createElement("select");
  select.id = selectId;
  select.name = selectId;

  const monthKeys = rows.map((row) => row[CONFIG_DIM_ID]);

  console.log({ monthKeys });

  for (const key of monthKeys) {
    const option = document.createElement("option");
    option.value = key.toString();
    option.innerText = key.toString();

    select.appendChild(option);
  }

  select.onchange = (event: any) => {
    const monthKey = event.target.value;

    handleInteraction(monthKey);
  };

  return select;
};

export const MonthPicker = (data: dscc.ObjectFormat) => {
  console.log({ data });

  const old = document.getElementById(MONTH_PICKER_ID);

  if (old) {
    old.parentElement?.removeChild(old);
  }

  document.body.appendChild(createMonthPicker(data));
};
