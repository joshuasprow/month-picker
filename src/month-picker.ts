import * as dscc from "@google/dscc";
import { CONFIG_DIM_ID, LOCAL } from "./config";

const MONTH_PICKER_ID = "month-picker";

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

const handleInteraction = ({
  dimensionId,
  monthKey,
}: {
  dimensionId: string;
  monthKey: string;
}) => {
  console.log({ dimensionId, monthKey });
  if (LOCAL) return;

  dscc.sendInteraction("interactionId", dscc.InteractionType.FILTER, {
    concepts: [dimensionId],
    values: [[monthKey]],
  });
};

export const createMonthPicker = (data: dscc.ObjectFormat) => {
  const dimensionId = data.fields[CONFIG_DIM_ID][0].id;
  const rows = data.tables.DEFAULT;

  const selectId = MONTH_PICKER_ID;
  const select = document.createElement("select");
  select.id = selectId;
  select.name = selectId;

  const monthKeys = rows.map((row) => row[CONFIG_DIM_ID][0]);

  for (const key of monthKeys) {
    const monthKey = key.toString();

    const option = document.createElement("option");
    option.value = monthKey;
    option.innerText = key.toString();

    select.appendChild(option);
  }

  select.onchange = (event: any) => {
    const monthKey = event.target.value;

    handleInteraction({ dimensionId, monthKey });
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
