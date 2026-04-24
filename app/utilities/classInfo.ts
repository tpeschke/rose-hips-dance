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
    cost: 50
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
    cost: 25
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
    cost: 25
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
    cost: 175
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
