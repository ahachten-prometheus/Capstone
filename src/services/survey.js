import { createContext, useState, useContext } from "react";

export const SurveyContext = createContext();

const useSurvey = () => useContext(SurveyContext);

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const storeAnswer = (question, answer) => {
    const field = question.field;
    setAnswers((prev) => ({ ...prev, [field]: answer }));
  };

  return (
    <SurveyContext.Provider value={{ answers, storeAnswer }}>
      {children}
    </SurveyContext.Provider>
  );
};
