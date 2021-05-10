import { ObjectFormat } from "@google/dscc";
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { MonthSelect } from "./MonthSelect";

export const render = (data: ObjectFormat) => {
  // document.body.innerHTML = "";

  const main = document.createElement("main");
  main.id = "root";

  document.body.appendChild(main);

  ReactDOM.render(
    <ErrorBoundary>
      <MonthSelect data={data} />
    </ErrorBoundary>,
    document.getElementById("root")
  );
};
