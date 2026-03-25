const inPerson = [
  {
    title: "Restorative Belly Dance 1",
    image: "",
    skillLevel: "All",
    body: [
      "Restorative Belly Dance specifically focuses on the restorative properties of community, breath work, somatic work, and dance",
      "Each activity listed above is used to help restore different aspects of the Self within a space that strongly focuses on community connections",
    ],
    prereqs: [],
  },
  {
    title: "Restorative Belly Dance 2",
    image: "",
    skillLevel: "Mega Advanced",
    body: [
      "Restorative Belly Dance specifically focuses on the restorative properties of community, breath work, somatic work, and dance",
      "Each activity listed above is used to help restore different aspects of the Self within a space that strongly focuses on community connections",
    ],
    prereqs: ["Restorative Belly Dance 1", "Fire Dancing with Confidence"],
  },
];

const online = [
  {
    title: "Restorative Belly Dance Online",
    image: "",
    skillLevel: "All",
    body: [
      "Restorative Belly Dance specifically focuses on the restorative properties of community, breath work, somatic work, and dance",
      "Each activity listed above is used to help restore different aspects of the Self within a space that strongly focuses on community connections",
    ],
    prereqs: [],
  },
];

const oneOnOne = [
  {
    title: "One-on-One Tutoring",
    image: "",
    skillLevel: "All",
    body: [
      "Restorative Belly Dance specifically focuses on the restorative properties of community, breath work, somatic work, and dance",
      "Each activity listed above is used to help restore different aspects of the Self within a space that strongly focuses on community connections",
    ],
    prereqs: [],
  },
];

export default {
  inPerson,
  online,
  oneOnOne,
};

export function createID(title: string) {
  return title.replace(/\s+/g, "-").toLowerCase();
}
