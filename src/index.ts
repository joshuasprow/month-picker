import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const main = document.createElement("main");
main.id = "root";
document.body.appendChild(main);

ReactDOM.render(
  // @google/dscc-scripts fails to compile .tsx files, so I'm using
  // React.createElement instead of jsx syntax here.
  React.createElement(App),
  document.getElementById("root")
);
