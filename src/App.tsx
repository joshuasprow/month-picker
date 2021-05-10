import {
  FieldsByConfigId,
  FieldType,
  InteractionsById,
  ObjectFormat,
  ObjectRow,
  objectTransform,
  subscribeToData,
} from "@google/dscc";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import { CONFIG_DIM_ID, CONFIG_INT_ID, LOCAL } from "./config";
import { ErrorBox } from "./ErrorBox";
import { MonthSelect } from "./MonthSelect";

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

const validateInteraction = (interactions: InteractionsById): Error | null => {
  const interaction = interactions[CONFIG_INT_ID];

  if (!interaction) {
    return new Error(`Interaction "${CONFIG_INT_ID}" not found`);
  }

  if (!("type" in interaction.value) || !interaction.value.type) {
    return new Error(
      `Interaction "${CONFIG_INT_ID}" has no type. ` +
        `Make sure "Apply Filter" is checked.`
    );
  }

  return null;
};

export const App = () => {
  const [error, setError] = useState<Error | null>(null);

  const [dimensionId, setDimensionId] = useState<string | null>(null);
  const [table, setTable] = useState<ObjectRow[]>([]);

  const handleNewData = (d: ObjectFormat) => {
    setError(null);

    let e = validateDimensionField(d.fields);
    if (e) {
      setError(e);
      return;
    }

    e = validateInteraction(d.interactions);
    if (e) {
      setError(e);
      return;
    }

    setDimensionId(d.fields[CONFIG_DIM_ID][0].id);
    setTable(d.tables.DEFAULT);
  };

  useEffect(() => {
    if (LOCAL) {
      const local = require("./local-data").default;
      handleNewData(local);
    } else {
      subscribeToData(handleNewData, { transform: objectTransform });
    }
  }, []);

  if (error) return <ErrorBox error={error} />;

  if (!dimensionId || table.length === 0) return null;

  return (
    <Box paddingLeft="0.5rem">
      <MonthSelect dimensionId={dimensionId} table={table} />
    </Box>
  );
};
