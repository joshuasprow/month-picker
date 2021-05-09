import config from "./index.json";

export const LOCAL = process.env.LOCAL === "true";

export const CONFIG_DIM_ID = config.data[0].elements[0].id;
export const CONFIG_MET_ID = config.data[0].elements[1].id;
export const CONFIG_INT_ID = config.interactions[0].id;

export const VERSION = "v0.5";

export default {
  LOCAL,
  CONFIG_DIM_ID,
  CONFIG_MET_ID,
  CONFIG_INT_ID,
  VERSION,
};
