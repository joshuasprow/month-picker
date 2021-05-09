import * as dscc from "@google/dscc";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL } from "../config";

const MONTH_PICKER_ID = "month-picker";

const handleInteraction = ({
  dimensionId,
  monthKey,
}: {
  dimensionId: string;
  monthKey: string;
}) => {
  const interactionData: dscc.FilterInteractionData = {
    concepts: [dimensionId],
    values: [[monthKey]],
  };

  console.log({ CONFIG_INT_ID, interactionData });

  if (LOCAL) return;

  dscc.sendInteraction(
    CONFIG_INT_ID,
    dscc.InteractionType.FILTER,
    interactionData
  );
};

const Option = (key: dscc.RowEntry) => {
  const monthKey = key.toString();

  const option = document.createElement("option");
  option.value = monthKey;
  option.innerText = key.toString();

  return option;
};

const Select = (data: dscc.ObjectFormat) => {
  const dimensionId = data.fields[CONFIG_DIM_ID][0].id;
  const rows = data.tables.DEFAULT;

  const selectId = MONTH_PICKER_ID;
  const select = document.createElement("select");
  select.id = selectId;
  select.name = selectId;

  const monthKeys = rows.map((row) => row[CONFIG_DIM_ID][0]);

  for (const key of monthKeys) {
    select.appendChild(Option(key));
  }

  select.onchange = (event: any) => {
    const monthKey = event.target.value;

    handleInteraction({ dimensionId, monthKey });
  };

  return select;
};

export const MonthPicker = (data: dscc.ObjectFormat) => {
  console.log({ type: "render", data });

  return Select(data);
};
