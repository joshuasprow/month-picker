import type { ObjectFormat } from "@google/dscc";

type Component = (data: ObjectFormat) => HTMLElement;

export const Wrapper = (...components: Component[]) => (data: ObjectFormat) => {
  const main = document.createElement("main");
  main.id = "month-picker-wrapper";

  for (const Component of components) {
    main.appendChild(Component(data));
  }

  document.body.appendChild(main);
};
