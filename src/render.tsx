import { ObjectFormat } from "@google/dscc";
import React from "react";
import ReactDOM from "react-dom";
import { MonthSelect } from "./MonthSelect";

export const render = (data: ObjectFormat) => {
  document.body.innerHTML = "";

  const main = document.createElement("main");
  main.id = "root";

  document.body.appendChild(main);

  ReactDOM.render(<MonthSelect />, document.getElementById("root"));
};
