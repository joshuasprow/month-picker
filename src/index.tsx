import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<span>Hello</span>, document.body);

// import { ObjectFormat, objectTransform, subscribeToData } from "@google/dscc";
// import { Display } from "./components/Display";
// import { MonthPicker } from "./components/MonthPicker";
// import { Wrapper } from "./components/Wrapper";
// import { LOCAL } from "./config";

// const render = (data: ObjectFormat) => {
//   document.body.innerHTML = "";
//   document.body.appendChild(Wrapper(data, MonthPicker, Display));
// };

// if (LOCAL) {
//   render(require("./local-data").default);
// } else {
//   subscribeToData(render, { transform: objectTransform });
// }