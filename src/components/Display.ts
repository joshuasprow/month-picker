import type {
  Field,
  FieldsByConfigId,
  InteractionsById,
  ObjectFormat,
} from "@google/dscc";

const Td = (value: string) => {
  const td = document.createElement("td");
  td.innerText = value;
  return td;
};

const Th = (value: string) => {
  const th = document.createElement("th");
  th.innerText = value;
  return th;
};

const Tr = (values: string[], kind: "th" | "td") => {
  const tr = document.createElement("tr");
  for (const value of values) {
    const c = kind === "th" ? Th(value) : Td(value);
    tr.appendChild(c);
  }
  return tr;
};

const Title = (title: string) => {
  const caption = document.createElement("caption");
  caption.innerText = title;
  return caption;
};

const Thead = (headers: string[]) => {
  const thead = document.createElement("thead");
  thead.appendChild(Tr(headers, "th"));
  return thead;
};

const Tbody = (rows: string[][]) => {
  const tbody = document.createElement("tbody");
  for (const values of rows) {
    tbody.appendChild(Tr(values, "td"));
  }
  return tbody;
};

const Table = (title: string, headers: string[], rows: string[][]) => {
  const table = document.createElement("table");
  table.appendChild(Title(title));
  table.appendChild(Thead(headers));
  table.appendChild(Tbody(rows));
  return table;
};

const FieldsTable = (fieldsMap: FieldsByConfigId) => {
  const headers: (keyof Field | "configId")[] = [
    "configId",
    "id",
    "name",
    "type",
    "concept",
  ];

  const rows: string[][] = [];

  for (const [configId, fields] of Object.entries(fieldsMap)) {
    for (const field of fields) {
      rows.push([configId, field.id, field.name, field.type, field.concept]);
    }
  }

  return Table("Fields", headers, rows);
};

const Interactions = (interactions: InteractionsById) => {
  const div = document.createElement("div");

  const pre = document.createElement("pre");
  pre.innerText = JSON.stringify(interactions, null, 2);

  div.appendChild(Title("Interactions"));
  div.appendChild(pre);

  return div;
};

export const Display = (data: ObjectFormat) => {
  const div = document.createElement("div");
  div.id = "month-picker-display";

  const pre = document.createElement("pre");
  pre.innerText = JSON.stringify(data.interactions[0], null, 2);

  div.appendChild(FieldsTable(data.fields));
  div.appendChild(Interactions(data.interactions));

  return div;
};
