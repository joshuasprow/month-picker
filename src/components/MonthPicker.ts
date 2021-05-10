import * as dscc from "@google/dscc";
import { FieldsByConfigId, FieldType } from "@google/dscc";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL, VERSION } from "../config";

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

  const selectId = "month-picker-select";
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

const ErrorMessage = (error: Error) => {
  console.error(error);

  const span = document.createElement("span");
  span.id = "month-picker-error";
  span.innerText = error.message;

  return span;
};

export const MonthPicker = (data: dscc.ObjectFormat) => {
  const div = document.createElement("div");
  div.id = "month-picker";

  const error = validateDimensionField(data.fields);
  if (error) {
    div.appendChild(ErrorMessage(error));
    return div;
  }

  const span = document.createElement("span");
  span.id = "month-picker-version";
  span.innerText = VERSION;

  div.appendChild(Select(data));
  div.appendChild(span);

  return div;
};
