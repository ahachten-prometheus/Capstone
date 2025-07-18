"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { surveyQuestions } from "@/data/questions";
import { useSurvey } from "@/services/survey";
import { useEffect } from "react";

// helper function used for final navigation to pages 
function buildQueryParams(answers, destination) {
  const params = new URLSearchParams();

  if (destination === 'find_a_provider') {
    if (answers.provider_state) params.append('state', answers.provider_state);
    if (answers.virtual_only) params.append('virtualOnly', answers.virtual_only);
  }

  if (destination === 'access_resources') {
    if (answers.resources_subject && answers.resources_subject.length) {
      params.append('subject', answers.resources_subject.join(','));
    }
    if (answers.resources_category && answers.resources_category.length) {
      params.append('category', answers.resources_category.join(','));
    }
  }

  return params.toString();
}

//-----------------------------------------------------

export default function QuestionPage() {
  const { storeAnswer, answers } = useSurvey();
  const { id } = useParams();
  const router = useRouter();
  const questionId = Number(id);
  const question = surveyQuestions[questionId];
  console.log('Question object:', question);        // Check if question exists
  console.log('Question field:', question?.field);
  const [selectedValue, setSelectedValue] = useState(''); //will be grabbing current selected value
  const [nextPath, setNextPath] = useState([]) //will be cloning the global "next" in surveyQuestions to get the right values

  const [localAnswer, setLocalAnswer] = useState(
    question.type === "multi-select" ? [] : ""
  );

  if (!question) {
    return <div className="p-4 text-red-600">Question not found</div>;
  }

  useEffect(() => {
    console.log("Initial answers:", answers);
  }, []);

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
    setLocalAnswer(value)

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

    console.log('Current answers:', answers);          // What answers look like before update
    console.log('Local answer:', localAnswer);

    const newAnswers = {
      ...answers,
      [question.field]: localAnswer
    };
    console.log('New answers object:', newAnswers);
    console.log('Destination:', newAnswers.visit_reason);

    // Save answer
    storeAnswer(question, localAnswer);

    // If nextPath is set, go there
    if (nextPath.length > 0) {
      const nextItem = nextPath[0];

      if (typeof nextItem === 'string' && nextItem.startsWith('redirect:')) {
        const redirectPath = nextItem.replace('redirect:', '');
        router.push(redirectPath); // goes to event page 
      } else {
        router.push(`/question/${nextItem}`); // goes to next question
      }

      return;
    }

    const destination = newAnswers.visit_reason;
    const query = buildQueryParams(newAnswers, destination);

    if (!destination) {
      router.push('/');
      return;
    }

    if (destination === 'access_resources') {
      router.push(`/resources?${query}`);
    } else if (destination === 'find_a_provider') {
      router.push(`/providers?${query}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="p-6 bg-[#FFF5EA] h-screen min-h-200">
      <div>
        <button
          onClick={handleBack}
          className="#000000 w-[60px] h-[55px] rounded-[8px] text-4xl flex items-center justify-center mb-6 text-black cursor-pointer"
          aria-label="Go back to previous question"
        >
          ←
        </button>
      </div>

      <div className="flex flex-col justify-center items-center pt-5 gap-10">
        <h1
          className="text-2xl font-bold mb-4 text-black w-90 text-center max-sm:text-lg max-sm:w-70"
          id={`question-${question.id}-label`}
        >
          {question.text}
        </h1>

        {(question.type === "single-select" || question.type === "multi-select") && (
          <fieldset aria-labelledby={`question-${question.id}-label`}>
            <legend className="sr-only">{question.text}</legend>
            <ul className="space-y-6 mb-6">
              {question.options.map((option, idx) => (
                <li key={idx}>
                  <label className="flex items-center text-black cursor-pointer">
                    <input
                      type={question.type === "multi-select" ? "checkbox" : "radio"}
                      name={`question-${question.id}`}
                      value={option.value}
                      className="mr-2 cursor-pointer"
                      checked={
                        question.type === "multi-select"
                          ? localAnswer.includes(option.value)
                          : localAnswer === option.value
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedValue(value);


                        const selectedOption = question.options.find(
                          (option) => option.value === value
                        );

                        if (selectedOption) {
                          if (Array.isArray(selectedOption.next)) {
                            setNextPath([...selectedOption.next]);
                          } else if (typeof selectedOption.next === "string") {
                            setNextPath([selectedOption.next]);
                          } else {
                            setNextPath([]);
                          }
                        }

                        if (question.type === "multi-select") {
                          const checked = e.target.checked;
                          if (checked) {
                            setLocalAnswer([...localAnswer, option.value]);
                          } else {
                            setLocalAnswer(
                              localAnswer.filter((val) => val !== option.value)
                            );
                          }
                        } else {
                          setLocalAnswer(option.value);
                        }
                      }}
                      aria-required="true"
                    />
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        )}

        {question.type === "dropdown" && (
          <select
            name={`question-${question.id}`}
            className="mt-2 p-2 border rounded mb-6 border-black text-black cursor-pointer"
            value={localAnswer}
            onChange={handleChange}
            aria-labelledby={`question-${question.id}-label`}
            aria-required="true"
          >
            <option value="" disabled>State</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleContinue}
          className={`w-full max-w-md h-[55px] bg-[#C96C86] rounded-[8px] text-white font-semibold mt-15
             cursor-pointer transition-transform duration-300 hover:scale-105
            `}

          aria-label="Continue to next question"
        >
          Continue
        </button>
      </div>

      {/* <pre className="mt-4 bg-gray-100 p-2 rounded">
    {JSON.stringify(answers, null, 2)}
  </pre> */}
    </div>
  );
}
