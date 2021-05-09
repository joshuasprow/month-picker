import type { ObjectFormat } from "@google/dscc";

type Component = (data: ObjectFormat) => HTMLElement;

export const Wrapper = (data: ObjectFormat, ...components: Component[]) => {
  const main = document.createElement("main");
  main.id = "month-picker-wrapper";

  for (const Component of components) {
    main.appendChild(Component(data));
  }

  return main;
};
