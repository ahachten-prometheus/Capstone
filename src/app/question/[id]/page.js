'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { surveyQuestions } from '@/data/questions';
import { useSurvey } from '@/services/survey';


export default function QuestionPage() {
  const { storeAnswer } = useSurvey()
  const { id } = useParams();
  const router = useRouter();
  const questionId = Number(id);
  const question = surveyQuestions[questionId];

  if (!question) {
    return <div className="p-4 text-red-600">Question not found</div>;
  }

  // const handleContinue = () => {
  //   const nextId = questionId + 1;
  //   if (surveyQuestions[nextId]) {
  //     router.push(`/question/${nextId}`);
  //   } else {
  //     alert("Survey complete. Thank you!");
  //     router.push("/");
  //   }
  // };

  // const handleBack = () => {
  //   if (questionId > 1) {
  //     router.push(`/question/${questionId - 1}`);
  //   } else {
  //     router.push("/");
  //   }
  // };

  return (
    <div className="p-6">
      <button
        // onClick={handleBack}
        className="#000000 w-[60px] h-[55px] rounded-[8px] text-xl flex items-center justify-center mb-6"
      > ←
      </button>

      <h1 className="text-xl font-bold mb-4">
        Question {question.id}: {question.text}
      </h1>

      {(question.type === "single-select" || question.type === "multi-select") && (
        <ul className="space-y-2 mb-6">
          {question.options.map((option, idx) => (
            <li key={idx}>
              <label className="flex items-center">
                <input
                  type={question.type === "multi-select" ? "checkbox" : "radio"}
                  name={`question-${question.id}`}
                  value={option.value}
                  className="mr-2"
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}

      {question.type === "dropdown" && (
        <select
          name={`question-${question.id}`}
          className="mt-2 p-2 border rounded mb-6"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      <button
        // onClick={handleContinue}
        className="w-full max-w-md h-[55px] bg-[#C96C86] rounded-[8px] text-white font-semibold"
      >
        Continue
      </button>
    </div>
  );
}