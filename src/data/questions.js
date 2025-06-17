export const surveyQuestions = {
  1: {
    id: 1,
    text: "Why are you visiting our site today?",
    type: "single-select",
    options: [
      {
        label: "To access resources",
        value: "access_resources",
        next: [2],
      },
      {
        label: "To attend an event",
        value: "redirect_events",
        next: "redirect:/events",
      },
      {
        label: "To find a provider",
        value: "find_a_provider",
        next: [4],
      },
    ],
  },
  2: {
    id: 2,
    text: "Are you looking for resources on a particular subject?",
    type: "multi-select",
    options: [
      {
        label: "Anxiety & Depression",
        value: "Anxiety_Depression",
        next: [3],
      },
      {
        label: "ADD & ADHD",
        value: "ADD_ADHD",
        next: [3],
      },
      {
        label: "OCD",
        value: "OCD",
        next: [3],
      },
      {
        label: "Bipolar Disorder",
        value: "Bipolar_Disorder",
        next: [3],
      },
      {
        label: "Drug & Addiction",
        value: "Drug_Addiction",
        next: [3],
      },
      {
        label: "Eating Disorder",
        value: "Eating_Disorder",
        next: [3],

      },
    ],
  },
  3: {
    id: 3,
    text: "What type of resources are you looking for?",
    type: "multi-select",
    options: [
      {
        label: "I'm looking to get help",
        value: "Getting the Help You Need"

      },
      {
        label: "I'm looking to advocate or provide outreach",
        value: "Advocacy and Outreach",
      },
      {
        label: "I'm looking for Black-centered resources",
        value: "Black-Centered Resources",
      },
    ],
  },
  4: {
    id: 4,
    text: "Where are you looking for care?",
    type: "dropdown",
    options: [
      { label: "Alabama", value: "Alabama", next: [5], },
      { label: "Alaska", value: "Alaska", next: [5], },
      { label: "Arizona", value: "Arizona", next: [5], },
      { label: "Arkansas", value: "Arkansas", next: [5], },
      { label: "California", value: "California", next: [5], } /* ...other states */,
    ],
  },
  5: {
    id: 5,
    text: "Are you only interested in receiving care virtually?",
    type: "single-select",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    filterKey: "virtual_only",
  },
};
