import { SurveyProvider } from "@/services/survey";

export default function QuestionLayout({ children }) {
  return (
    <SurveyProvider>
      {children}
    </ SurveyProvider>
  )
}