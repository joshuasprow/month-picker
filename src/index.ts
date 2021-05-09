import { objectTransform, subscribeToData } from "@google/dscc";
import { LOCAL } from "./config";
import * as local from "./local-data";
import { MonthPicker } from "./month-picker";

if (LOCAL) {
  // renders locally
  MonthPicker(local.message);
} else {
  subscribeToData(MonthPicker, { transform: objectTransform });
}
