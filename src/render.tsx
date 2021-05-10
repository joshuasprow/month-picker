import { ObjectFormat } from "@google/dscc";
import React from "react";
import ReactDOM from "react-dom";
import { MonthSelect } from "./MonthSelect";

export const render = (data: ObjectFormat) => {
  ReactDOM.render(<MonthSelect />, document.getElementById("root"));
};
