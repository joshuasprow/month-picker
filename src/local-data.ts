/**
 * This file provides the mock "data" received
 * by your visualization code when you develop
 * locally.
 */

import { ConceptType, FieldType, ObjectFormat, ObjectRow } from "@google/dscc";
import { CONFIG_DIM_ID, CONFIG_MET_ID } from "./config";

// Data Studio Year-Month format is YYYYMM
const newYearMonth = (year: number, month: number) => {
  const date = new Date(year, month);

  // JS months are 0-based
  const m = date.getMonth() + 1;
  const mm = m.toString().padStart(2, "0");

  const yyyy = date.getFullYear().toString();

  return yyyy + mm;
};

const values = [
  [newYearMonth(2020, 10), "128863172"],
  [newYearMonth(2020, 11), "61175933"],
  [newYearMonth(2021, 0), "51055052"],
  [newYearMonth(2021, 1), "43351778"],
  [newYearMonth(2021, 2), "42179856"],
  [newYearMonth(2021, 3), "72912380"],
  [newYearMonth(2021, 4), "109123941"],
];

const rows: ObjectRow[] = values.map(([dim, met]) => ({
  [CONFIG_DIM_ID]: [dim],
  [CONFIG_MET_ID]: [met],
}));

export const message: ObjectFormat = {
  tables: { DEFAULT: rows },
  fields: {
    dimID: [
      {
        id: "qt_nzqx6a0xvb",
        name: "Month",
        type: FieldType.TEXT,
        concept: ConceptType.DIMENSION,
      },
    ],
    metricID: [
      {
        id: "qt_8isx6a0xvb",
        name: "Metric",
        type: FieldType.NUMBER,
        concept: ConceptType.METRIC,
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
  interactions: {},
};
