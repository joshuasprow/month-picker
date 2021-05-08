import { ObjectFormat, objectTransform, subscribeToData } from "@google/dscc";
import { LOCAL } from "./config";
import * as local from "./local-data";
import { MonthPicker } from "./month-picker";

const drawViz = (data: ObjectFormat) => {
  MonthPicker(data);
};

if (LOCAL) {
  // renders locally
  drawViz(local.message);
} else {
  subscribeToData(drawViz, { transform: objectTransform });
}
