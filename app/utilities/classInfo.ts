const inPerson = [
  {
    title: "Belly Dance for the Soul",
    image: "bellyDanceForTheSoul.jpg",
    skillLevel: "All",
    body: [
      "ALL ages, body types, and skills levels are welcome",
      "Find joy and healing through belly dance and other therapeutic movements within a space that strongly emphasizes community connection.",
    ],
    prereqs: [],
    time: 'Mondays at 5:30 PM\nJune 1st - July 27th (9 Weeks)',
    address: '\n2580 Jefferson Ave, Ogden, UT 84401\nDance Studio located near the parking lot in the back',
    cost: 100
  }
];

const online = [
  {
    title: "Restorative Belly Dance Online",
    skillLevel: "All",
    body: [
      "Restorative Belly Dance specifically focuses on the restorative properties of community, breath work, somatic work, and dance",
      "Each activity listed above is used to help restore different aspects of the Self within a space that strongly focuses on community connections",
    ],
    prereqs: [],
    time: 'Christmas Eve, 5 am',
    cost: 25
  },
];

export default {
  inPerson,
  online,
};

export function createID(title: string) {
  return title.replace(/\s+/g, "-").toLowerCase();
}
