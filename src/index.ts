import { ObjectFormat, objectTransform, subscribeToData } from "@google/dscc";
import { Display } from "./components/Display";
import { MonthPicker } from "./components/MonthPicker";
import { Wrapper } from "./components/Wrapper";
import config, { LOCAL } from "./config";
import * as local from "./local-data";

console.log({ config });

const render = (data: ObjectFormat) => {
  document.body.innerHTML = "";
  document.body.appendChild(Wrapper(data, MonthPicker, Display));
};

if (LOCAL) {
  render(local.message);
} else {
  subscribeToData(render, { transform: objectTransform });
}
