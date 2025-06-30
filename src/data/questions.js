export const surveyQuestions = {
  1: {
    id: 1,
    text: "Why are you visiting our site today?",
    type: "single-select",
    field: "visit_reason",
    options: [
      {
        label: "To access resources",
        value: "access_resources",
        next: [2, 3],
      },
      {
        label: "To attend an event",
        value: "redirect_events",
        next: "redirect:/events",
      },
      {
        label: "To find a provider",
        value: "find_a_provider",
        next: [4, 5],
      },
    ],
  },
  2: {
    id: 2,
    text: "Are you looking for resources on a particular subject?",
    type: "multi-select",
    field: "resources_subject",
    options: [
      { label: "Anxiety & Depression", value: "Anxiety_Depression" },
      { label: "ADD & ADHD", value: "ADD_ADHD" },
      { label: "OCD", value: "OCD" },
      { label: "Bipolar Disorder", value: "Bipolar_Disorder" },
      { label: "Drug & Addiction", value: "Drug_Addiction" },
      { label: "Eating Disorder", value: "Eating_Disorder" },
    ],
  },
  3: {
    id: 3,
    text: "What type of resources are you looking for?",
    type: "multi-select",
    field: "resources_category",
    options: [
      { label: "I'm looking to get help", value: "Getting the Help You Need" },
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
    field: "provider_state",
    options: [
      { label: "Alabama", value: "Alabama" },
      { label: "Alaska", value: "Alaska" },
      { label: "Arizona", value: "Arizona" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "California", value: "California" } /* ...other states */,
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
    field: "virtual_only",
  },
};
