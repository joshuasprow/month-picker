import { objectTransform, subscribeToData } from "@google/dscc";
import { LOCAL } from "./config";
import { render } from "./render";

if (LOCAL) {
  render(require("./local-data").default);
} else {
  subscribeToData(render, { transform: objectTransform });
}
