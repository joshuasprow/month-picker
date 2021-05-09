import { objectTransform, subscribeToData } from "@google/dscc";
import { Display } from "./components/Display";
import { MonthPicker } from "./components/MonthPicker";
import { Wrapper } from "./components/Wrapper";
import config, { LOCAL } from "./config";
import * as local from "./local-data";

console.log({ config });

const Viz = Wrapper(MonthPicker, Display);

if (LOCAL) {
  // renders locally
  Viz(local.message);
} else {
  subscribeToData(Viz, { transform: objectTransform });
}
