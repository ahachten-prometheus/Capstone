export const surveyQuestions = {
  1: {
    id: 1,
    text: "Why are you visiting our site today?",
    type: "single-select",
    options: [
      {
        label: "To access resources",
        next: [2, 3],
      },
      {
        label: "To attend an event",
        next: "redirect:/events",
      },
      {
        label: "To find a provider",
        next: [4, 5],
      },
    ],
  },
  2: {
    id: 2,
    text: "Are you looking for resources on a particular subject?",
    type: "multi-select",
    options: [
      "Anxiety & Depression",
      "ADD & ADHD",
      "OCD",
      "Bipolar Disorder",
      "Drug & Addiction",
      "Eating Disorder",
    ],
  },
  3: {
    id: 3,
    text: "What type of resources are you looking for?",
    type: "multi-select",
    options: [
      "I’m looking to get help",
      "I’m looking to advocate or provide outreach",
      "I’m looking for Black-centered resources",
    ],
  },
  4: {
    id: 4,
    text: "Where are you looking for care?",
    type: "dropdown",
    options: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California" /* ...other states */,
    ],
  },
  5: {
    id: 5,
    text: "Are you only interested in receiving care virtually?",
    type: "single-select",
    options: ["Yes", "No"],
    filterKey: "virtual_only",
  },
};
