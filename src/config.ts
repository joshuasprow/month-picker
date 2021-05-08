import config from "./index.json";

export const LOCAL = process.env.NODE_ENV === "development";

export const CONFIG_DIM_ID = config.data[0].elements[0].id;
export const CONFIG_MET_ID = config.data[0].elements[1].id;
export const CONFIG_INT_ID = config.interactions[0].id;
