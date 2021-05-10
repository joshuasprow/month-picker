/**
 * This file provides the mock "data" received
 * by your visualization code when you develop
 * locally.
 */

import {
  ConceptType,
  FieldType,
  InteractionType,
  ObjectFormat,
  ObjectRow,
} from "@google/dscc";
import { CONFIG_DIM_ID } from "./config";

// Data Studio Year-Month format is YYYYMM
const newYearMonth = (year: number, month: number) => {
  const date = new Date(year, month);

  // JS months are 0-based
  const m = date.getMonth() + 1;
  const mm = m.toString().padStart(2, "0");

  const yyyy = date.getFullYear().toString();

  return yyyy + mm;
};

const months = [
  newYearMonth(2020, 10),
  newYearMonth(2020, 11),
  newYearMonth(2021, 0),
  newYearMonth(2021, 1),
  newYearMonth(2021, 2),
  newYearMonth(2021, 3),
  newYearMonth(2021, 4),
];

const rows: ObjectRow[] = months.map((month) => ({
  [CONFIG_DIM_ID]: [month],
}));

console.log(rows);

const localData: ObjectFormat = {
  tables: { DEFAULT: rows },
  fields: {
    monthId: [
      {
        id: "qt_nzqx6a0xvb",
        name: "Month",
        type: FieldType.TEXT,
        concept: ConceptType.DIMENSION,
      },
    ],
  },
  theme: {
    themeFillColor: {
      color: "white",
    },
    themeFontColor: {
      color: "black",
    },
    themeAccentFillColor: {
      color: "black",
    },
    themeAccentFontColor: {
      color: "white",
    },
    themeFontFamily: "Roboto",
    themeAccentFontFamily: "Roboto",
    themeIncreaseColor: {
      color: "darkgray",
    },
    themeDecreaseColor: {
      color: "lightgray",
    },
    themeGridColor: {
      color: "red",
    },
    themeSeriesColor: [],
  },
  style: {},
  interactions: {
    onSelect: {
      supportedActions: [InteractionType.FILTER],
      value: {
        type: InteractionType.FILTER,
        data: "",
      },
    },
  },
};

export default localData;
