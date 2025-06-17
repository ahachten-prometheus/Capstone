'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { surveyQuestions } from '@/data/questions';



export default function QuestionPage() {
  const { id } = useParams();
  const router = useRouter();
  const questionId = Number(id);
  const question = surveyQuestions[questionId];
  const [selectedValue, setSelectedValue] = useState(''); //will be grabbing current selected value
  const [nextPath, setNextPath] = useState([]) //will be cloning the global "next" in surveyQuestions to get the right values
  const [isDisabled, setIsDisabled] = useState(true) //disabling button when value is not yet selected

  if (!question) {
    return <div className="p-4 text-red-600">Question not found</div>;
  }

  //checking all option.next values that matches with the current ID, making that the previous page
  function findPreviousQuestionId(currentQuestionId) {
    for (const [id, question] of Object.entries(surveyQuestions)) {
      for (const option of question.options || []) {
        const next = option.next;
        if (Array.isArray(next) && next.includes(currentQuestionId)) {
          return Number(id); // return the question that led here
        }
        if (typeof next === 'number' && next === currentQuestionId) {
          return Number(id);
        }
      }
    }
    return null; // not found
  }


  const handleBack = () => {
    const prevId = findPreviousQuestionId(questionId);

    if (prevId === null || prevId === 0) {
      router.push('/');
    } else {
      router.push(`/question/${prevId}`);
    }
  };


  const handleChange = (event) => {
    const value = event.target.value
    setSelectedValue(value)
    setIsDisabled(false)

    const selectedOption = question.options.find(option => option.value === value)

    if (selectedOption) {
      if (Array.isArray(selectedOption.next)) {
        setNextPath([...selectedOption.next])
      } else if (typeof selectedOption.next === 'string') {
        setNextPath([selectedOption.next])
      } else {
        setNextPath([]);
      }
    }
  };

  const handleContinue = () => {
    if (!selectedValue) {
      setIsDisabled(true)
    }

    if (nextPath.length > 0) {
      const nextItem = nextPath[0]

      setNextPath(nextItem)

      if (typeof nextItem === 'string' && nextItem.startsWith('redirect:')) {
        const redirectPath = nextItem.replace('redirect:', '')

        router.push(redirectPath)
      } else {
        router.push(`/question/${nextItem}`)

      }
    } else {
      alert("There are no more questions, thank you!")
      router.push('/')

    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleBack}
        className="#000000 w-[60px] h-[55px] rounded-[8px] text-xl flex items-center justify-center mb-6 cursor-pointer"
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
                  onChange={handleChange}
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
          onChange={handleChange}
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
        disabled={isDisabled}
        onClick={handleContinue}
        className="w-full max-w-md h-[55px] bg-[#C96C86] rounded-[8px] text-white font-semibold cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}