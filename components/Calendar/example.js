import moment from "moment";

export const example = [
  {
    id: 0,
    title: `Ejemplo`,
    background: "#049be5",
    start: moment().startOf("day").add(8.5, "hours").toDate(),
    end: moment().startOf("day").add(9, "hours").toDate(),
    resourceId: 1,
  },
  {
    id: 1,
    title: "Ejemplo2",
    start: moment().startOf("day").add(12, "hours").toDate(),
    end: moment().startOf("day").add(12.5, "hours").toDate(),
    background: "#049be5",
    resourceId: 2,
  },
  {
    id: 2,
    title: "Ejemplo3",
    start: moment().add(2, "day").add().toDate(),
    end: moment().add(2, "day").add(2, "hours").toDate(),
    background: "#049be5",
    resourceId: 3,
  },
];
