import type { ObjectFormat } from "@google/dscc";

export const Display = (data: ObjectFormat) => {
  const pre = document.createElement("pre");
  pre.id = "month-picker-display";
  pre.innerText = JSON.stringify(data, null, 2);

  return pre;
};
