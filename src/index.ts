import { objectTransform, subscribeToData } from "@google/dscc";
import { Display } from "./components/Display";
import { MonthPicker } from "./components/MonthPicker";
import { Wrapper } from "./components/Wrapper";
import { LOCAL } from "./config";
import * as local from "./local-data";

const Viz = Wrapper(MonthPicker, Display);

if (LOCAL) {
  // renders locally
  Viz(local.message);
} else {
  subscribeToData(Viz, {
    transform: (data) => {
      console.log({ type: "transform", data });
      return objectTransform(data);
    },
  });
}
