import { ObjectFormat, objectTransform, subscribeToData } from "@google/dscc";
import React from "react";
import ReactDOM from "react-dom";
import { LOCAL } from "./config";
import { MonthSelect } from "./MonthSelect";

const render = (data: ObjectFormat) => {
  ReactDOM.render(<MonthSelect />, document.getElementById("root"));
};

if (LOCAL) {
  render(require("./local-data").default);
} else {
  subscribeToData(render, { transform: objectTransform });
}
